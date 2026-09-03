import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Minus, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MenuItemCard = ({ item, restaurant }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  const cartItem = cartItems.find((i) => i.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addToCart(item, restaurant);
  };

  return (
    <div className="flex items-start justify-between py-6 border-b border-slate-100 last:border-b-0 gap-4 group">
      {/* Dish Details */}
      <div className="flex-1 pr-2">
        {/* Badges: Veg/Non-veg & Bestseller */}
        <div className="flex items-center gap-2 mb-1.5">
          {item.isVeg ? (
            <span className="veg-icon" title="Pure Vegetarian">
              <span className="veg-dot" />
            </span>
          ) : (
            <span className="non-veg-icon" title="Non-Vegetarian">
              <span className="non-veg-dot" />
            </span>
          )}

          {item.isBestseller && (
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-600 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded">
              <Sparkles className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
              <span>Bestseller</span>
            </span>
          )}
        </div>

        {/* Name */}
        <h4 className="font-bold text-base text-slate-800 tracking-tight group-hover:text-swiggy-orange transition-colors">
          {item.name}
        </h4>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="font-extrabold text-sm text-slate-800">₹{item.price}</span>
          {item.originalPrice && item.originalPrice > item.price && (
            <span className="text-xs text-slate-400 line-through font-medium">₹{item.originalPrice}</span>
          )}
        </div>

        {/* Rating */}
        {item.rating && (
          <div className="flex items-center gap-1.5 mt-1.5 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-0.5 text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded text-[11px]">
              <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
              <span>{item.rating}</span>
            </div>
            {item.ratingCount && (
              <span className="text-[11px] text-slate-400 font-medium">({item.ratingCount})</span>
            )}
          </div>
        )}

        {/* Description */}
        {item.description && (
          <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-lg">
            {isExpanded ? item.description : `${item.description.slice(0, 110)}${item.description.length > 110 ? '...' : ''}`}
            {item.description.length > 110 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-1 text-slate-700 font-bold hover:text-swiggy-orange text-xs underline"
              >
                {isExpanded ? 'Less' : 'More'}
              </button>
            )}
          </p>
        )}
      </div>

      {/* Image & ADD Button */}
      <div className="relative flex flex-col items-center shrink-0 w-32">
        <div className="w-32 h-28 rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
          <img
            src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80'}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Action Button */}
        <div className="absolute -bottom-3 inset-x-3 flex justify-center">
          {quantity === 0 ? (
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleAdd}
              className="w-full bg-white hover:bg-slate-50 text-emerald-600 border border-slate-200 hover:border-emerald-500 shadow-md font-extrabold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1 transition-all duration-200 uppercase tracking-wider"
            >
              <span>Add</span>
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </motion.button>
          ) : (
            <div className="w-full bg-emerald-600 text-white shadow-md font-extrabold text-xs py-1.5 px-2 rounded-xl flex items-center justify-between transition-all duration-200">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="p-1 hover:bg-emerald-700 rounded-lg transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
              <span className="font-black text-sm">{quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="p-1 hover:bg-emerald-700 rounded-lg transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          )}
        </div>

        {item.isCustomisable && (
          <span className="text-[10px] text-slate-400 font-semibold mt-4">Customisable</span>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
