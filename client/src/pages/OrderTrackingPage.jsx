import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ArrowLeft,
  ChefHat,
  Bike,
  PackageCheck,
  Star,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { orderAPI } from '../services/api';

const STAGES = [
  { key: 'CONFIRMED', title: 'Order Confirmed', subtitle: 'Restaurant has accepted your order', icon: CheckCircle2 },
  { key: 'PREPARING', title: 'Preparing Food', subtitle: 'Chef is cooking your fresh meal', icon: ChefHat },
  { key: 'OUT_FOR_DELIVERY', title: 'Out for Delivery', subtitle: 'Delivery partner is speeding to you', icon: Bike },
  { key: 'DELIVERED', title: 'Order Delivered', subtitle: 'Enjoy your delicious feast!', icon: PackageCheck }
];

export const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [etaMinutes, setEtaMinutes] = useState(25);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orderAPI.getOrderById(orderId);
        if (res.success && res.data) {
          setOrder(res.data);
          const status = res.data.orderStatus;
          const idx = STAGES.findIndex((s) => s.key === status);
          setCurrentStepIndex(idx !== -1 ? idx : 1);
        }
      } catch (err) {
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    // Live status polling every 5s for simulation progression
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  // Dynamic ETA countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
        <div className="h-48 bg-slate-200 rounded-3xl animate-pulse" />
        <div className="h-64 bg-slate-200 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-xl font-black text-slate-800">Order Not Found</h3>
        <p className="text-xs text-slate-400">Could not retrieve order details for ID: {orderId}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-swiggy-orange text-white text-xs font-bold rounded-xl shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  const isDelivered = currentStepIndex === 3;

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            to="/"
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight truncate">Order #{order.orderId}</h1>
            <p className="text-xs text-slate-500 font-medium truncate">
              Placed from <strong className="text-slate-700">{order.restaurant?.name}</strong>
            </p>
          </div>
        </div>

        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase shrink-0">
          {order.orderStatus.replace(/_/g, ' ')}
        </span>
      </div>

      {/* Main Delivery Status Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-100 shadow-sm space-y-5 sm:space-y-8">
        {/* Estimated Arrival Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-swiggy-orangeLight via-amber-50 to-emerald-50 border border-swiggy-orange/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-swiggy-orange text-white flex items-center justify-center shadow-lg shadow-swiggy-orange/30 shrink-0 animate-bounce-light">
              <Bike className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Delivery</p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {isDelivered ? 'Order Delivered 🎉' : `${etaMinutes} Minutes`}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-slate-600 self-start sm:self-auto">
            <Clock className="w-4 h-4 text-swiggy-orange shrink-0" />
            <span>On time guarantee</span>
          </div>
        </div>

        {/* Live Step Progress Timeline */}
        <div className="relative py-2 sm:py-4">
          <div className="grid grid-cols-4 gap-1 sm:gap-2 relative z-10">
            {STAGES.map((stage, idx) => {
              const isCompleted = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const Icon = stage.icon;

              return (
                <div key={stage.key} className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2">
                  <motion.div
                    animate={isCurrent ? { scale: [1, 1.12, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.5]" />
                  </motion.div>
                  <div>
                    <h5 className={`font-extrabold text-[10px] sm:text-xs tracking-tight leading-tight ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                      {stage.title}
                    </h5>
                    <p className="hidden md:block text-[10px] text-slate-400 mt-0.5 max-w-[120px]">
                      {stage.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Background Connecting Progress Line */}
          <div className="absolute top-7 sm:top-10 inset-x-6 sm:inset-x-8 h-1 bg-slate-100 -z-0">
            <div
              className="h-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${(currentStepIndex / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Simulated Map Visual */}
        <div className="relative h-36 sm:h-48 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex items-center justify-center p-3 sm:p-6">
          {/* Stylized dark map grid lines */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Visual Route with Moving Rider */}
          <div className="relative z-10 w-full max-w-lg flex items-center justify-between px-2 sm:px-6">
            {/* Restaurant Pin */}
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shrink-0">
                <ChefHat className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 truncate max-w-[70px] sm:max-w-[100px]">
                {order.restaurant?.name}
              </span>
            </div>

            {/* Connecting Animated Dashed Line with Moving Scooter */}
            <div className="flex-1 mx-2 sm:mx-4 relative flex items-center">
              <div className="w-full h-0.5 border-t-2 border-dashed border-emerald-400/60" />
              <motion.div
                animate={{ x: ['0%', '100%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="absolute -top-3 sm:-top-3.5 p-1 sm:p-1.5 rounded-full bg-swiggy-orange text-white shadow-glow-orange"
              >
                <Bike className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </motion.div>
            </div>

            {/* Delivery Destination Pin */}
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-300 truncate max-w-[70px] sm:max-w-[100px]">
                {order.deliveryAddress?.area || 'Your Home'}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery Partner Contact Card */}
        {order.deliveryPartner && (
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={order.deliveryPartner.avatar}
                alt={order.deliveryPartner.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
              />
              <div className="min-w-0">
                <h5 className="font-extrabold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5 flex-wrap">
                  <span className="truncate">{order.deliveryPartner.name}</span>
                  <span className="flex items-center gap-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded shrink-0">
                    <Star className="w-2.5 h-2.5 fill-amber-600 text-amber-600" />
                    <span>{order.deliveryPartner.rating}</span>
                  </span>
                </h5>
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium truncate">
                  {order.deliveryPartner.vehicleNumber} • Swiggy Valet
                </p>
              </div>
            </div>

            <a
              href={`tel:${order.deliveryPartner.phone}`}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Partner</span>
            </a>
          </div>
        )}
      </div>

      {/* Ordered Items & Bill Summary */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-100 shadow-sm space-y-4">
        <h4 className="font-black text-sm sm:text-base text-slate-900">Order Summary ({order.items?.length} items)</h4>

        <div className="divide-y divide-slate-100">
          {order.items?.map((item) => (
            <div key={item.id} className="py-2.5 sm:py-3 flex items-center justify-between text-xs font-semibold gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {item.isVeg ? (
                  <span className="veg-icon shrink-0">
                    <span className="veg-dot" />
                  </span>
                ) : (
                  <span className="non-veg-icon shrink-0">
                    <span className="non-veg-dot" />
                  </span>
                )}
                <span className="text-slate-800 truncate">{item.name}</span>
                <span className="text-slate-400 font-bold shrink-0">x{item.quantity}</span>
              </div>
              <span className="text-slate-900 font-bold shrink-0">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="font-extrabold text-xs sm:text-sm text-slate-800">Total Paid ({order.paymentMethod})</span>
          <span className="font-black text-base sm:text-lg text-swiggy-orange">₹{order.bill?.grandTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
