import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Sparkles, Flame, Clock, Star, ArrowRight } from 'lucide-react';
import { restaurantAPI } from '../services/api';
import BestFoodOptions from '../components/BestFoodOptions';
import RestaurantFilterBar from '../components/RestaurantFilterBar';
import RestaurantCard from '../components/RestaurantCard';
import { GridSkeleton } from '../components/SkeletonLoader';

export const FoodDeliveryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [vegOnly, setVegOnly] = useState(false);
  const [minRating, setMinRating] = useState('');
  const [fastDelivery, setFastDelivery] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState('');

  const topChainsRef = useRef(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const params = {};
        if (urlSearch) params.search = urlSearch;
        if (selectedCategory && selectedCategory !== 'all') params.cuisine = selectedCategory;
        if (vegOnly) params.vegOnly = 'true';
        if (minRating) params.minRating = minRating;
        if (sortBy !== 'relevance') params.sortBy = sortBy;

        const res = await restaurantAPI.getRestaurants(params);
        if (res.success) {
          let list = res.data;
          if (fastDelivery) {
            list = list.filter((r) => r.deliveryTimeMinutes <= 25);
          }
          if (priceRange === 'low') {
            list = list.filter((r) => r.priceForTwo < 300);
          } else if (priceRange === 'mid') {
            list = list.filter((r) => r.priceForTwo >= 300 && r.priceForTwo <= 600);
          }
          setRestaurants(list);
        }
      } catch (err) {
        console.error('Error fetching food delivery restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [urlSearch, selectedCategory, vegOnly, minRating, fastDelivery, sortBy, priceRange]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setVegOnly(false);
    setMinRating('');
    setFastDelivery(false);
    setSortBy('relevance');
    setPriceRange('');
    setSearchParams({});
  };

  const handleSelectCategory = (catId) => {
    setSelectedCategory(selectedCategory === catId ? 'all' : catId);
    const el = document.getElementById('food-restaurants-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollChains = (dir) => {
    if (topChainsRef.current) {
      const offset = dir === 'left' ? -350 : 350;
      topChainsRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#FAFAFC] min-h-screen pb-16">
      {/* Top Banner for Food Delivery */}
      <div className="w-full bg-gradient-to-r from-[#FF5200] via-[#FF6D2C] to-[#FFA048] text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white">
              <Flame className="w-3.5 h-3.5 text-amber-200" />
              <span>Lightning Fast Delivery in 25-30 Mins</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Order Food Online
            </h1>
            <p className="text-xs sm:text-sm text-white/90 max-w-xl">
              From your favorite local eateries to top national brands, get delicious meals delivered fresh and fast right to your doorstep.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center min-w-[110px]">
              <p className="text-xl sm:text-2xl font-black text-white">UPTO 60%</p>
              <p className="text-[10px] font-bold text-white/80 uppercase">Daily Deals</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center min-w-[110px]">
              <p className="text-xl sm:text-2xl font-black text-white">5000+</p>
              <p className="text-[10px] font-bold text-white/80 uppercase">Restaurants</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-6 sm:pt-10">
        {/* Active Search Banner */}
        {urlSearch && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5 text-amber-900 font-bold text-xs sm:text-sm">
              <Search className="w-4 h-4 text-[#FF5200] shrink-0" />
              <span className="truncate">Showing search results for "{urlSearch}"</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#FF5200] hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* 1. Category Options Carousel */}
        {!urlSearch && (
          <section className="pb-4 sm:pb-6 border-b border-slate-100">
            <BestFoodOptions
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </section>
        )}

        {/* 2. Top Restaurant Chains */}
        {!urlSearch && restaurants.length > 0 && (
          <section className="pb-4 sm:pb-6 border-b border-slate-100">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  Top restaurant chains in your city
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">Explore iconic national brands and local favourites</p>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => handleScrollChains('left')}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-2xs cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScrollChains('right')}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-2xs cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={topChainsRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-3 scroll-smooth"
            >
              {restaurants.map((rest) => (
                <div key={rest.id || rest._id} className="w-64 sm:w-72 md:w-80 shrink-0">
                  <RestaurantCard restaurant={rest} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. All Restaurants Section */}
        <section id="food-restaurants-grid" className="space-y-4 sm:space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                Restaurants with online food delivery
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Showing {restaurants.length} top places near you
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <RestaurantFilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            vegOnly={vegOnly}
            onToggleVeg={() => setVegOnly(!vegOnly)}
            minRating={minRating}
            onSelectRating={setMinRating}
            fastDelivery={fastDelivery}
            onToggleFastDelivery={() => setFastDelivery(!fastDelivery)}
            sortBy={sortBy}
            onSelectSort={setSortBy}
            priceRange={priceRange}
            onSelectPriceRange={setPriceRange}
            onResetFilters={handleResetFilters}
          />

          {/* Restaurants Grid */}
          {loading ? (
            <GridSkeleton count={8} />
          ) : restaurants.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 space-y-4 shadow-xs">
              <h3 className="text-lg font-black text-slate-800">No restaurants match your filters</h3>
              <p className="text-xs text-slate-400">Try changing or clearing your filters to see more results</p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#FF5200] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {restaurants.map((rest) => (
                <RestaurantCard key={rest.id || rest._id} restaurant={rest} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default FoodDeliveryPage;
