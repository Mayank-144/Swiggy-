import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Tag, Trash2, ArrowRight, ShieldCheck, Heart, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const CartDrawer = () => {
  const {
    cartItems,
    restaurant,
    totalItemsCount,
    itemTotal,
    deliveryFee,
    platformFee,
    taxes,
    tip,
    setTip,
    discount,
    grandTotal,
    appliedCoupon,
    availableCoupons,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    isCartDrawerOpen,
    closeCartDrawer,
    conflictModal,
    resolveConflict
  } = useCart();

  const { isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [showCouponBox, setShowCouponBox] = useState(false);

  if (!isCartDrawerOpen && !conflictModal.isOpen) return null;

  const handleApplyCoupon = (codeToApply) => {
    const code = codeToApply || couponInput;
    if (applyCoupon(code)) {
      setCouponInput('');
      setShowCouponBox(false);
    }
  };

  const handleCheckout = () => {
    closeCartDrawer();
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <>
      {/* Restaurant Conflict Confirmation Dialog */}
      <AnimatePresence>
        {conflictModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-sm w-full p-5 sm:p-6 shadow-2xl border border-slate-100"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-800 text-center mb-1">
                Items already in cart
              </h3>
              <p className="text-xs text-slate-500 text-center leading-relaxed mb-5 sm:mb-6">
                Your cart contains items from <strong className="text-slate-700">{restaurant?.name}</strong>. Do you want to discard your previous selection and add this item from <strong className="text-slate-700">{conflictModal.pendingRestaurant?.name}</strong>?
              </p>
              <div className="flex gap-2.5 sm:gap-3">
                <button
                  onClick={() => resolveConflict(false)}
                  className="flex-1 py-2.5 px-3 sm:px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  No, Keep Cart
                </button>
                <button
                  onClick={() => resolveConflict(true)}
                  className="flex-1 py-2.5 px-3 sm:px-4 rounded-xl bg-swiggy-orange text-white font-bold text-xs hover:bg-swiggy-orangeDark shadow-md transition-colors cursor-pointer"
                >
                  Yes, Start Fresh
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Cart Slide-in Drawer: Full screen on mobile, right panel on desktop */}
      <AnimatePresence>
        {isCartDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full sm:max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 bg-swiggy-orange/10 text-swiggy-orange rounded-xl shrink-0">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-800 tracking-tight">Your Cart</h3>
                    {restaurant && (
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate max-w-[180px] sm:max-w-[220px]">
                        From {restaurant.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {cartItems.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-xs font-semibold cursor-pointer"
                      title="Clear cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={closeCartDrawer}
                    className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-6">
                {cartItems.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                      <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base sm:text-lg text-slate-700">Your cart is empty</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                        Good food is always cooking! Go ahead, order some yummy items from the menu.
                      </p>
                    </div>
                    <button
                      onClick={closeCartDrawer}
                      className="w-full sm:w-auto px-6 py-2.5 bg-swiggy-orange hover:bg-swiggy-orangeDark text-white font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider cursor-pointer"
                    >
                      See Restaurants Near You
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Cart Items List */}
                    <div className="space-y-3 sm:space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-2.5 p-3 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            {item.isVeg ? (
                              <span className="veg-icon shrink-0">
                                <span className="veg-dot" />
                              </span>
                            ) : (
                              <span className="non-veg-icon shrink-0">
                                <span className="non-veg-dot" />
                              </span>
                            )}
                            <div className="truncate">
                              <h5 className="font-bold text-xs text-slate-800 truncate">{item.name}</h5>
                              <p className="text-[11px] sm:text-xs font-semibold text-slate-500">₹{item.price}</p>
                            </div>
                          </div>

                          {/* Stepper */}
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="bg-white border border-slate-200 rounded-lg shadow-2xs flex items-center px-1.5 py-1">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-0.5 text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer"
                              >
                                <Minus className="w-3 h-3 stroke-[3]" />
                              </button>
                              <span className="w-5 text-center text-xs font-black text-slate-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-0.5 text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3 stroke-[3]" />
                              </button>
                            </div>
                            <span className="font-extrabold text-xs text-slate-800 w-11 sm:w-12 text-right">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Coupons Section */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 space-y-2.5 sm:space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                          <Tag className="w-4 h-4 text-swiggy-orange" />
                          <span>Offers & Coupons</span>
                        </div>
                        {appliedCoupon ? (
                          <button
                            onClick={removeCoupon}
                            className="text-xs font-extrabold text-rose-600 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            onClick={() => setShowCouponBox(!showCouponBox)}
                            className="text-xs font-extrabold text-swiggy-orange hover:underline cursor-pointer"
                          >
                            {showCouponBox ? 'Hide' : 'Enter Code'}
                          </button>
                        )}
                      </div>

                      {appliedCoupon ? (
                        <div className="p-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-700 flex items-center justify-between text-xs font-bold shadow-2xs">
                          <span>🎉 '{appliedCoupon}' Applied (Saved ₹{discount})</span>
                        </div>
                      ) : (
                        showCouponBox && (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                              placeholder="e.g. SWIGGY50"
                              className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold uppercase focus:outline-none focus:border-swiggy-orange"
                            />
                            <button
                              onClick={() => handleApplyCoupon()}
                              className="px-3.5 sm:px-4 py-2 bg-swiggy-orange hover:bg-swiggy-orangeDark text-white font-bold text-xs rounded-xl transition-colors shadow-2xs cursor-pointer"
                            >
                              Apply
                            </button>
                          </div>
                        )
                      )}

                      {/* Quick Coupon Chips */}
                      {!appliedCoupon && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {Object.entries(availableCoupons).map(([code, meta]) => (
                            <button
                              key={code}
                              onClick={() => handleApplyCoupon(code)}
                              className="px-2.5 py-1 rounded-lg bg-white border border-amber-300/80 text-[10px] font-extrabold text-amber-900 hover:bg-amber-100 transition-colors shadow-2xs cursor-pointer"
                            >
                              {code} ({meta.description})
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Delivery Partner Tip */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Tip your delivery partner</span>
                        {tip > 0 && (
                          <button onClick={() => setTip(0)} className="text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer">
                            Clear
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                        {[10, 20, 30, 50].map((amount) => (
                          <button
                            key={amount}
                            onClick={() => setTip(tip === amount ? 0 : amount)}
                            className={`py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              tip === amount
                                ? 'bg-swiggy-orange text-white border-swiggy-orange shadow-2xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            ₹{amount}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bill Summary Breakdown */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
                      <div className="flex justify-between text-slate-600 font-medium">
                        <span>Item Total</span>
                        <span className="font-semibold text-slate-800">₹{itemTotal}</span>
                      </div>
                      <div className="flex justify-between text-slate-600 font-medium">
                        <span>Delivery Fee {itemTotal > 500 && <span className="text-emerald-600 font-bold text-[10px]">(Free Delivery)</span>}</span>
                        <span className="font-semibold text-slate-800">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                      </div>
                      <div className="flex justify-between text-slate-600 font-medium">
                        <span>Platform Fee</span>
                        <span className="font-semibold text-slate-800">₹{platformFee}</span>
                      </div>
                      <div className="flex justify-between text-slate-600 font-medium">
                        <span>GST & Restaurant Charges</span>
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
                          <span>Coupon Discount</span>
                          <span>-₹{discount}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-slate-900 font-black text-sm pt-3 border-t border-slate-200">
                        <span>TO PAY</span>
                        <span className="text-base text-swiggy-orange">₹{grandTotal}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer CTA */}
              {cartItems.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 space-y-2 shrink-0">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 px-4 bg-swiggy-orange hover:bg-swiggy-orangeDark text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl shadow-swiggy-orange/30 flex items-center justify-between transition-all active:scale-[0.99] uppercase tracking-wider cursor-pointer"
                  >
                    <div className="text-left">
                      <span className="block text-[10px] font-medium opacity-90">{totalItemsCount} ITEMS</span>
                      <span className="text-sm sm:text-base font-black">₹{grandTotal}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>Proceed to Pay</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </div>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Safe & Secure Payments</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;

