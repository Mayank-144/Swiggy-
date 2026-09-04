const Order = require('../models/Order');
const { getDBStatus } = require('../config/db');
const {
  addSharedOrder,
  findSharedOrderById,
  findSharedOrdersByUser,
  getSharedOrders
} = require('../data/orderStore');

// Delivery partner pool for realistic tracking
const deliveryPartners = [
  { name: "Ramesh Kumar", phone: "+91 98123 45678", rating: 4.8, vehicleNumber: "KA 01 EK 4920", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
  { name: "Suresh Patil", phone: "+91 97432 18920", rating: 4.9, vehicleNumber: "KA 05 MN 1204", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
  { name: "Anand Verma", phone: "+91 99201 34912", rating: 4.7, vehicleNumber: "KA 03 GH 8831", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80" }
];

// Helper to determine simulated live order stage based on order creation time
const getSimulatedStatus = (createdAt) => {
  const elapsedSeconds = (Date.now() - new Date(createdAt).getTime()) / 1000;
  if (elapsedSeconds < 20) return 'CONFIRMED';
  if (elapsedSeconds < 50) return 'PREPARING';
  if (elapsedSeconds < 120) return 'OUT_FOR_DELIVERY';
  return 'DELIVERED';
};

// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 'usr-demo-01';
    const userEmail = req.user ? req.user.email : 'demo@swiggy.com';
    const { restaurant, items, bill, deliveryAddress, paymentMethod } = req.body;

    if (!restaurant || !items || items.length === 0 || !bill || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: 'Incomplete order payload. Restaurant, items, bill and address are required.'
      });
    }

    const orderId = `SWG-${Math.floor(100000 + Math.random() * 900000)}`;
    const assignedRider = deliveryPartners[Math.floor(Math.random() * deliveryPartners.length)];
    const finalTotal = Number(req.body.totalAmount || (bill ? bill.grandTotal : 0));

    // For Cash on Delivery (COD), payment status is PENDING until delivered!
    const isCOD = /cash\s*on\s*delivery|cod/i.test(String(paymentMethod || ''));

    const orderData = {
      orderId,
      userId,
      userEmail,
      restaurant,
      items,
      totalAmount: finalTotal,
      bill: bill || { grandTotal: finalTotal, itemTotal: finalTotal },
      deliveryAddress,
      paymentMethod: isCOD ? 'Cash on Delivery' : (paymentMethod || 'UPI'),
      status: isCOD ? 'pending' : 'paid',
      paymentStatus: isCOD ? 'PENDING' : 'PAID',
      orderStatus: 'CONFIRMED',
      deliveryPartner: assignedRider,
      deliveryTimeEstimate: '25-30 mins',
      createdAt: new Date()
    };

    // Always update shared in-memory store so it is instantly available
    addSharedOrder(orderData);

    if (getDBStatus()) {
      try {
        const newOrder = new Order(orderData);
        await newOrder.save();
        return res.status(201).json({
          success: true,
          message: isCOD ? 'Order placed! Pay at delivery.' : 'Order placed successfully!',
          order: newOrder
        });
      } catch (dbErr) {
        console.warn('DB save notice, using shared store:', dbErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: isCOD ? 'Order placed! Pay at delivery.' : 'Order placed successfully!',
      order: orderData
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: 'Server error creating order' });
  }
};

// @route   GET /api/orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 'usr-demo-01';
    const userEmail = req.user ? req.user.email : 'demo@swiggy.com';

    let orders = [];

    if (getDBStatus()) {
      try {
        orders = await Order.find({ $or: [{ userId }, { userEmail }] }).sort({ createdAt: -1 });
      } catch (e) {
        console.warn('DB find notice:', e.message);
      }
    }

    if (!orders || orders.length === 0) {
      orders = findSharedOrdersByUser(userId, userEmail);
    }

    // Dynamic simulated status check for active freshness
    const updatedOrders = orders.map(order => {
      const orderObj = order.toObject ? order.toObject() : { ...order };
      if (orderObj.orderStatus !== 'CANCELLED' && orderObj.orderStatus !== 'DELIVERED') {
        const liveStatus = getSimulatedStatus(orderObj.createdAt);
        orderObj.orderStatus = liveStatus;
        // When delivered, if it was COD, cash has been collected at doorstep
        if (liveStatus === 'DELIVERED') {
          orderObj.paymentStatus = 'PAID';
          orderObj.status = 'paid';
        }
      }
      return orderObj;
    });

    res.json({
      success: true,
      count: updatedOrders.length,
      data: updatedOrders
    });
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching orders' });
  }
};

// @route   GET /api/orders/:orderId
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    let order;
    if (getDBStatus()) {
      try {
        order = await Order.findOne({ $or: [{ orderId }, { _id: orderId.match(/^[0-9a-fA-F]{24}$/) ? orderId : undefined }] });
      } catch (e) {
        console.warn('DB findOne notice:', e.message);
      }
    }

    if (!order) {
      order = findSharedOrderById(orderId);
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const orderObj = order.toObject ? order.toObject() : { ...order };
    if (orderObj.orderStatus !== 'CANCELLED' && orderObj.orderStatus !== 'DELIVERED') {
      const liveStatus = getSimulatedStatus(orderObj.createdAt);
      orderObj.orderStatus = liveStatus;
      if (liveStatus === 'DELIVERED') {
        orderObj.paymentStatus = 'PAID';
        orderObj.status = 'paid';
      }
    }

    res.json({
      success: true,
      data: orderObj
    });
  } catch (error) {
    console.error('Fetch order detail error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching order detail' });
  }
};
