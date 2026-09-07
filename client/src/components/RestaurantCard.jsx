import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RestaurantCard = ({ restaurant, className = '' }) => {
  const { user, toggleFavorite } = useAuth();
  const isFavorite = user?.favorites?.includes(restaurant.id || restaurant._id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(restaurant.id || restaurant._id);
  };

  const discountText = restaurant.discount || '60% OFF UPTO ₹120';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #F0F0F0',
        backgroundColor: '#FFFFFF'
      }}
      className={`w-full overflow-hidden flex flex-col group transition-all duration-300 ${className}`}
    >
      <Link to={`/restaurant/${restaurant.id || restaurant._id}`} className="flex flex-col h-full w-full">
        {/* Image top: responsive height, border-radius 16px 16px 0 0, object-cover */}
        <div
          className="relative w-full h-40 xs:h-44 sm:h-48 overflow-hidden bg-slate-100 shrink-0 rounded-t-2xl"
        >
          <img
            src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80'}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80';
            }}
          />

          {/* Dark gradient bottom on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Top badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
            {/* Top-left badge: "AD" */}
            {restaurant.isPromoted ? (
              <span
                style={{
                  backgroundColor: '#00000080',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  padding: '2px 8px'
                }}
                className="font-bold rounded-full backdrop-blur-xs"
              >
                AD
              </span>
            ) : (
              <span />
            )}

            {/* Top-right: ♡ heart icon */}
            <button
              onClick={handleFavoriteClick}
              aria-label="Save to favorites"
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xs text-white transition-all cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white hover:text-rose-300'
                }`}
              />
            </button>
          </div>

          {/* Bottom image overlay: "★ 60% OFF UPTO ₹120" */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center gap-1 text-white font-bold drop-shadow-md z-10">
            <span style={{ color: '#FFD700', fontSize: '13px' }}>★</span>
            <span
              style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 700 }}
              className="truncate uppercase tracking-tight text-[11px] xs:text-xs"
            >
              {discountText}
            </span>
          </div>
        </div>

        {/* Below image — card body padding */}
        <div className="p-3 sm:p-3.5 space-y-1.5 flex flex-col justify-between flex-1">
          {/* Restaurant name */}
          <h3
            style={{ fontWeight: 700, color: '#1C1C1C' }}
            className="text-sm sm:text-base tracking-tight group-hover:text-[#FC8019] transition-colors truncate"
          >
            {restaurant.name}
          </h3>

          {/* Row: green pill "★ 4.4" + gray text "🕐 30-35 mins • ₹500 for two" */}
          <div className="flex items-center gap-2 flex-wrap">
            <div
              style={{
                backgroundColor: '#E8F5E9',
                color: '#2E7D32',
                fontSize: '11px',
                padding: '2px 7px',
                borderRadius: '20px'
              }}
              className="font-black flex items-center gap-0.5 shrink-0"
            >
              <span>★</span>
              <span>{restaurant.rating || '4.4'}</span>
            </div>

            <span
              style={{ fontSize: '11.5px', color: '#686B78' }}
              className="flex items-center gap-1 truncate font-medium"
            >
              <span>🕐 {restaurant.deliveryTime || '30-35 mins'}</span>
              <span>•</span>
              <span className="truncate">{restaurant.costForTwoMessage || '₹500 for two'}</span>
            </span>
          </div>

          {/* Cuisine tags */}
          <p
            style={{
              fontSize: '12px',
              color: '#686B78'
            }}
            className="font-normal truncate pt-0.5"
          >
            {restaurant.cuisines?.join(', ') || restaurant.cuisine || 'North Indian, Fast Food'}
          </p>

          {/* Location Area */}
          <p
            style={{
              fontSize: '11.5px',
              color: '#93959F'
            }}
            className="truncate font-normal"
          >
            {restaurant.location?.area || restaurant.location?.address || 'Bengaluru'}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;
