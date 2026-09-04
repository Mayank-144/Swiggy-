const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  isVeg: { type: Boolean, default: true },
  image: { type: String }
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userEmail: { type: String },
  restaurant: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },
    area: { type: String }
  },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  bill: {
    itemTotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 35 },
    platformFee: { type: Number, default: 5 },
    taxes: { type: Number, default: 24 },
    discount: { type: Number, default: 0 },
    tip: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },
    couponApplied: { type: String, default: '' }
  },
  deliveryAddress: {
    title: { type: String, default: 'Home' },
    flatNo: { type: String, required: true },
    landmark: { type: String },
    area: { type: String, required: true },
    city: { type: String, default: 'Bengaluru' },
    pincode: { type: String, required: true },
    phone: { type: String }
  },
  paymentMethod: { type: String, default: 'Razorpay' },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'paid'
  },
  paymentStatus: { type: String, enum: ['PAID', 'PENDING', 'FAILED'], default: 'PAID' },
  orderStatus: {
    type: String,
    enum: ['CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'],
    default: 'CONFIRMED'
  },
  deliveryPartner: {
    name: { type: String, default: 'Ramesh Kumar' },
    phone: { type: String, default: '+91 98123 45678' },
    rating: { type: Number, default: 4.8 },
    vehicleNumber: { type: String, default: 'KA 01 EK 4920' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
  },
  deliveryTimeEstimate: { type: String, default: '25-30 mins' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

