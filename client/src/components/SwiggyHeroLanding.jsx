import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Search,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Clock,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const SwiggyLandingHeader = ({ onSearch, searchQuery = '' }) => {
  const { user, isAuthenticated, openAuthModal, logout, currentLocation, setIsLocationModalOpen } = useAuth();
  const { totalItemsCount, openCartDrawer } = useCart();
  const { addToast } = useToast();
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(localSearch);
    }
    setTimeout(() => {
      const el = document.getElementById('restaurants-grid-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const scrollToFood = () => {
    const el = document.getElementById('food-options-section') || document.getElementById('restaurants-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToInstamart = () => {
    const el = document.getElementById('instamart-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDineout = () => {
    const el = document.getElementById('dineout-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FF5200] text-white overflow-hidden flex flex-col justify-between font-sans">
      {/* Left Decorative Fresh Grocery Paper Bag with Clean Edge Crop */}
      <div className="hidden xl:block absolute -left-8 -bottom-6 w-[420px] h-[520px] pointer-events-none z-0">
        <img
          src="/images/swiggy_grocery_bag.jpg"
          alt="Fresh Grocery Bag"
          className="w-full h-full object-contain object-bottom-left mix-blend-multiply opacity-95"
        />
      </div>

      {/* Right Decorative Sushi & Chopsticks Plate with Clean Edge Crop */}
      <div className="hidden xl:block absolute -right-8 -top-4 w-[460px] h-[520px] pointer-events-none z-0">
        <img
          src="/images/swiggy_sushi_plate.jpg"
          alt="Asian Sushi Platter"
          className="w-full h-full object-contain object-top-right mix-blend-multiply opacity-95"
        />
      </div>

      {/* Top Navbar Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-30">
        <div className="flex items-center justify-between">
          {/* Swiggy Official Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Swiggy Pin Logo */}
            <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform p-2">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path
                  d="M16 2C10.477 2 6 6.477 6 12C6 19.5 16 30 16 30C16 30 26 19.5 26 12C26 6.477 21.523 2 16 2ZM16 16C13.791 16 12 14.209 12 12C12 9.791 13.791 8 16 8C18.209 8 20 9.791 20 12C20 14.209 18.209 16 16 16Z"
                  fill="#FF5200"
                />
              </svg>
            </div>
            <span className="font-black text-3xl sm:text-4xl tracking-tighter text-white font-sans">
              Swiggy
            </span>
          </Link>

          {/* Right Header Navigation Links */}
          <div className="flex items-center gap-4 sm:gap-7 text-sm font-semibold">
            <a
              href="#corporate"
              onClick={(e) => {
                e.preventDefault();
                addToast('Swiggy Corporate: Meal cards & corporate benefits! 💼', 'info');
              }}
              className="hidden md:inline-block text-white hover:text-white/80 transition-colors text-[15px]"
            >
              Swiggy Corporate
            </a>

            <a
              href="#partner"
              onClick={(e) => {
                e.preventDefault();
                addToast('Partner with Swiggy to boost your business 🚀', 'info');
              }}
              className="hidden md:inline-block text-white hover:text-white/80 transition-colors text-[15px]"
            >
              Partner with us
            </a>

            {/* Get the App button */}
            <button
              type="button"
              onClick={() => window.open('https://www.swiggy.com', '_blank')}
              className="px-5 py-2.5 rounded-2xl border border-white hover:bg-white/15 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span>Get the App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Sign in Button / Authenticated avatar */}
            {isAuthenticated ? (
              <div className="relative z-50" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-neutral-900 text-white rounded-2xl transition-all shadow-lg font-bold text-sm cursor-pointer"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-amber-400"
                  />
                  <span className="max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/70" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden text-xs animate-in fade-in duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                      <p className="font-black text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 font-bold text-slate-700"
                    >
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>My Orders</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-rose-50 text-rose-600 font-bold transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="px-8 py-3 rounded-2xl bg-black hover:bg-neutral-900 text-white font-extrabold text-sm shadow-xl transition-transform active:scale-95 cursor-pointer"
              >
                Sign in
              </button>
            )}

            {/* Cart Button */}
            {totalItemsCount > 0 && (
              <button
                type="button"
                onClick={openCartDrawer}
                className="px-4 py-2.5 rounded-2xl bg-white text-slate-900 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:bg-slate-100 transition-all cursor-pointer"
              >
                <span className="text-[#FF5200]">🛒</span>
                <span>{totalItemsCount}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Central Headline & Dual Search Bar Area */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10 my-auto py-6 space-y-7">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-tight sm:leading-snug drop-shadow-xs">
            Order food & groceries. Discover<br className="hidden sm:inline" /> best restaurants. Swiggy it!
          </h1>
        </div>

        {/* Center Dual Pill Bar: Location + Search Input */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            {/* Location Selector Pill */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="w-full sm:w-80 h-14 bg-white text-slate-800 px-5 rounded-2xl shadow-xl flex items-center justify-between gap-2.5 hover:bg-slate-50 transition-all text-left group shrink-0"
            >
              <div className="flex items-center gap-3 truncate">
                <MapPin className="w-5 h-5 text-[#FF5200] shrink-0" />
                <span className="font-semibold text-sm text-slate-700 truncate">
                  {currentLocation.area || 'Enter your delivery location'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 shrink-0" />
            </button>

            {/* Search Input Pill */}
            <form onSubmit={handleSearchSubmit} className="w-full flex-1 relative h-14">
              <div className="relative h-full">
                <input
                  type="text"
                  value={localSearch}
                  onChange={handleSearchChange}
                  placeholder="Search for restaurant, item or more"
                  className="w-full h-full bg-white text-slate-900 placeholder-[#93959F] px-5 pr-12 rounded-2xl shadow-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-black/10"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1.5"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 3 Prominent Swiggy White Service Cards pinned to bottom of 100vh Hero */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1: FOOD DELIVERY */}
          <div
            onClick={scrollToFood}
            className="bg-white rounded-[32px] p-6 sm:p-7 text-slate-900 shadow-2xl flex flex-col justify-between cursor-pointer hover:shadow-3xl hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden relative min-h-[220px]"
          >
            <div className="space-y-1.5 z-10 max-w-[65%]">
              <h3 className="text-2xl font-black text-[#1C1C1C] tracking-tight leading-none">
                FOOD DELIVERY
              </h3>
              <p className="text-xs font-bold text-[#686B78] uppercase tracking-wider">
                FROM RESTAURANTS
              </p>
              <div className="pt-1">
                <span className="text-xs font-black text-[#FF5200] bg-[#FFF2EA] px-2.5 py-1 rounded-md">
                  UPTO 60% OFF
                </span>
              </div>
            </div>

            {/* Bottom Left Circular Orange Action Button */}
            <div className="pt-6 z-10">
              <div className="w-11 h-11 rounded-full bg-[#FF5200] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

            {/* Bottom Right Breakfast Skillet Bowl Image */}
            <div className="absolute right-0 bottom-0 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none group-hover:scale-105 transition-transform duration-300">
              <img
                src="/images/swiggy_food_skillet.jpg"
                alt="Food Delivery Skillet"
                className="w-full h-full object-contain object-bottom-right"
              />
            </div>
          </div>

          {/* Card 2: INSTAMART */}
          <div
            onClick={scrollToInstamart}
            className="bg-white rounded-[32px] p-6 sm:p-7 text-slate-900 shadow-2xl flex flex-col justify-between cursor-pointer hover:shadow-3xl hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden relative min-h-[220px]"
          >
            <div className="space-y-1.5 z-10 max-w-[65%]">
              <h3 className="text-2xl font-black text-[#1C1C1C] tracking-tight leading-none">
                INSTAMART
              </h3>
              <p className="text-xs font-bold text-[#686B78] uppercase tracking-wider">
                INSTANT GROCERY
              </p>
              <div className="pt-1">
                <span className="text-xs font-black text-[#FF5200] bg-[#FFF2EA] px-2.5 py-1 rounded-md">
                  UPTO 60% OFF
                </span>
              </div>
            </div>

            {/* Bottom Left Circular Orange Action Button */}
            <div className="pt-6 z-10">
              <div className="w-11 h-11 rounded-full bg-[#FF5200] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

            {/* Bottom Right Grocery Basket Image */}
            <div className="absolute right-0 bottom-0 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none group-hover:scale-105 transition-transform duration-300">
              <img
                src="/images/swiggy_grocery_basket.jpg"
                alt="Instamart Basket"
                className="w-full h-full object-contain object-bottom-right"
              />
            </div>
          </div>

          {/* Card 3: DINEOUT */}
          <div
            onClick={scrollToDineout}
            className="bg-white rounded-[32px] p-6 sm:p-7 text-slate-900 shadow-2xl flex flex-col justify-between cursor-pointer hover:shadow-3xl hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden relative min-h-[220px]"
          >
            <div className="space-y-1.5 z-10 max-w-[65%]">
              <h3 className="text-2xl font-black text-[#1C1C1C] tracking-tight leading-none">
                DINEOUT
              </h3>
              <p className="text-xs font-bold text-[#686B78] uppercase tracking-wider">
                EAT OUT & SAVE MORE
              </p>
              <div className="pt-1">
                <span className="text-xs font-black text-[#FF5200] bg-[#FFF2EA] px-2.5 py-1 rounded-md">
                  UPTO 50% OFF
                </span>
              </div>
            </div>

            {/* Bottom Left Circular Orange Action Button */}
            <div className="pt-6 z-10">
              <div className="w-11 h-11 rounded-full bg-[#FF5200] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

            {/* Bottom Right Dineout Table Plate Image */}
            <div className="absolute right-0 bottom-0 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none group-hover:scale-105 transition-transform duration-300">
              <img
                src="/images/swiggy_dineout_plate.jpg"
                alt="Dineout Table Plate"
                className="w-full h-full object-contain object-bottom-right"
              />
            </div>
          </div>
        </div>

        {/* Scroll down explore indicator */}
        <div className="flex justify-center pt-6">
          <button
            type="button"
            onClick={scrollToFood}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs transition-all animate-bounce cursor-pointer shadow-md"
          >
            <span>Explore Restaurants & Menus</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwiggyLandingHeader;
