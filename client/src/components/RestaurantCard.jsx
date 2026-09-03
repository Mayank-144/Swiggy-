import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Clock, MapPin, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RestaurantCard = ({ restaurant }) => {
  const { user, toggleFavorite } = useAuth();
  const isFavorite = user?.favorites?.includes(restaurant.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(restaurant.id);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <Link to={`/restaurant/${restaurant.id}`} className="flex flex-col h-full">
        {/* Image Container with Offer Overlay */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Dark Gradient at bottom of image for badge legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {restaurant.isPromoted ? (
              <span className="bg-slate-900/80 backdrop-blur-md text-[10px] uppercase tracking-wider font-extrabold text-amber-300 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                <Sparkles className="w-2.5 h-2.5" /> Ad
              </span>
            ) : restaurant.isVeg ? (
              <span className="bg-emerald-700/90 backdrop-blur-md text-[10px] font-bold text-white px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" /> Pure Veg
              </span>
            ) : (
              <span />
            )}

            {/* Favorite heart button */}
            <button
              onClick={handleFavoriteClick}
              aria-label="Save to favorites"
              className="pointer-events-auto p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white transition-all transform active:scale-90"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white hover:text-rose-300'
                }`}
              />
            </button>
          </div>

          {/* Bottom Offer Ribbon on Image */}
          {restaurant.discount && (
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1.5 text-white font-extrabold text-sm tracking-tight drop-shadow-md">
              <span className="text-amber-300">★</span>
              <span className="truncate uppercase">{restaurant.discount}</span>
            </div>
          )}
        </div>

        {/* Restaurant Details */}
        <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-base text-slate-800 tracking-tight group-hover:text-swiggy-orange transition-colors truncate">
              {restaurant.name}
            </h3>

            {/* Rating, Delivery time, Cost */}
            <div className="flex items-center gap-2 mt-1 text-xs font-bold text-slate-700">
              <div
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-white text-[11px] font-extrabold ${
                  restaurant.rating >= 4.0 ? 'bg-emerald-600' : 'bg-amber-600'
                }`}
              >
                <Star className="w-3 h-3 fill-white" />
                <span>{restaurant.rating}</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 text-slate-600 font-semibold">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-medium">{restaurant.costForTwoMessage}</span>
            </div>
          </div>

          <div>
            {/* Cuisines */}
            <p className="text-xs text-slate-500 truncate font-medium">
              {restaurant.cuisines.join(', ')}
            </p>

            {/* Location */}
            <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400 font-medium">
              <MapPin className="w-3 h-3 text-slate-300 shrink-0" />
              <span className="truncate">{restaurant.location?.area || 'Bengaluru'}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;
