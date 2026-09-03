import React from 'react';
import { SlidersHorizontal, ChevronDown, Check, X, Sparkles } from 'lucide-react';

export const RestaurantFilterBar = ({
  vegOnly,
  setVegOnly,
  minRating,
  setMinRating,
  fastDelivery,
  setFastDelivery,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  totalCount,
  onReset
}) => {
  const hasActiveFilters = vegOnly || minRating || fastDelivery || priceRange || sortBy !== 'relevance';

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 my-2 border-b border-slate-100">
      {/* Title & Count */}
      <div>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
          <span>Restaurants with online food delivery</span>
          <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
            {totalCount}
          </span>
        </h2>
      </div>

      {/* Filter Chips Toolbar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {/* Sort Dropdown */}
        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-sm hover:border-slate-300 focus:outline-none focus:border-swiggy-orange cursor-pointer"
          >
            <option value="relevance">Sort By: Relevance</option>
            <option value="rating">Rating: High to Low</option>
            <option value="deliveryTime">Delivery Time: Fast First</option>
            <option value="costLowToHigh">Cost: Low to High</option>
            <option value="costHighToLow">Cost: High to Low</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Fast Delivery (< 25 mins) */}
        <button
          onClick={() => setFastDelivery(!fastDelivery)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
            fastDelivery
              ? 'bg-swiggy-orangeLight border-swiggy-orange text-swiggy-orangeDark shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span>Fast Delivery (⚡ &lt;25m)</span>
          {fastDelivery && <Check className="w-3 h-3 text-swiggy-orange stroke-[3]" />}
        </button>

        {/* Ratings 4.0+ */}
        <button
          onClick={() => setMinRating(minRating === '4.0' ? '' : '4.0')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
            minRating === '4.0'
              ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span>Ratings 4.0+ ★</span>
          {minRating === '4.0' && <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />}
        </button>

        {/* Pure Veg */}
        <button
          onClick={() => setVegOnly(!vegOnly)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
            vegOnly
              ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>Pure Veg</span>
          {vegOnly && <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />}
        </button>

        {/* Price Range Filters */}
        <button
          onClick={() => setPriceRange(priceRange === 'low' ? '' : 'low')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
            priceRange === 'low'
              ? 'bg-swiggy-orangeLight border-swiggy-orange text-swiggy-orangeDark shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span>Less than ₹300</span>
          {priceRange === 'low' && <Check className="w-3 h-3 text-swiggy-orange stroke-[3]" />}
        </button>

        <button
          onClick={() => setPriceRange(priceRange === 'mid' ? '' : 'mid')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
            priceRange === 'mid'
              ? 'bg-swiggy-orangeLight border-swiggy-orange text-swiggy-orangeDark shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span>₹300 - ₹600</span>
          {priceRange === 'mid' && <Check className="w-3 h-3 text-swiggy-orange stroke-[3]" />}
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="shrink-0 px-2.5 py-1.5 rounded-full text-xs font-bold bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition-colors flex items-center gap-1"
            title="Reset all filters"
          >
            <X className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default RestaurantFilterBar;
