import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  CreditCard,
  CheckCircle2,
  Plus,
  ArrowLeft,
  ShieldCheck,
  ShoppingBag,
  Zap,
  Building,
  Banknote,
  Loader2,
  Clock,
  Sparkles,
  ArrowRight,
  Bike
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { orderAPI, paymentAPI } from '../services/api';
import SwiggyLogo from '../components/SwiggyLogo';

// Helper to dynamically load Razorpay SDK
const loadRazorpaySDK = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      return resolve(true);
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const CheckoutPage = () => {
  const {
    cartItems,
    restaurant,
    totalItemsCount,
    itemTotal,
    deliveryFee,
    platformFee,
    taxes,
    tip,
    discount,
    grandTotal,
    appliedCoupon,
    clearCart
  } = useCart();

  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Selected address state
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: 'Home',
    flatNo: '',
    landmark: '',
    area: '',
    city: 'Bengaluru',
    pincode: '',
    phone: ''
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('RAZORPAY');
  const [placingOrder, setPlacingOrder] = useState(false);

  // Success Modal State
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // If cart is empty and not showing success modal, show empty state
  if (cartItems.length === 0 && !showSuccessModal) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-black text-slate-800">Your cart is empty</h3>
        <p className="text-xs text-slate-400">Add items from a restaurant to proceed with checkout.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF5200] text-white text-xs font-bold rounded-xl shadow-md uppercase tracking-wider"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  const addresses = user?.addresses?.length ? user.addresses : [
    {
      _id: 'default-1',
      title: 'Home',
      flatNo: 'Flat 402, Sunshine Heights',
      landmark: 'Near Forum Mall',
      area: 'Koramangala 7th Block',
      city: 'Bengaluru',
      pincode: '560095',
      phone: '+91 98765 43210'
    }
  ];

  const getActiveAddress = () => {
    if (showNewAddressForm) return newAddress;
    return addresses[selectedAddressIndex] || addresses[0];
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);
  };

  // Handle Razorpay Verification helper
  const handleVerifyAndCompleteOrder = async (rzpResponse, activeAddress) => {
    try {
      setPlacingOrder(true);
      const verifyRes = await paymentAPI.verifyPayment({
        razorpay_order_id: rzpResponse.razorpay_order_id,
        razorpay_payment_id: rzpResponse.razorpay_payment_id,
        razorpay_signature: rzpResponse.razorpay_signature,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          image: restaurant.image,
          area: restaurant.area
        },
        items: cartItems.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          isVeg: i.isVeg,
          image: i.image
        })),
        totalAmount: grandTotal,
        bill: {
          itemTotal,
          deliveryFee,
          platformFee,
          taxes,
          discount,
          tip,
          grandTotal,
          couponApplied: appliedCoupon
        },
        deliveryAddress: activeAddress,
        paymentMethod: 'Razorpay'
      });

      if (verifyRes.success && verifyRes.order) {
        triggerConfetti();
        addToast('Payment verified & order placed! 🚀', 'success');
        setConfirmedOrder(verifyRes.order);
        clearCart();
        setShowSuccessModal(true);
      } else {
        throw new Error(verifyRes.message || 'Payment verification failed');
      }
    } catch (verifyError) {
      console.error('Verification error:', verifyError);
      addToast(verifyError.message || 'Payment verification failed. Your cart is intact.', 'error');
    } finally {
      setPlacingOrder(false);
    }
  };

  // State for Test Simulator Modal (used when Razorpay keys are not yet configured in .env)
  const [showSimulatorModal, setShowSimulatorModal] = useState(false);
  const [pendingSimOrder, setPendingSimOrder] = useState(null);

  // Complete Order placement handler
  const handleProceedToPay = async () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }

    const activeAddress = getActiveAddress();
    if (!activeAddress.flatNo || !activeAddress.area) {
      addToast('Please provide flat/house number and area for delivery address.', 'error');
      return;
    }

    setPlacingOrder(true);

    try {
      // 1. CASH ON DELIVERY (COD) FLOW
      if (paymentMethod === 'COD') {
        const orderPayload = {
          restaurant: {
            id: restaurant.id,
            name: restaurant.name,
            image: restaurant.image,
            area: restaurant.area
          },
          items: cartItems.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            isVeg: i.isVeg,
            image: i.image
          })),
          totalAmount: grandTotal,
          bill: {
            itemTotal,
            deliveryFee,
            platformFee,
            taxes,
            discount,
            tip,
            grandTotal,
            couponApplied: appliedCoupon
          },
          deliveryAddress: activeAddress,
          paymentMethod: 'Cash On Delivery'
        };

        const res = await orderAPI.createOrder(orderPayload);
        if (res.success && res.order) {
          triggerConfetti();
          addToast('Order placed successfully via Cash on Delivery! 💵', 'success');
          setConfirmedOrder(res.order);
          clearCart();
          setShowSuccessModal(true);
        }
        setPlacingOrder(false);
        return;
      }

      // 2. RAZORPAY PAYMENT GATEWAY FLOW
      // Step A: Create order on backend
      const rzpOrderRes = await paymentAPI.createOrder({
        amount: grandTotal,
        totalAmount: grandTotal,
        currency: 'INR'
      });

      if (!rzpOrderRes.success || !rzpOrderRes.orderId) {
        throw new Error(rzpOrderRes.message || 'Failed to initialize Razorpay transaction.');
      }

      // If backend generated a simulated order or Razorpay SDK is test-fallback
      if (rzpOrderRes.isSimulated || rzpOrderRes.key === 'rzp_test_SwiggyClone2026Key') {
        setPendingSimOrder({
          orderId: rzpOrderRes.orderId,
          amount: grandTotal,
          activeAddress
        });
        setShowSimulatorModal(true);
        setPlacingOrder(false);
        return;
      }

      // Step B: Load Razorpay SDK
      const isSDKLoaded = await loadRazorpaySDK();
      if (!isSDKLoaded || !window.Razorpay) {
        // Fallback to simulator modal if script cannot be reached
        setPendingSimOrder({
          orderId: rzpOrderRes.orderId,
          amount: grandTotal,
          activeAddress
        });
        setShowSimulatorModal(true);
        setPlacingOrder(false);
        return;
      }

      // Step C: Open Official Razorpay Popup
      const options = {
        key: rzpOrderRes.key,
        amount: rzpOrderRes.amount, // in paise
        currency: rzpOrderRes.currency || 'INR',
        name: 'Swiggy',
        description: `Food Order from ${restaurant?.name || 'Restaurant'}`,
        order_id: rzpOrderRes.orderId,
        handler: function (response) {
          handleVerifyAndCompleteOrder(response, activeAddress);
        },
        prefill: {
          name: user?.name || 'Mayank Jaiswal',
          email: user?.email || 'demo@swiggy.com',
          contact: user?.phone || '9876543210'
        },
        notes: {
          restaurantName: restaurant?.name,
          address: `${activeAddress.flatNo}, ${activeAddress.area}`
        },
        theme: {
          color: '#FC8019'
        },
        modal: {
          ondismiss: function () {
            setPlacingOrder(false);
            addToast('Payment cancelled. Your cart items are saved so you can retry anytime.', 'info');
          }
        }
      };

      try {
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.on('payment.failed', function (failureResponse) {
          setPlacingOrder(false);
          addToast(
            failureResponse.error?.description || 'Payment failed. Opening Test Payment fallback...',
            'error'
          );
          setPendingSimOrder({
            orderId: rzpOrderRes.orderId,
            amount: grandTotal,
            activeAddress
          });
          setShowSimulatorModal(true);
        });
        razorpayInstance.open();
      } catch (err) {
        setPendingSimOrder({
          orderId: rzpOrderRes.orderId,
          amount: grandTotal,
          activeAddress
        });
        setShowSimulatorModal(true);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      addToast(err.message || 'Something went wrong during checkout. Your cart is intact.', 'error');
      setPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-4 sm:py-8 font-sans">
      {/* Top Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
        <Link
          to={`/restaurant/${restaurant?.id || ''}`}
          className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">Secure Checkout</h1>
          <p className="text-xs text-slate-500 font-medium truncate">Ordering from {restaurant?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        {/* Left Column: Address & Payment Methods (7 cols) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          {/* 1. Delivery Address Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 border border-slate-100 shadow-sm space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-[#FF5200]/10 text-[#FF5200] flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-800 tracking-tight">
                    Delivery Address
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Select or add a delivery location</p>
                </div>
              </div>

              <button
                onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                className="text-xs font-extrabold text-[#FF5200] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showNewAddressForm ? 'Saved Addresses' : 'Add New'}</span>
              </button>
            </div>

            {!showNewAddressForm ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 pt-1 sm:pt-2">
                {addresses.map((addr, idx) => {
                  const isSelected = selectedAddressIndex === idx;
                  return (
                    <div
                      key={addr._id || idx}
                      onClick={() => setSelectedAddressIndex(idx)}
                      className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#FF5200] bg-[#FFF2EA]/60 shadow-sm'
                          : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#FF5200]" />
                            {addr.title || 'Address'}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#FF5200] fill-[#FF5200] text-white" />}
                        </div>
                        <p className="text-xs text-slate-700 font-semibold pt-1">{addr.flatNo}</p>
                        <p className="text-xs text-slate-500 font-medium">{addr.area}, {addr.city}</p>
                        {addr.pincode && <p className="text-[11px] text-slate-400 font-medium">PIN: {addr.pincode}</p>}
                      </div>

                      <div className="pt-3">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          ⚡ 25-30 MINS
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* New Address Form */
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tag</label>
                    <select
                      value={newAddress.title}
                      onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#FF5200]"
                    >
                      <option>Home</option>
                      <option>Work</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Flat / House No.</label>
                    <input
                      type="text"
                      placeholder="e.g. Flat 301, Tower A"
                      value={newAddress.flatNo}
                      onChange={(e) => setNewAddress({ ...newAddress, flatNo: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#FF5200]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Area / Street</label>
                  <input
                    type="text"
                    placeholder="e.g. 100ft Road, Koramangala 4th Block"
                    value={newAddress.area}
                    onChange={(e) => setNewAddress({ ...newAddress, area: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#FF5200]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#FF5200]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      placeholder="560095"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#FF5200]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Payment Method Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 border border-slate-100 shadow-sm space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-[#FF5200]/10 text-[#FF5200] flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
                2
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-800 tracking-tight">
                  Choose Payment Method
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Safe & instant checkout with Razorpay</p>
              </div>
            </div>

            <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
              {/* Razorpay Gateway (UPI, Cards, NetBanking, Wallets) */}
              <label
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'RAZORPAY'
                    ? 'border-[#FF5200] bg-[#FFF2EA]/60 shadow-sm'
                    : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <input
                    type="radio"
                    name="payment"
                    value="RAZORPAY"
                    checked={paymentMethod === 'RAZORPAY'}
                    onChange={() => setPaymentMethod('RAZORPAY')}
                    className="accent-[#FF5200] w-4 h-4 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-extrabold text-xs text-slate-800 flex items-center gap-1.5 flex-wrap">
                      <span className="truncate">Razorpay (UPI, Google Pay, Cards, NetBanking)</span>
                      <span className="text-[10px] font-black text-[#FF5200] bg-orange-100 px-1.5 py-0.5 rounded shrink-0">
                        RECOMMENDED
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium truncate">Official Razorpay 256-bit secure gateway</p>
                  </div>
                </div>
                <Zap className="w-5 h-5 text-[#FF5200] shrink-0" />
              </label>

              {/* Cash On Delivery Option */}
              <label
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'COD'
                    ? 'border-[#FF5200] bg-[#FFF2EA]/60 shadow-sm'
                    : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="accent-[#FF5200] w-4 h-4 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-extrabold text-xs text-slate-800 truncate">Cash on Delivery (COD)</p>
                    <p className="text-[11px] text-slate-400 font-medium truncate">Pay via Cash or QR at your doorstep</p>
                  </div>
                </div>
                <Banknote className="w-5 h-5 text-slate-500 shrink-0" />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Pay Button (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 border border-slate-100 shadow-sm space-y-5 sm:space-y-6">
            {/* Restaurant Info */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <img
                src={restaurant?.image}
                alt={restaurant?.name}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover shadow-sm shrink-0"
              />
              <div className="min-w-0">
                <h4 className="font-black text-xs sm:text-sm text-slate-900 truncate">{restaurant?.name}</h4>
                <p className="text-xs text-slate-400 font-medium truncate">{restaurant?.area}</p>
                <div className="flex items-center gap-1 mt-0.5 text-[10px] sm:text-[11px] font-bold text-emerald-700">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span className="truncate">Estimated Delivery: 25-30 mins</span>
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
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

            {/* Bill Breakdown */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Item Total</span>
                <span className="font-semibold text-slate-800">₹{itemTotal}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Delivery Partner Fee</span>
                <span className="font-semibold text-slate-800">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Platform Fee</span>
                <span className="font-semibold text-slate-800">₹{platformFee}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>GST (5%)</span>
                <span className="font-semibold text-slate-800">₹{taxes}</span>
              </div>
              {tip > 0 && (
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Delivery Tip</span>
                  <span className="font-semibold text-slate-800">₹{tip}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({appliedCoupon})</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-900 font-black text-sm sm:text-base pt-3 border-t border-slate-200">
                <span>TO PAY</span>
                <span className="text-[#FF5200]">₹{grandTotal}</span>
              </div>
            </div>

            {/* Proceed to Pay CTA */}
            <button
              onClick={handleProceedToPay}
              disabled={placingOrder}
              className="w-full py-3.5 sm:py-4 px-4 sm:px-6 bg-[#FF5200] hover:bg-[#E04800] text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-[#FF5200]/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-70 uppercase tracking-wider cursor-pointer"
            >
              {placingOrder ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connecting Razorpay...</span>
                </>
              ) : (
                <>
                  <span>Proceed to Pay ₹{grandTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-center">Razorpay 256-Bit Encrypted Payment Gateway</span>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Test Simulator Modal (For Instant Testing / Fallback) */}
      <AnimatePresence>
        {showSimulatorModal && pendingSimOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                    R
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Razorpay Payment Gateway</h3>
                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Test Mode Gateway</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowSimulatorModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-black text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Order Info */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Pay To:</span>
                  <span className="font-bold text-slate-800">Swiggy ({restaurant?.name})</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Order Reference:</span>
                  <span className="font-mono text-slate-700 text-[11px]">{pendingSimOrder.orderId}</span>
                </div>
                <div className="flex justify-between text-xs pt-1 border-t border-slate-200/60 font-black">
                  <span className="text-slate-700">Total Payable:</span>
                  <span className="text-blue-600 text-sm">₹{pendingSimOrder.amount}</span>
                </div>
              </div>

              {/* Simulation Options */}
              <div className="space-y-2 pt-1">
                <p className="text-[11px] font-bold text-slate-500">Choose a simulation action:</p>

                <button
                  onClick={() => {
                    setShowSimulatorModal(false);
                    handleVerifyAndCompleteOrder(
                      {
                        razorpay_order_id: pendingSimOrder.orderId,
                        razorpay_payment_id: `pay_${Math.random().toString(36).substring(2, 12)}`,
                        razorpay_signature: `sim_sig_${Date.now()}`
                      },
                      pendingSimOrder.activeAddress
                    );
                  }}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 uppercase tracking-wider transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>✅ Simulate Success (UPI / Card / NetBanking)</span>
                </button>

                <button
                  onClick={() => {
                    setShowSimulatorModal(false);
                    addToast('Payment transaction failed (Simulated). Cart items remain intact.', 'error');
                  }}
                  className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl border border-rose-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>❌ Simulate Failure / Dismiss</span>
                </button>
              </div>

              <div className="text-[10px] text-slate-400 text-center font-medium">
                💡 To test with live Razorpay popup, add your real Test Key ID & Secret to <code className="text-slate-700 font-mono">server/.env</code>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Animated Order Success Modal */}
      <AnimatePresence>
        {showSuccessModal && confirmedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl border border-slate-100"
            >
              {/* Green Animated Checkmark Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 12, stiffness: 200 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-inner border-4 border-emerald-100"
              >
                <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.5]" />
              </motion.div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Payment Verified</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Order Placed Successfully!
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Your meal is being prepared with love and safety.
                </p>
              </div>

              {/* Order ID & Payment Info Badge */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">Order ID:</span>
                  <span className="font-black text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    #{confirmedOrder.orderId}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">Amount Paid:</span>
                  <span className="font-extrabold text-[#FF5200]">
                    ₹{confirmedOrder.totalAmount || confirmedOrder.bill?.grandTotal}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">Payment Method:</span>
                  <span className="font-semibold text-slate-700">
                    {confirmedOrder.paymentMethod}
                  </span>
                </div>
                {confirmedOrder.razorpayPaymentId && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Payment ID:</span>
                    <span className="font-mono text-slate-500 truncate max-w-[170px]">
                      {confirmedOrder.razorpayPaymentId}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => navigate(`/order-tracking/${confirmedOrder.orderId}`)}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#FF5200] hover:bg-[#E04800] text-white font-black text-xs sm:text-sm shadow-lg shadow-[#FF5200]/30 flex items-center justify-center gap-2 uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Bike className="w-4 h-4" />
                  <span>Track Order Status</span>
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Browse More Food
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutPage;

