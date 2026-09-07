import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Clock, UtensilsCrossed, ArrowUpRight, Flame, Sparkles } from 'lucide-react';

export const SearchSuggestionsDropdown = ({
  suggestions,
  loading,
  query,
  onSelectSuggestion,
  onClose
}) => {
  const navigate = useNavigate();

  const dishes = suggestions?.dishes || [];
  const restaurants = suggestions?.restaurants || [];
  const cuisines = suggestions?.cuisines || [];

  const hasAnyMatches = dishes.length > 0 || restaurants.length > 0 || cuisines.length > 0;

  const handleDishClick = (dish) => {
    if (onClose) onClose();
    if (onSelectSuggestion) onSelectSuggestion(dish.name);
    navigate(`/restaurant/${dish.restaurantId}`);
  };

  const handleRestaurantClick = (rest) => {
    if (onClose) onClose();
    if (onSelectSuggestion) onSelectSuggestion(rest.name);
    navigate(`/restaurant/${rest.id}`);
  };

  const handleCuisineClick = (cuisineName) => {
    if (onClose) onClose();
    if (onSelectSuggestion) onSelectSuggestion(cuisineName);
    navigate(`/food?search=${encodeURIComponent(cuisineName)}`);
  };

  const handleSearchAllClick = () => {
    if (onClose) onClose();
    if (onSelectSuggestion) onSelectSuggestion(query);
    navigate(`/food?search=${encodeURIComponent(query)}`);
  };

  // Helper to highlight matching text
  const highlightMatch = (text, match) => {
    if (!match || !text) return text;
    const parts = text.split(new RegExp(`(${match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === match.toLowerCase() ? (
        <span key={i} className="text-[#FF5200] font-black underline decoration-orange-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden text-slate-800 divide-y divide-slate-100 max-h-[440px] sm:max-h-[480px] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
      {/* Search Header Action */}
      {query && (
        <div
          onClick={handleSearchAllClick}
          className="p-3 sm:p-3.5 bg-orange-50/80 hover:bg-orange-100/90 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-xl bg-[#FF5200] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Search className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-[13px] font-extrabold text-slate-800 group-hover:text-[#FF5200] transition-colors truncate">
              Search all for "<span className="text-[#FF5200]">{query}</span>"
            </span>
          </div>
          <span className="text-[11px] font-black text-[#FF5200] flex items-center gap-0.5 shrink-0 bg-white px-2 py-0.5 rounded-full shadow-2xs">
            See all <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      )}

      {loading && !hasAnyMatches && (
        <div className="p-6 text-center text-xs font-semibold text-slate-400 flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-[#FF5200] border-t-transparent rounded-full animate-spin" />
          <span>Searching best dishes &amp; restaurants...</span>
        </div>
      )}

      {!loading && !hasAnyMatches && query && (
        <div className="p-8 text-center space-y-2">
          <UtensilsCrossed className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-xs font-bold text-slate-700">No matching dishes or restaurants found for "{query}"</p>
          <p className="text-[11px] text-slate-400">Try searching for pizza, biryani, burgers, cakes or pasta</p>
        </div>
      )}

      {/* 1. Food Dish Matches with Image Thumbnails */}
      {dishes.length > 0 && (
        <div className="p-2 sm:p-3">
          <div className="px-2 py-1 flex items-center gap-1.5 text-[10.5px] font-black uppercase text-slate-400 tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#FF5200]" />
            <span>Dishes ({dishes.length})</span>
          </div>
          <div className="grid grid-cols-1 divide-y divide-slate-50">
            {dishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => handleDishClick(dish)}
                className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl hover:bg-orange-50/50 transition-colors cursor-pointer group gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Dish Thumbnail */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-2xs relative group-hover:scale-105 transition-transform">
                    {dish.image ? (
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-orange-50 text-[#FF5200]">
                        <UtensilsCrossed className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Dish Details */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          dish.isVeg ? 'bg-emerald-500 ring-2 ring-emerald-100' : 'bg-rose-500 ring-2 ring-rose-100'
                        }`}
                      />
                      <h4 className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-[#FF5200] transition-colors truncate">
                        {highlightMatch(dish.name, query)}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                      in <span className="text-slate-600 font-bold">{dish.restaurantName || 'Restaurant'}</span>
                    </p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                    ₹{dish.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Restaurant Matches */}
      {restaurants.length > 0 && (
        <div className="p-2 sm:p-3 bg-slate-50/60">
          <div className="px-2 py-1 flex items-center gap-1.5 text-[10.5px] font-black uppercase text-slate-400 tracking-wider">
            <UtensilsCrossed className="w-3.5 h-3.5 text-slate-400" />
            <span>Restaurants ({restaurants.length})</span>
          </div>
          <div className="grid grid-cols-1 divide-y divide-slate-100/60">
            {restaurants.map((rest) => (
              <div
                key={rest.id}
                onClick={() => handleRestaurantClick(rest)}
                className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl hover:bg-white transition-all cursor-pointer group gap-3 shadow-2xs hover:shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={rest.image}
                    alt={rest.name}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover shrink-0 border border-slate-200/80 group-hover:scale-105 transition-transform"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-[13px] font-extrabold text-slate-900 group-hover:text-[#FF5200] transition-colors truncate">
                      {highlightMatch(rest.name, query)}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {Array.isArray(rest.cuisines) ? rest.cuisines.join(', ') : rest.cuisines}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-600 text-white rounded-md text-[10px] sm:text-xs font-bold shadow-2xs">
                    <Star className="w-2.5 h-2.5 fill-white" />
                    <span>{rest.rating}</span>
                  </div>
                  <div className="hidden xs:flex items-center gap-1 text-[11px] font-bold text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{rest.deliveryTimeMinutes || 25}m</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Cuisines / Category Chips */}
      {cuisines.length > 0 && (
        <div className="p-3 bg-white flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Cuisines:
          </span>
          {cuisines.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => handleCuisineClick(c)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-[#FF5200] hover:border-[#FF5200] border border-transparent text-slate-700 font-bold text-[11px] transition-all cursor-pointer"
            >
              {highlightMatch(c, query)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSuggestionsDropdown;

