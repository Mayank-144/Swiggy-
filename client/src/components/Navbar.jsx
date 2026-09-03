import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Search,
  Percent,
  HelpCircle,
  User,
  ShoppingBag,
  ChevronDown,
  LogOut,
  Clock,
  Heart,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar = ({ onSearch, searchQuery = '' }) => {
  const { user, isAuthenticated, openAuthModal, logout, currentLocation, setIsLocationModalOpen } = useAuth();
  const { totalItemsCount, openCartDrawer } = useCart();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(localSearch);
    }
    if (location.pathname !== '/') {
      navigate(`/?search=${encodeURIComponent(localSearch)}`);
    }
  };

  const handleSearchChange = (val) => {
    setLocalSearch(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Location */}
        <div className="flex items-center gap-6 shrink-0">
          {/* Swiggy Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-swiggy-orange to-amber-500 flex items-center justify-center text-white shadow-lg shadow-swiggy-orange/30 group-hover:scale-105 transition-transform">
              <span className="text-xl">🍕</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-swiggy-orange">
                swiggy
              </span>
              <span className="text-[9px] uppercase font-extrabold tracking-widest text-slate-400 -mt-1">
                Food & Feast
              </span>
            </div>
          </Link>

          {/* Location Selector */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="hidden md:flex items-center gap-2 hover:text-swiggy-orange transition-colors text-left max-w-[240px] pl-3 border-l border-slate-200"
          >
            <MapPin className="w-4 h-4 text-swiggy-orange shrink-0" />
            <div className="truncate">
              <div className="flex items-center gap-1 font-bold text-xs text-slate-800 hover:text-swiggy-orange">
                <span className="truncate">{currentLocation.area}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-[11px] text-slate-400 truncate block">
                {currentLocation.city}
              </span>
            </div>
          </button>
        </div>

        {/* Center: Live Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-md relative hidden sm:block"
        >
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search for restaurants, biryani, pizza or burgers..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-slate-100 hover:bg-slate-50 border border-slate-200/80 focus:bg-white focus:border-swiggy-orange text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-inner"
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </form>

        {/* Right: Nav Links, Auth & Cart */}
        <div className="flex items-center gap-4 md:gap-7 shrink-0">
          {/* Swiggy Offers Link */}
          <Link
            to="/"
            className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-swiggy-orange transition-colors"
          >
            <Percent className="w-4 h-4 text-slate-500" />
            <span>Offers</span>
            <span className="bg-swiggy-orange text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">
              New
            </span>
          </Link>

          {/* User Account / Sign In */}
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-swiggy-orange"
                />
                <span className="hidden md:inline font-bold text-xs text-slate-800 max-w-[100px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/70">
                      <p className="font-extrabold text-xs text-slate-800 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 font-medium truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-swiggy-orange transition-colors"
                    >
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>Orders & Activity</span>
                    </Link>

                    <Link
                      to="/profile?tab=addresses"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-swiggy-orange transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>Addresses</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-swiggy-orange transition-colors px-3 py-2 rounded-xl hover:bg-slate-100"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>Sign In</span>
            </button>
          )}

          {/* Cart Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={openCartDrawer}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white font-extrabold text-xs shadow-md transition-all group"
          >
            <ShoppingBag className="w-4 h-4 text-swiggy-orange group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Cart</span>
            {totalItemsCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-0.5 px-2 py-0.5 bg-swiggy-orange text-white text-[11px] font-black rounded-full shadow-sm"
              >
                {totalItemsCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Search Bar (under navbar on small devices) */}
      <div className="sm:hidden px-4 pb-3">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search food, restaurants..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold focus:bg-white focus:outline-none focus:border-swiggy-orange"
          />
        </form>
      </div>
    </header>
  );
};

export default Navbar;
