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
  X,
  Menu,
  Sparkles,
  ExternalLink,
  Smartphone,
  Building2,
  Briefcase,
  UtensilsCrossed,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { restaurantAPI } from '../services/api';
import SwiggyLogo from './SwiggyLogo';
import SearchSuggestionsDropdown from './SearchSuggestionsDropdown';

export const Navbar = ({ onSearch, searchQuery = '' }) => {
  const { user, isAuthenticated, openAuthModal, logout, currentLocation, setIsLocationModalOpen } = useAuth();
  const { totalItemsCount, openCartDrawer } = useCart();
  const { addToast } = useToast();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [suggestions, setSuggestions] = useState(null);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [showDesktopSuggestions, setShowDesktopSuggestions] = useState(false);
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);

  const userMenuRef = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

  // Debounce search suggestions
  useEffect(() => {
    if (!localSearch || localSearch.trim().length === 0) {
      setSuggestions(null);
      return;
    }

    const timer = setTimeout(async () => {
      setSuggestionsLoading(true);
      try {
        const res = await restaurantAPI.getSuggestions(localSearch.trim());
        if (res.success) {
          setSuggestions(res);
        }
      } catch (err) {
        console.warn('Search suggestions error:', err);
      } finally {
        setSuggestionsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [localSearch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(e.target)) {
        setShowDesktopSuggestions(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
        setShowMobileSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowDesktopSuggestions(false);
    setShowMobileSuggestions(false);
    if (onSearch) {
      onSearch(localSearch.trim());
    }
    if (location.pathname !== '/' && location.pathname !== '/food') {
      navigate('/food');
    }
  };

  const handleSearchChange = (val) => {
    setLocalSearch(val);
    setShowDesktopSuggestions(true);
    setShowMobileSuggestions(true);
  };

  const handleSelectSuggestion = (text) => {
    setLocalSearch(text);
    setShowDesktopSuggestions(false);
    setShowMobileSuggestions(false);
    if (onSearch) {
      onSearch(text);
    }
    if (location.pathname !== '/' && location.pathname !== '/food') {
      navigate('/food');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo & Location */}
        <div className="flex items-center gap-2.5 sm:gap-6 shrink-0">
          {/* Swiggy Official Brand Logo */}
          <Link to="/" className="flex items-center">
            <SwiggyLogo variant="orange" size="md" />
          </Link>

          {/* Location Selector (Desktop/Tablet) */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="hidden md:flex items-center gap-2 hover:text-swiggy-orange transition-colors text-left max-w-[200px] lg:max-w-[240px] pl-3 border-l border-slate-200 cursor-pointer"
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

        {/* Center: Live Search Bar (Desktop / Tablet) */}
        <div ref={desktopSearchRef} className="flex-1 max-w-md relative hidden sm:block mx-2">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setShowDesktopSuggestions(true)}
              placeholder="Search for restaurants, biryani, pizza or burgers..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-slate-100 hover:bg-slate-50 border border-slate-200/80 focus:bg-white focus:border-swiggy-orange text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-inner"
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Live Search Suggestions Dropdown */}
          {showDesktopSuggestions && localSearch.trim().length > 0 && (
            <SearchSuggestionsDropdown
              suggestions={suggestions}
              loading={suggestionsLoading}
              query={localSearch}
              onSelectSuggestion={handleSelectSuggestion}
              onClose={() => setShowDesktopSuggestions(false)}
            />
          )}
        </div>

        {/* Right: Nav Links, Auth, Cart & Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0">
          {/* Quick Service Links (Desktop) */}
          <div className="hidden xl:flex items-center gap-4 text-xs font-bold text-slate-700">
            <Link to="/food" className="hover:text-swiggy-orange transition-colors flex items-center gap-1">
              <UtensilsCrossed className="w-3.5 h-3.5 text-swiggy-orange" />
              <span>Food</span>
            </Link>
            <Link to="/instamart" className="hover:text-swiggy-orange transition-colors flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />
              <span>Instamart</span>
            </Link>
            <Link to="/dineout" className="hover:text-swiggy-orange transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Dineout</span>
            </Link>
          </div>

          {/* Swiggy Offers Link (Desktop) */}
          <Link
            to="/"
            className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-swiggy-orange transition-colors"
          >
            <Percent className="w-4 h-4 text-slate-500" />
            <span>Offers</span>
            <span className="bg-swiggy-orange text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">
              New
            </span>
          </Link>

          {/* User Account / Sign In (Desktop/Tablet) */}
          {isAuthenticated ? (
            <div className="relative hidden sm:block" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
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

                    <Link
                      to="/profile?tab=favorites"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-swiggy-orange transition-colors"
                    >
                      <Heart className="w-4 h-4 text-slate-400" />
                      <span>Favorites</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
              className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-swiggy-orange transition-colors px-3 py-2 rounded-xl hover:bg-slate-100 cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>Sign In</span>
            </button>
          )}

          {/* Cart Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={openCartDrawer}
            className="relative flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-slate-900 hover:bg-black text-white font-extrabold text-xs shadow-md transition-all group cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-swiggy-orange group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Cart</span>
            {totalItemsCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-0.5 px-1.5 py-0.5 bg-swiggy-orange text-white text-[10px] sm:text-[11px] font-black rounded-full shadow-sm"
              >
                {totalItemsCount}
              </motion.span>
            )}
          </motion.button>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="sm:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-swiggy-orange transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar (Full Width under navbar on mobile) */}
      <div ref={mobileSearchRef} className="sm:hidden px-3.5 pb-3 relative">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setShowMobileSuggestions(true)}
            placeholder="Search restaurants, cuisines, dishes..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold focus:bg-white focus:outline-none focus:border-swiggy-orange transition-all"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {/* Live Search Suggestions Dropdown on Mobile */}
        {showMobileSuggestions && localSearch.trim().length > 0 && (
          <SearchSuggestionsDropdown
            suggestions={suggestions}
            loading={suggestionsLoading}
            query={localSearch}
            onSelectSuggestion={handleSelectSuggestion}
            onClose={() => setShowMobileSuggestions(false)}
          />
        )}
      </div>

      {/* Full-Screen Mobile Navigation Drawer (z-[100]) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] sm:hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="w-full max-w-xs sm:max-w-sm h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Drawer Top Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <SwiggyLogo variant="orange" size="sm" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="p-4 space-y-4 flex-1">
                {/* Location Box */}
                <div className="p-3 bg-orange-50 rounded-2xl border border-orange-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 truncate">
                    <MapPin className="w-4 h-4 text-swiggy-orange shrink-0" />
                    <div className="truncate text-left">
                      <p className="text-xs font-black text-slate-800 truncate">{currentLocation.area}</p>
                      <p className="text-[10px] text-slate-500 truncate">{currentLocation.city}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLocationModalOpen(true);
                    }}
                    className="px-2.5 py-1 bg-white border border-swiggy-orange text-swiggy-orangeDark font-extrabold text-[10px] rounded-lg shadow-2xs shrink-0 cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                {/* User Account / Sign In on Mobile */}
                {isAuthenticated ? (
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-swiggy-orange"
                      />
                      <div className="truncate">
                        <p className="font-black text-xs text-slate-800 truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-200/60">
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white border border-slate-100 text-center"
                      >
                        <Clock className="w-4 h-4 text-slate-600" />
                        <span className="text-[10px] font-bold text-slate-700">Orders</span>
                      </Link>
                      <Link
                        to="/profile?tab=addresses"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white border border-slate-100 text-center"
                      >
                        <MapPin className="w-4 h-4 text-slate-600" />
                        <span className="text-[10px] font-bold text-slate-700">Addresses</span>
                      </Link>
                      <Link
                        to="/profile?tab=favorites"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white border border-slate-100 text-center"
                      >
                        <Heart className="w-4 h-4 text-slate-600" />
                        <span className="text-[10px] font-bold text-slate-700">Favorites</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openAuthModal('login');
                    }}
                    className="w-full py-3.5 bg-[#FF5200] hover:bg-[#E04800] text-white font-black text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer active:scale-95 transition-transform"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In / Create Account</span>
                  </button>
                )}

                {/* Main Services Navigation */}
                <div className="space-y-1 pt-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 px-3 tracking-wider">Services</p>

                  <Link
                    to="/food"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 text-xs font-extrabold text-slate-800 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <UtensilsCrossed className="w-4 h-4 text-[#FF5200]" />
                      <span>Food Delivery</span>
                    </span>
                    <span className="text-[9px] font-black uppercase text-[#FF5200] bg-orange-50 px-2 py-0.5 rounded-full">
                      UPTO 60%
                    </span>
                  </Link>

                  <Link
                    to="/instamart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-purple-50 text-xs font-extrabold text-slate-800 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Zap className="w-4 h-4 text-purple-600 fill-purple-600" />
                      <span>Swiggy Instamart</span>
                    </span>
                    <span className="text-[9px] font-black uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                      10 MINS
                    </span>
                  </Link>

                  <Link
                    to="/dineout"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-rose-50 text-xs font-extrabold text-slate-800 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-rose-500" />
                      <span>Swiggy Dineout</span>
                    </span>
                    <span className="text-[9px] font-black uppercase text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                      UPTO 50%
                    </span>
                  </Link>

                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Percent className="w-4 h-4 text-amber-500" />
                      <span>Offers &amp; Deals</span>
                    </span>
                  </Link>
                </div>

                {/* Corporate & Partner links */}
                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <a
                    href="#corporate"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      addToast('Swiggy Corporate: Meal cards & corporate benefits!', 'info');
                    }}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-600 transition-colors"
                  >
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span>Swiggy Corporate</span>
                  </a>

                  <a
                    href="#partner"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      addToast('Partner with Swiggy to boost your business!', 'info');
                    }}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-600 transition-colors"
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
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-600 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Smartphone className="w-4 h-4 text-slate-400" />
                      <span>Get the Swiggy App</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Logout button at bottom if authenticated */}
              {isAuthenticated && (
                <div className="p-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full py-2.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

