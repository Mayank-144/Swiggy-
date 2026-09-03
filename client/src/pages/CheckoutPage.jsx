import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { orderAPI } from '../services/api';

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
    pincode: ''
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);

  // If cart is empty, redirect to home
  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-black text-slate-800">Your cart is empty</h3>
        <p className="text-xs text-slate-400">Add items from a restaurant to proceed with checkout.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-swiggy-orange text-white text-xs font-bold rounded-xl shadow-md uppercase tracking-wider"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  const addresses = user?.addresses || [
    {
      _id: 'default-1',
      title: 'Home',
      flatNo: 'Flat 402, Sunshine Heights',
      landmark: 'Near Forum Mall',
      area: 'Koramangala 7th Block',
      city: 'Bengaluru',
      pincode: '560095'
    }
  ];

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }

    setPlacingOrder(true);

    try {
      const activeAddress = showNewAddressForm ? newAddress : addresses[selectedAddressIndex] || addresses[0];

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
        paymentMethod
      };

      const res = await orderAPI.createOrder(orderPayload);

      if (res.success && res.order) {
        // Confetti burst!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        addToast('Order placed successfully! 🚀', 'success');
        clearCart();
        navigate(`/order-tracking/${res.order.orderId}`);
      }
    } catch (err) {
      addToast(err.message || 'Failed to place order', 'error');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          to={`/restaurant/${restaurant?.id || ''}`}
          className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Secure Checkout</h1>
          <p className="text-xs text-slate-500 font-medium">Ordering from {restaurant?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Address & Payment Methods (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Delivery Address Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-swiggy-orange/10 text-swiggy-orange flex items-center justify-center font-black">
                  1
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-800 tracking-tight">
                    Delivery Address
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">Select or add a new delivery location</p>
                </div>
              </div>

              <button
                onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                className="text-xs font-extrabold text-swiggy-orange hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showNewAddressForm ? 'Saved Addresses' : 'Add New'}</span>
              </button>
            </div>

            {!showNewAddressForm ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {addresses.map((addr, idx) => {
                  const isSelected = selectedAddressIndex === idx;
                  return (
                    <div
                      key={addr._id || idx}
                      onClick={() => setSelectedAddressIndex(idx)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${isSelected
                        ? 'border-swiggy-orange bg-swiggy-orange/5 shadow-sm'
                        : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                        }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-swiggy-orange" />
                            {addr.title || 'Address'}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-swiggy-orange fill-swiggy-orange text-white" />}
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tag</label>
                    <select
                      value={newAddress.title}
                      onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-swiggy-orange"
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
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-swiggy-orange"
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
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-swiggy-orange"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-swiggy-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      placeholder="560095"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-swiggy-orange"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Payment Method Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-swiggy-orange/10 text-swiggy-orange flex items-center justify-center font-black">
                2
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-800 tracking-tight">
                  Choose Payment Method
                </h3>
                <p className="text-xs text-slate-400 font-medium">Safe & instant checkout options</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {/* UPI Option */}
              <label
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === 'UPI'
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                  : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="accent-emerald-600 w-4 h-4"
                  />
                  <div>
                    <p className="font-extrabold text-xs text-slate-800 flex items-center gap-1.5">
                      <span>UPI (Google Pay, PhonePe, Paytm)</span>
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">
                        FASTEST
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">Instant transfer with 0 fees</p>
                  </div>
                </div>
                <Zap className="w-5 h-5 text-emerald-600" />
              </label>

              {/* Card Option */}
              <label
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === 'CARD'
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                  : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="CARD"
                    checked={paymentMethod === 'CARD'}
                    onChange={() => setPaymentMethod('CARD')}
                    className="accent-emerald-600 w-4 h-4"
                  />
                  <div>
                    <p className="font-extrabold text-xs text-slate-800">Credit / Debit Card</p>
                    <p className="text-[11px] text-slate-400 font-medium">Visa, Mastercard, RuPay & Diners</p>
                  </div>
                </div>
                <CreditCard className="w-5 h-5 text-slate-500" />
              </label>

              {/* Net Banking Option */}
              <label
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === 'NET_BANKING'
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                  : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="NET_BANKING"
                    checked={paymentMethod === 'NET_BANKING'}
                    onChange={() => setPaymentMethod('NET_BANKING')}
                    className="accent-emerald-600 w-4 h-4"
                  />
                  <div>
                    <p className="font-extrabold text-xs text-slate-800">Net Banking</p>
                    <p className="text-[11px] text-slate-400 font-medium">HDFC, ICICI, SBI, Axis & all Indian banks</p>
                  </div>
                </div>
                <Building className="w-5 h-5 text-slate-500" />
              </label>

              {/* Cash On Delivery Option */}
              <label
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === 'COD'
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                  : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="accent-emerald-600 w-4 h-4"
                  />
                  <div>
                    <p className="font-extrabold text-xs text-slate-800">Cash on Delivery (COD)</p>
                    <p className="text-[11px] text-slate-400 font-medium">Pay via Cash or QR at your doorstep</p>
                  </div>
                </div>
                <Banknote className="w-5 h-5 text-slate-500" />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Pay Button (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-6">
            {/* Restaurant Info */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <img
                src={restaurant?.image}
                alt={restaurant?.name}
                className="w-14 h-14 rounded-2xl object-cover shadow-sm"
              />
              <div className="min-w-0">
                <h4 className="font-black text-sm text-slate-900 truncate">{restaurant?.name}</h4>
                <p className="text-xs text-slate-400 font-medium truncate">{restaurant?.area}</p>
                <div className="flex items-center gap-1 mt-0.5 text-[11px] font-bold text-emerald-700">
                  <Clock className="w-3 h-3" />
                  <span>Estimated Delivery: 25-30 mins</span>
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
                    <span className="text-slate-400 font-bold">x{item.quantity}</span>
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

              <div className="flex justify-between text-slate-900 font-black text-base pt-3 border-t border-slate-200">
                <span>TO PAY</span>
                <span className="text-swiggy-orange">₹{grandTotal}</span>
              </div>
            </div>

            {/* Pay and Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder}
              className="w-full py-4 px-6 bg-swiggy-orange hover:bg-swiggy-orangeDark text-white font-black text-sm rounded-2xl shadow-xl shadow-swiggy-orange/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-70 uppercase tracking-wider"
            >
              {placingOrder ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <span>Pay ₹{grandTotal} & Place Order</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe and Encrypted Payment Gateway</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
