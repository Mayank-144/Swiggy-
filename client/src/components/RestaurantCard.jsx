import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RestaurantCard = ({ restaurant }) => {
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
        width: '260px',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #F0F0F0',
        backgroundColor: '#FFFFFF'
      }}
      className="overflow-hidden flex flex-col shrink-0 group transition-all duration-300"
    >
      <Link to={`/restaurant/${restaurant.id || restaurant._id}`} className="flex flex-col h-full w-full">
        {/* Image top: height 180px, border-radius 16px 16px 0 0, object-cover */}
        <div
          style={{ height: '180px', borderRadius: '16px 16px 0 0' }}
          className="relative w-full overflow-hidden bg-slate-100 shrink-0"
        >
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Dark gradient bottom on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Top badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
            {/* Top-left badge: "AD" — dark semi-transparent bg (#00000080), white text, font-size 11px, padding 2px 8px, rounded-full */}
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

            {/* Top-right: ♡ heart icon — white, 20px */}
            <button
              onClick={handleFavoriteClick}
              aria-label="Save to favorites"
              className="p-1 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-xs text-white transition-all cursor-pointer"
            >
              <Heart
                style={{ width: '20px', height: '20px' }}
                className={`transition-colors ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white hover:text-rose-300'
                }`}
              />
            </button>
          </div>

          {/* Bottom image overlay (gradient dark bottom): "⭐ 60% OFF UPTO ₹120" (star: yellow #FFD700, text: white, font-size 12px, font-weight 700) */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center gap-1 text-white font-bold drop-shadow-md z-10">
            <span style={{ color: '#FFD700', fontSize: '13px' }}>★</span>
            <span
              style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 700 }}
              className="truncate uppercase tracking-tight"
            >
              {discountText}
            </span>
          </div>
        </div>

        {/* Below image — card body padding 12px */}
        <div style={{ padding: '12px' }} className="space-y-1.5 flex flex-col justify-between flex-1">
          {/* Restaurant name: font-size 16px, font-weight 700, color #1C1C1C */}
          <h3
            style={{ fontSize: '16px', fontWeight: 700, color: '#1C1C1C' }}
            className="tracking-tight group-hover:text-[#FC8019] transition-colors truncate"
          >
            {restaurant.name}
          </h3>

          {/* Row: green pill "★ 4.4" (bg:#E8F5E9, color:#2E7D32, font-size:12px, padding:2px 8px, border-radius:20px) + gray text "🕐 30-35 mins • ₹500 for two" font-size:12px */}
          <div className="flex items-center gap-2 flex-wrap">
            <div
              style={{
                backgroundColor: '#E8F5E9',
                color: '#2E7D32',
                fontSize: '12px',
                padding: '2px 8px',
                borderRadius: '20px'
              }}
              className="font-black flex items-center gap-0.5 shrink-0"
            >
              <span>★</span>
              <span>{restaurant.rating || '4.4'}</span>
            </div>

            <span
              style={{ fontSize: '12px', color: '#686B78' }}
              className="flex items-center gap-1 truncate font-medium"
            >
              <span>🕐 {restaurant.deliveryTime || '30-35 mins'}</span>
              <span>•</span>
              <span className="truncate">{restaurant.costForTwoMessage || '₹500 for two'}</span>
            </span>
          </div>

          {/* Cuisine tags: font-size 12px, color #686B78, "Biryani, Hyderabadi, North Indian, Mu..." white-space:nowrap, overflow:hidden, text-overflow:ellipsis */}
          <p
            style={{
              fontSize: '12px',
              color: '#686B78',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            className="font-normal pt-0.5"
          >
            {restaurant.cuisines?.join(', ') || 'North Indian, Biryani, Fast Food'}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;
