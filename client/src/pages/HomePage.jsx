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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4 pb-12">
        {/* Active Search Notification Banner */}
        {activeSearch && (
          <div className="my-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Search className="w-4 h-4 text-[#FF5200]" />
              <span>Showing search results for "{activeSearch}"</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#FF5200] hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* 2. Order our best food options */}
        {!activeSearch && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100/70 shadow-xs">
            <BestFoodOptions
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>
        )}

        {/* 3. Shop groceries on Instamart */}
        {!activeSearch && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100/70 shadow-xs">
            <InstamartGrocerySection />
          </div>
        )}

        {/* 4. Top restaurant chains in your city */}
        {!activeSearch && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
            <section className="pb-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Top restaurant chains in your city
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Explore iconic national brands and local favourites</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleScrollChains('left')}
                    aria-label="Scroll left"
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-2xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleScrollChains('right')}
                    aria-label="Scroll right"
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-2xs"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={topChainsRef}
                className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-3 scroll-smooth"
              >
                {restaurants.slice(0, 6).map((restaurant) => (
                  <div key={restaurant.id} className="w-64 sm:w-72 shrink-0">
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 5. Discover best restaurants on Dineout */}
        {!activeSearch && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100/70 shadow-xs">
            <DineoutSection />
          </div>
        )}

        {/* 6. Restaurants with online food delivery Grid & Filter Toolbar */}
        <div id="restaurants-grid-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
          <section className="py-2">
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

            <div className="my-8">
              {loading ? (
                <GridSkeleton count={8} />
              ) : restaurants.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100 p-8 space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <Frown className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-800">No matching restaurants found</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Try clearing your filters or search for something else like "Biryani", "Pizza", or "Burgers".
                    </p>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-[#FF5200] hover:bg-[#E04800] text-white font-bold text-xs rounded-xl shadow-md transition-colors uppercase tracking-wider"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
            <ExploreNearMe onSelectCuisine={(c) => setSearchParams({ search: c })} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
