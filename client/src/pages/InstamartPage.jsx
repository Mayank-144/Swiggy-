import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Clock,
  Sparkles,
  Percent,
  Search,
  Filter,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const GROCERY_CATEGORIES = [
  { id: 'all', name: 'All Items' },
  { id: 'veg', name: 'Fresh Vegetables' },
  { id: 'fruits', name: 'Fresh Fruits' },
  { id: 'dairy', name: 'Dairy, Bread & Eggs' },
  { id: 'snacks', name: 'Munchies & Snacks' },
  { id: 'beverages', name: 'Cold Drinks & Juices' },
  { id: 'instant', name: 'Instant & Frozen' },
  { id: 'sweets', name: 'Sweet Tooth & Ice Creams' },
  { id: 'staples', name: 'Atta, Rice & Dal' }
];

const GROCERY_CATALOG = [
  {
    id: 'im-1',
    category: 'veg',
    name: 'Fresh Hybrid Tomato',
    weight: '500 g',
    price: 24,
    mrp: 38,
    discount: '36% OFF',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'im-2',
    category: 'veg',
    name: 'Fresh Red Onion (Pyaz)',
    weight: '1 kg',
    price: 39,
    mrp: 55,
    discount: '29% OFF',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'im-3',
    category: 'fruits',
    name: 'Fresh Shimla Royal Apple',
    weight: '4 pcs (approx 600g)',
    price: 139,
    mrp: 180,
    discount: '22% OFF',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'im-4',
    category: 'fruits',
    name: 'Fresh Robusta Bananas',
    weight: '500 g (3-4 pcs)',
    price: 29,
    mrp: 45,
    discount: '35% OFF',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'im-5',
    category: 'dairy',
    name: 'Amul Taaza Toned Fresh Milk',
    weight: '500 ml pouch',
    price: 27,
    mrp: 28,
    discount: '3% OFF',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'im-6',
    category: 'dairy',
    name: 'Amul Pasteurised Butter',
    weight: '100 g',
    price: 56,
    mrp: 60,
    discount: '6% OFF',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'im-7',
    category: 'dairy',
    name: 'Farm Fresh White Eggs (6 pcs)',
    weight: 'Pack of 6',
    price: 52,
    mrp: 65,
    discount: '20% OFF',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&auto=format&fit=crop&q=80',
    isVeg: false
  },
  {
    id: 'im-8',
    category: 'snacks',
    name: 'Lay\'s India\'s Magic Masala Chips',
    weight: '50 g',
    price: 20,
    mrp: 20,
    discount: 'Hot Selling',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'im-9',
    category: 'snacks',
    name: 'Doritos Cheese Supreme Nachos',
    weight: '75 g',
    price: 50,
    mrp: 50,
    discount: 'Best Combo',
    image: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?w=400&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'im-10',
    category: 'beverages',
    name: 'Coca-Cola Zero Sugar Can',
    weight: '300 ml',
    price: 40,
    mrp: 40,
    discount: 'Chilled',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'im-11',
    category: 'instant',
    name: 'Maggi 2-Minute Masala Noodles (Pack of 4)',
    weight: '280 g',
    price: 56,
    mrp: 60,
    discount: '7% OFF',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'im-12',
    category: 'sweets',
    name: 'Kwality Wall\'s Choco Brownie Fudge Tub',
    weight: '700 ml',
    price: 199,
    mrp: 299,
    discount: '33% OFF',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop&q=80',
    isVeg: true
  }
];

export const InstamartPage = () => {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems, addToCart, updateQuantity, openCartDrawer } = useCart();
  const { addToast } = useToast();

  const filteredItems = GROCERY_CATALOG.filter((item) => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    const matchesQuery = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const getItemQuantityInCart = (itemId) => {
    const found = cartItems.find((i) => i.id === itemId);
    return found ? found.quantity : 0;
  };

  const handleAddItem = (item) => {
    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        isVeg: item.isVeg,
        description: item.weight
      },
      {
        id: 'instamart-store',
        name: 'Swiggy Instamart',
        image: '/images/swiggy_grocery_basket.png'
      }
    );
    addToast(`${item.name} added to cart! ⚡`, 'success');
  };

  return (
    <div className="w-full bg-[#FAFAFC] min-h-screen pb-20 font-sans">
      {/* Top Hero Banner */}
      <div className="w-full bg-gradient-to-r from-[#7B2CBF] via-[#9D4EDD] to-[#C77DFF] text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white">
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Instant Grocery Delivery in 10-15 Mins</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Swiggy Instamart
            </h1>
            <p className="text-xs sm:text-sm text-white/90 max-w-xl">
              Fresh veggies, fruits, dairy, cold drinks, snacks &amp; daily staples delivered at lightning speed right to your doorstep.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center min-w-[110px]">
              <p className="text-xl sm:text-2xl font-black text-white">10 MINS</p>
              <p className="text-[10px] font-bold text-white/80 uppercase">Free Delivery</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center min-w-[110px]">
              <p className="text-xl sm:text-2xl font-black text-white">UPTO 60%</p>
              <p className="text-[10px] font-bold text-white/80 uppercase">Discount</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-6">
        {/* Search & Category Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-xs">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in Instamart (Milk, Chips, Onion, Ice Cream)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#7B2CBF] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Quality &amp; Freshness Guaranteed</span>
          </div>
        </div>

        {/* Category Horizontal Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {GROCERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-[#7B2CBF] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-purple-50 border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              {GROCERY_CATEGORIES.find((c) => c.id === selectedCat)?.name || 'All Items'} ({filteredItems.length})
            </h2>
            <span className="text-xs font-bold text-slate-400">⚡ 10 mins delivery</span>
          </div>

          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {filteredItems.map((item) => {
              const qty = getItemQuantityInCart(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Item Image */}
                    <div className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden bg-slate-50 p-2 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {item.discount && (
                        <span className="absolute top-1.5 left-1.5 bg-[#7B2CBF] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-2xs">
                          {item.discount}
                        </span>
                      )}
                    </div>

                    {/* Item Info */}
                    <div className="mt-2.5 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 truncate">{item.weight}</p>
                      <h3 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2 min-h-[32px]">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Price & Add to Cart Button */}
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-50 gap-1.5">
                    <div>
                      <span className="text-xs sm:text-sm font-black text-slate-900">₹{item.price}</span>
                      {item.mrp > item.price && (
                        <span className="text-[10px] text-slate-400 line-through ml-1">₹{item.mrp}</span>
                      )}
                    </div>

                    {qty === 0 ? (
                      <button
                        onClick={() => handleAddItem(item)}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-black rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95"
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-emerald-600 text-white rounded-xl px-2 py-1 shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, qty - 1)}
                          className="hover:opacity-80 p-0.5 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black min-w-[14px] text-center">{qty}</span>
                        <button
                          onClick={() => updateQuantity(item.id, qty + 1)}
                          className="hover:opacity-80 p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstamartPage;
