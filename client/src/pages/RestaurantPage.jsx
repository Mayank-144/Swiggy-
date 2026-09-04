import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Clock,
  MapPin,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  Tag,
  ArrowLeft,
  ShoppingBag,
  Info
} from 'lucide-react';
import { restaurantAPI } from '../services/api';
import MenuItemCard from '../components/MenuItemCard';
import { MenuItemSkeleton } from '../components/SkeletonLoader';
import { useCart } from '../context/CartContext';

export const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vegOnly, setVegOnly] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [openCategories, setOpenCategories] = useState({});

  const { totalItemsCount, grandTotal, openCartDrawer } = useCart();

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await restaurantAPI.getRestaurantById(id);
        if (res.success) {
          setRestaurant(res.data);
          // Default all categories open
          const initOpen = {};
          res.data.menuCategories?.forEach((cat) => {
            initOpen[cat.name] = true;
          });
          setOpenCategories(initOpen);
        }
      } catch (err) {
        console.error('Error loading restaurant:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const toggleCategory = (catName) => {
    setOpenCategories((prev) => ({ ...prev, [catName]: !prev[catName] }));
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="h-40 bg-slate-200 rounded-3xl animate-pulse" />
        <div className="space-y-4">
          <MenuItemSkeleton />
          <MenuItemSkeleton />
          <MenuItemSkeleton />
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-xl font-black text-slate-800">Restaurant Not Found</h3>
        <p className="text-xs text-slate-400">The restaurant you are looking for does not exist or has been removed.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-swiggy-orange text-white text-xs font-bold rounded-xl shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-28">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-slate-400 mb-3 sm:mb-4 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
        <Link to="/" className="hover:text-swiggy-orange shrink-0">Home</Link>
        <span>/</span>
        <span className="text-slate-600 truncate max-w-[100px] sm:max-w-none">{restaurant.location?.city || 'Bengaluru'}</span>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate max-w-[150px] sm:max-w-none">{restaurant.name}</span>
      </div>

      {/* Restaurant Main Info Header Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-100 shadow-sm space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-slate-100">
          <div className="space-y-1 sm:space-y-1.5 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              {restaurant.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium truncate sm:whitespace-normal">
              {restaurant.cuisines?.join(', ')}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{restaurant.location?.address || `${restaurant.location?.area}, ${restaurant.location?.city}`}</span>
            </div>
          </div>

          {/* Rating Block */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200/70 shrink-0">
            <div className="flex items-center gap-1 text-emerald-700 font-black text-sm sm:text-base">
              <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              <span>{restaurant.rating}</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold mt-0.5">
              {restaurant.totalRatingsString || '1K+ ratings'}
            </span>
          </div>
        </div>

        {/* Time, Distance & Price Pills */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm font-extrabold text-slate-700">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1">
            <span>{restaurant.distance || '2.5 km'}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div>
            <span>{restaurant.costForTwoMessage}</span>
          </div>
        </div>

        {/* Deals & Offers Banner */}
        {restaurant.discount && (
          <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-300/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Tag className="w-4 h-4 text-swiggy-orange shrink-0" />
              <span>{restaurant.discount}</span>
            </div>
            {restaurant.discountCode && (
              <span className="px-2.5 py-0.5 sm:py-1 rounded-lg bg-white font-mono text-[10px] sm:text-[11px] font-black text-amber-800 border border-amber-200 shadow-2xs shrink-0 self-start sm:self-auto">
                USE {restaurant.discountCode}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Menu Filters: Veg Only Toggle & Menu Search */}
      <div className="my-5 sm:my-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 sticky top-14 sm:top-20 z-30 bg-[#FAFAFC]/95 backdrop-blur-md py-2.5 sm:py-3">
        {/* Veg Only Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
              vegOnly
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="veg-icon">
              <span className="veg-dot" />
            </span>
            <span>Pure Veg Dishes Only</span>
          </button>
        </div>

        {/* In-Menu Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={menuSearch}
            onChange={(e) => setMenuSearch(e.target.value)}
            placeholder="Search within this menu..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:border-swiggy-orange shadow-sm"
          />
        </div>
      </div>

      {/* Menu Categories Accordion */}
      <div className="space-y-4 sm:space-y-6">
        {restaurant.menuCategories?.map((category) => {
          // Filter items based on vegOnly and menuSearch
          const filteredItems = category.items.filter((item) => {
            if (vegOnly && !item.isVeg) return false;
            if (menuSearch) {
              const q = menuSearch.toLowerCase();
              return (
                item.name.toLowerCase().includes(q) ||
                (item.description && item.description.toLowerCase().includes(q))
              );
            }
            return true;
          });

          if (filteredItems.length === 0) return null;

          const isOpen = openCategories[category.name] !== false;

          return (
            <div
              key={category.name}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-sm overflow-hidden"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between font-black text-base sm:text-lg text-slate-800 tracking-tight pb-2"
              >
                <span className="truncate pr-2 text-left">
                  {category.name} ({filteredItems.length})
                </span>
                <div className="p-1 rounded-full hover:bg-slate-100 text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Accordion Items List */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="divide-y divide-slate-100">
                      {filteredItems.map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          restaurant={restaurant}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Cart Bar */}
      {totalItemsCount > 0 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-4 max-w-xl mx-auto z-40"
        >
          <button
            onClick={openCartDrawer}
            className="w-full bg-slate-900 text-white p-3 sm:p-4 rounded-2xl shadow-2xl flex items-center justify-between font-black text-sm hover:bg-black transition-all border border-slate-800"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="p-2 bg-swiggy-orange rounded-xl text-white shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                  {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'} added
                </p>
                <p className="text-sm sm:text-base font-black">₹{grandTotal}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 text-swiggy-orange uppercase tracking-wider text-xs font-black shrink-0">
              <span>View Cart</span>
              <span>→</span>
            </div>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default RestaurantPage;
