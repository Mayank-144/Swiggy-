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
  LogOut,
  Menu,
  X,
  Smartphone,
  Briefcase,
  Building2,
  Percent,
  User,
  Heart,
  ShoppingBag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import SwiggyLogo from './SwiggyLogo';

export const SwiggyLandingHeader = ({ onSearch, searchQuery = '' }) => {
  const { user, isAuthenticated, openAuthModal, logout, currentLocation, setIsLocationModalOpen } = useAuth();
  const { totalItemsCount, openCartDrawer } = useCart();
  const { addToast } = useToast();
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <div className="relative w-full bg-[#FF5200] text-white overflow-hidden flex flex-col justify-between font-sans min-h-[auto] lg:min-h-screen py-3 sm:py-6">
      {/* Left Decorative Fresh Grocery Bag (Official Swiggy asset, edge-cropped corner clamp) */}
      <div
        className="absolute pointer-events-none z-0 overflow-hidden select-none"
        style={{
          width: 'clamp(120px, 25vw, 440px)',
          height: 'clamp(130px, 28vw, 480px)',
          left: 'clamp(-40px, -2vw, 0px)',
          top: 'clamp(14%, 18vw, 22%)',
        }}
      >
        <img
          src="/images/swiggy_grocery_bag.png"
          alt="Fresh Grocery Bag"
          className="w-full h-full object-contain object-left"
        />
      </div>

      {/* Right Decorative Sushi & Chopsticks Plate (Official Swiggy asset, edge-cropped corner clamp) */}
      <div
        className="absolute pointer-events-none z-0 overflow-hidden select-none"
        style={{
          width: 'clamp(130px, 26vw, 460px)',
          height: 'clamp(130px, 26vw, 460px)',
          right: 'clamp(-40px, -2vw, 0px)',
          top: 'clamp(8%, 12vw, 16%)',
        }}
      >
        <img
          src="/images/swiggy_sushi_plate.png"
          alt="Asian Sushi Platter"
          className="w-full h-full object-contain object-right"
        />
      </div>

      {/* Top Navbar Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 sm:pt-2 relative z-30">
        <div className="flex items-center justify-between gap-2">
          {/* Swiggy Official Brand Logo */}
          <SwiggyLogo variant="white" size="md" />

          {/* Right Header Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-5 md:gap-7 text-sm font-semibold">
            <a
              href="#corporate"
              onClick={(e) => {
                e.preventDefault();
                addToast('Swiggy Corporate: Meal cards & corporate benefits!', 'info');
              }}
              className="hidden md:inline-block text-white hover:text-white/80 transition-colors text-[14px] lg:text-[15px]"
            >
              Swiggy Corporate
            </a>

            <a
              href="#partner"
              onClick={(e) => {
                e.preventDefault();
                addToast('Partner with Swiggy to boost your business!', 'info');
              }}
              className="hidden md:inline-block text-white hover:text-white/80 transition-colors text-[14px] lg:text-[15px]"
            >
              Partner with us
            </a>

            {/* Get the App button (Desktop/Tablet) */}
            <button
              type="button"
              onClick={() => window.open('https://www.swiggy.com', '_blank')}
              className="hidden sm:flex px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl border border-white hover:bg-white/15 text-white font-bold text-xs sm:text-sm items-center gap-1.5 transition-all shadow-xs cursor-pointer"
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
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 bg-black hover:bg-neutral-900 text-white rounded-2xl transition-all shadow-lg font-bold text-xs sm:text-sm cursor-pointer"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                    alt={user?.name || 'User'}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-amber-400 shrink-0"
                  />
                  <span className="hidden xs:inline max-w-[75px] truncate">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/70 shrink-0" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden text-xs animate-in fade-in duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                      <p className="font-black text-slate-900 truncate">{user?.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 font-bold text-slate-700"
                    >
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>My Orders</span>
                    </Link>
                    <Link
                      to="/profile?tab=addresses"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 font-bold text-slate-700"
                    >
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>Addresses</span>
                    </Link>
                    <Link
                      to="/profile?tab=favorites"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 font-bold text-slate-700"
                    >
                      <Heart className="w-4 h-4 text-slate-400" />
                      <span>Favorites</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-rose-50 text-rose-600 font-bold transition-colors cursor-pointer text-left border-t border-slate-100 mt-1"
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
                className="px-5 sm:px-8 py-2 sm:py-3 rounded-2xl bg-black hover:bg-neutral-900 text-white font-extrabold text-xs sm:text-sm shadow-xl transition-transform active:scale-95 cursor-pointer"
              >
                Sign in
              </button>
            )}

            {/* Cart Button */}
            {totalItemsCount > 0 && (
              <button
                type="button"
                onClick={openCartDrawer}
                className="px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-2xl bg-white text-slate-900 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:bg-slate-100 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#FF5200] shrink-0 stroke-[2.5]" />
                <span>{totalItemsCount}</span>
              </button>
            )}

            {/* Mobile Menu Icon */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer for Landing Page */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-3 bg-white text-slate-800 rounded-2xl shadow-2xl p-4 space-y-2.5 text-xs font-bold"
            >
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLocationModalOpen(true);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-orange-50 text-swiggy-orangeDark border border-orange-200"
              >
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-4 h-4 text-[#FF5200] shrink-0" />
                  <span className="truncate">{currentLocation.area || 'Set Location'}</span>
                </div>
                <span className="text-[10px] uppercase font-black underline">Change</span>
              </button>

              <a
                href="#corporate"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  addToast('Swiggy Corporate: Meal cards & corporate benefits! 💼', 'info');
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-slate-50 text-slate-700"
              >
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span>Swiggy Corporate</span>
              </a>

              <a
                href="#partner"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  addToast('Partner with Swiggy to boost your business 🚀', 'info');
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-slate-50 text-slate-700"
              >
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>Partner with us</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.open('https://www.swiggy.com', '_blank');
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700"
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-slate-400" />
                  <span>Get the App</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Central Headline & Dual Search Bar Area */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-20 my-auto py-4 sm:py-6 space-y-4 sm:space-y-6">
        <div className="text-center">
          <h1
            className="font-black text-white tracking-tight leading-[1.14] drop-shadow-xs max-w-4xl mx-auto text-center flex flex-col items-center justify-center"
            style={{
              fontSize: 'clamp(1.35rem, 3.8vw, 3.35rem)',
            }}
          >
            <span className="block whitespace-normal sm:whitespace-nowrap">Order food &amp; groceries. Discover</span>
            <span className="block whitespace-normal sm:whitespace-nowrap">best restaurants. Swiggy it!</span>
          </h1>
        </div>

        {/* Dual Input Boxes: Location Selector & Search Input */}
        <div className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          {/* Location Box */}
          <button
            type="button"
            onClick={() => setIsLocationModalOpen(true)}
            className="w-full sm:w-[40%] h-12 sm:h-13 bg-white text-slate-800 px-4 rounded-2xl shadow-md flex items-center justify-between gap-2 hover:bg-slate-50 transition-all text-left group shrink-0 cursor-pointer"
          >
            <div className="flex items-center gap-2.5 truncate">
              <MapPin className="w-4.5 h-4.5 text-[#FF5200] shrink-0" />
              <span className="font-semibold text-xs sm:text-[13.5px] text-slate-700 truncate">
                {currentLocation.area || 'Enter your delivery location'}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 shrink-0" />
          </button>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="w-full sm:w-[60%] relative h-12 sm:h-13">
            <div className="relative h-full w-full flex items-center bg-white rounded-2xl shadow-md">
              <input
                type="text"
                value={localSearch}
                onChange={handleSearchChange}
                placeholder="Search for restaurant, item or more"
                className="w-full h-full bg-transparent text-slate-900 placeholder-[#93959F] px-4 pr-11 rounded-2xl text-xs sm:text-[13.5px] font-semibold focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#FF5200] p-1 cursor-pointer transition-colors"
              >
                <Search className="w-4.5 h-4.5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 3 Prominent Swiggy Service Cards (Matching Reference Screenshot) */}
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 pb-4 sm:pb-8 relative z-10">
        <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-4xl lg:max-w-5xl mx-auto">
          {/* Card 1: FOOD DELIVERY */}
          <div
            onClick={scrollToFood}
            className="bg-white rounded-3xl p-3.5 xs:p-4 sm:p-5 lg:p-6 text-slate-900 shadow-xl flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative min-h-[145px] xs:min-h-[165px] sm:min-h-[200px] lg:min-h-[235px] select-none"
          >
            <div className="space-y-1 z-10 max-w-[62%] sm:max-w-[60%] lg:max-w-[65%] pr-0.5">
              <h3 className="text-xs xs:text-sm sm:text-lg lg:text-xl font-black text-[#1C1C1C] tracking-tight leading-tight">
                FOOD DELIVERY
              </h3>
              <p className="text-[8px] xs:text-[9.5px] sm:text-xs font-bold text-[#686B78] uppercase tracking-wider truncate">
                FROM RESTAURANTS
              </p>
              <div className="pt-0.5 sm:pt-1">
                <span className="text-[7.5px] xs:text-[9px] sm:text-xs font-black text-[#FF5200] bg-[#FFF2EA] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded sm:rounded-md inline-block whitespace-nowrap shadow-2xs">
                  UPTO 60% OFF
                </span>
              </div>
            </div>

            {/* Bottom Left Circular Orange Action Button */}
            <div className="pt-2 sm:pt-4 z-10">
              <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-[#FF5200] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <ArrowRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
              </div>
            </div>

            {/* Bottom Right Skillet Food Image */}
            <div className="absolute right-0 bottom-0 w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 pointer-events-none group-hover:scale-105 transition-transform duration-300">
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
            className="bg-white rounded-3xl p-3.5 xs:p-4 sm:p-5 lg:p-6 text-slate-900 shadow-xl flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative min-h-[145px] xs:min-h-[165px] sm:min-h-[200px] lg:min-h-[235px] select-none"
          >
            <div className="space-y-1 z-10 max-w-[62%] sm:max-w-[60%] lg:max-w-[65%] pr-0.5">
              <h3 className="text-xs xs:text-sm sm:text-lg lg:text-xl font-black text-[#1C1C1C] tracking-tight leading-tight">
                INSTAMART
              </h3>
              <p className="text-[8px] xs:text-[9.5px] sm:text-xs font-bold text-[#686B78] uppercase tracking-wider truncate">
                INSTANT GROCERY
              </p>
              <div className="pt-0.5 sm:pt-1">
                <span className="text-[7.5px] xs:text-[9px] sm:text-xs font-black text-[#FF5200] bg-[#FFF2EA] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded sm:rounded-md inline-block whitespace-nowrap shadow-2xs">
                  UPTO 60% OFF
                </span>
              </div>
            </div>

            {/* Bottom Left Circular Orange Action Button */}
            <div className="pt-2 sm:pt-4 z-10">
              <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-[#FF5200] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <ArrowRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
              </div>
            </div>

            {/* Bottom Right Grocery Basket Image */}
            <div className="absolute right-0 bottom-0 w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 pointer-events-none group-hover:scale-105 transition-transform duration-300">
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
            className="bg-white rounded-3xl p-3.5 xs:p-4 sm:p-5 lg:p-6 text-slate-900 shadow-xl flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative min-h-[145px] xs:min-h-[165px] sm:min-h-[200px] lg:min-h-[235px] select-none"
          >
            <div className="space-y-1 z-10 max-w-[62%] sm:max-w-[60%] lg:max-w-[65%] pr-0.5">
              <h3 className="text-xs xs:text-sm sm:text-lg lg:text-xl font-black text-[#1C1C1C] tracking-tight leading-tight">
                DINEOUT
              </h3>
              <p className="text-[8px] xs:text-[9.5px] sm:text-xs font-bold text-[#686B78] uppercase tracking-wider truncate">
                EAT OUT & SAVE MORE
              </p>
              <div className="pt-0.5 sm:pt-1">
                <span className="text-[7.5px] xs:text-[9px] sm:text-xs font-black text-[#FF5200] bg-[#FFF2EA] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded sm:rounded-md inline-block whitespace-nowrap shadow-2xs">
                  UPTO 50% OFF
                </span>
              </div>
            </div>

            {/* Bottom Left Circular Orange Action Button */}
            <div className="pt-2 sm:pt-4 z-10">
              <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-[#FF5200] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <ArrowRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
              </div>
            </div>

            {/* Bottom Right Dineout Table Plate Image */}
            <div className="absolute right-0 bottom-0 w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 pointer-events-none group-hover:scale-105 transition-transform duration-300">
              <img
                src="/images/swiggy_dineout_plate.jpg"
                alt="Dineout Table Plate"
                className="w-full h-full object-contain object-bottom-right"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiggyLandingHeader;

