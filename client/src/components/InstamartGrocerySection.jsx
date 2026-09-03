import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const GROCERY_CATEGORIES = [
  { id: 'veg', name: 'Fresh Vegetables', time: '10 MINS', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=80' },
  { id: 'dairy', name: 'Dairy, Bread & Eggs', time: '8 MINS', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80' },
  { id: 'fruits', name: 'Fresh Fruits', time: '10 MINS', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&auto=format&fit=crop&q=80' },
  { id: 'munchies', name: 'Snacks & Munchies', time: '12 MINS', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&auto=format&fit=crop&q=80' },
  { id: 'drinks', name: 'Cold Drinks & Juices', time: '10 MINS', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=300&auto=format&fit=crop&q=80' },
  { id: 'instant', name: 'Instant & Frozen Food', time: '9 MINS', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop&q=80' },
  { id: 'sweet', name: 'Chocolates & Sweets', time: '11 MINS', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&auto=format&fit=crop&q=80' }
];

export const InstamartGrocerySection = () => {
  const scrollRef = useRef(null);
  const { addToast } = useToast();

  const handleScroll = (dir) => {
    if (scrollRef.current) {
      const offset = dir === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleGroceryClick = (catName) => {
    addToast(`Swiggy Instamart is delivering ${catName} in 10 mins! ⚡`, 'info');
  };

  return (
    <section id="instamart-section" className="py-8 border-b border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Shop groceries on Instamart
          </h2>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-black text-[#FF5200] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
            <Zap className="w-3 h-3 fill-[#FF5200]" /> 10 MINS DELIVERY
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-2xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex items-center gap-5 overflow-x-auto no-scrollbar pb-3 scroll-smooth"
      >
        {GROCERY_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleGroceryClick(cat.name)}
            className="flex flex-col items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-32 h-36 rounded-2xl bg-white p-2 border border-slate-100 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all flex flex-col items-center justify-between">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-50">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                ⚡ {cat.time}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-800 text-center max-w-[120px] truncate group-hover:text-[#FF5200] transition-colors">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstamartGrocerySection;
