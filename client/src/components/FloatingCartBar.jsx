import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FloatingCartBar = () => {
  const { totalItemsCount, grandTotal, openCartDrawer } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on checkout, order tracking, and profile pages
  const isHiddenRoute =
    location.pathname.startsWith('/checkout') ||
    location.pathname.startsWith('/order-tracking');

  if (totalItemsCount <= 0 || isHiddenRoute) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-4 max-w-xl mx-auto z-50 pointer-events-auto"
      >
        <div
          onClick={openCartDrawer}
          className="w-full bg-[#1C1C1C] hover:bg-black text-white p-3 sm:p-3.5 rounded-2xl shadow-2xl flex items-center justify-between cursor-pointer border border-slate-800 group transition-all duration-200"
        >
          {/* Left: Bag Icon & Price info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FF5200] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'} Added
              </p>
              <p className="text-sm sm:text-base font-black text-white">
                ₹{grandTotal}{' '}
                <span className="text-[11px] font-normal text-slate-400 hidden xs:inline">
                  (plus taxes)
                </span>
              </p>
            </div>
          </div>

          {/* Right: View Cart / Pay CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[#FF5200] bg-white/10 hover:bg-white/15 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shrink-0 transition-colors">
            <span>View Cart</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingCartBar;
