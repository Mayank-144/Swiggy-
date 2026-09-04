import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, Frown } from 'lucide-react';
import { restaurantAPI } from '../services/api';

import SwiggyLandingHeader from '../components/SwiggyHeroLanding';
import BestFoodOptions from '../components/BestFoodOptions';
import InstamartGrocerySection from '../components/InstamartGrocerySection';
import DineoutSection from '../components/DineoutSection';
import RestaurantFilterBar from '../components/RestaurantFilterBar';
import RestaurantCard from '../components/RestaurantCard';
import AppDownloadBanner from '../components/AppDownloadBanner';
import ExploreNearMe from '../components/ExploreNearMe';
import { GridSkeleton } from '../components/SkeletonLoader';

export const HomePage = ({ globalSearch = '' }) => {
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

  // Fetch restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const params = {};
        const query = globalSearch || urlSearch;
        if (query) params.search = query;
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
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [globalSearch, urlSearch, selectedCategory, vegOnly, minRating, fastDelivery, sortBy, priceRange]);

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
    // Smooth scroll down to restaurants
    const el = document.getElementById('restaurants-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollChains = (dir) => {
    if (topChainsRef.current) {
      const offset = dir === 'left' ? -350 : 350;
      topChainsRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const activeSearch = globalSearch || urlSearch;

  return (
    <div className="w-full bg-[#FAFAFC] min-h-screen">
      {/* 1. Official Swiggy Hero Orange Landing Header */}
      {!activeSearch && (
        <SwiggyLandingHeader
          onSearch={(query) => {
            if (query) setSearchParams({ search: query });
            else setSearchParams({});
          }}
          searchQuery={activeSearch}
        />
      )}

      {/* Decorative Top Orange Accent Slider Bar */}
      {!activeSearch && (
        <div className="w-full h-1.5 bg-gradient-to-r from-[#FF5200] via-[#FFA472] to-[#FF5200] opacity-80" />
      )}

      {/* Main Body Content Container */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4 sm:space-y-6 md:space-y-8 pt-3 sm:pt-4 pb-12 overflow-x-hidden">
        {/* Active Search Notification Banner */}
        {activeSearch && (
          <div className="my-4 sm:my-6 p-3.5 sm:p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col xs:flex-row xs:items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
              <Search className="w-4 h-4 text-[#FF5200] shrink-0" />
              <span className="truncate">Showing search results for "{activeSearch}"</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#FF5200] hover:underline self-start xs:self-auto cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* 2. Order our best food options */}
        {!activeSearch && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-orange-100/70 shadow-xs">
            <BestFoodOptions
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>
        )}

        {/* 3. Shop groceries on Instamart */}
        {!activeSearch && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-emerald-100/70 shadow-xs">
            <InstamartGrocerySection />
          </div>
        )}

        {/* 4. Top restaurant chains in your city */}
        {!activeSearch && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-100 shadow-xs">
            <section className="pb-2">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    Top restaurant chains in your city
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Explore iconic national brands and local favourites</p>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <button
                    onClick={() => handleScrollChains('left')}
                    aria-label="Scroll left"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-2xs cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleScrollChains('right')}
                    aria-label="Scroll right"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-2xs cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={topChainsRef}
                className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-3 scroll-smooth"
              >
                {restaurants.slice(0, 6).map((restaurant) => (
                  <div key={restaurant.id} className="w-60 sm:w-72 shrink-0 flex flex-col">
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 5. Discover best restaurants on Dineout */}
        {!activeSearch && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-rose-100/70 shadow-xs">
            <DineoutSection />
          </div>
        )}

        {/* 6. Restaurants with online food delivery Grid & Filter Toolbar */}
        <div id="restaurants-grid-section" className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-100 shadow-xs">
          <section className="py-1 sm:py-2">
            <RestaurantFilterBar
              vegOnly={vegOnly}
              setVegOnly={setVegOnly}
              minRating={minRating}
              setMinRating={setMinRating}
              fastDelivery={fastDelivery}
              setFastDelivery={setFastDelivery}
              sortBy={sortBy}
              setSortBy={setSortBy}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              totalCount={restaurants.length}
              onReset={handleResetFilters}
            />

            <div className="my-6 sm:my-8">
              {loading ? (
                <GridSkeleton count={8} />
              ) : restaurants.length === 0 ? (
                <div className="text-center py-12 sm:py-20 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100 p-6 sm:p-8 space-y-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <Frown className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-800">No matching restaurants found</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Try clearing your filters or search for something else like "Biryani", "Pizza", or "Burgers".
                    </p>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#FF5200] hover:bg-[#E04800] text-white font-bold text-xs rounded-xl shadow-md transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id || restaurant._id} restaurant={restaurant} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* 7. App Download Banner */}
        {!activeSearch && <AppDownloadBanner />}

        {/* 8. Explore Near Me & Cities Accordion Directory */}
        {!activeSearch && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-100 shadow-xs">
            <ExploreNearMe onSelectCuisine={(c) => setSearchParams({ search: c })} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
