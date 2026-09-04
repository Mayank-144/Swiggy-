import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const GROCERY_ITEMS = [
  { id: 'veg', name: 'Fresh Vegetables', time: '10 MINS', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=80' },
  { id: 'fruits', name: 'Fresh Fruits', time: '10 MINS', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&auto=format&fit=crop&q=80' },
  { id: 'dairy', name: 'Dairy Bread and Eggs', time: '10 MINS', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80' },
  { id: 'rice', name: 'Rice Atta and Dal', time: '10 MINS', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80' },
  { id: 'masala', name: 'Masalas and Dry Fruits', time: '10 MINS', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&auto=format&fit=crop&q=80' },
  { id: 'oils', name: 'Oils', time: '10 MINS', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=80' }
];

export const InstamartGrocerySection = () => {
  const scrollRef = useRef(null);
  const { addToast } = useToast();

  const handleScroll = (dir) => {
    if (scrollRef.current) {
      const offset = dir === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleItemClick = (name) => {
    addToast(`Swiggy Instamart is delivering ${name} in 10 mins! ⚡`, 'info');
  };

  return (
    <div id="instamart-section" className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Shop groceries on Instamart
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              ⚡ 10 MINS
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Fresh produce, dairy, daily essentials & more delivered to your doorstep
          </p>
        </div>

        {/* Right: Circle Navigation Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors shadow-2xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors shadow-2xs cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Product Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar gap-3.5 sm:gap-5 pb-2 scroll-smooth"
      >
        {GROCERY_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.name)}
            className="w-28 xs:w-32 sm:w-36 flex flex-col items-center cursor-pointer group shrink-0 text-center"
          >
            {/* Square image container */}
            <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform duration-300 shadow-2xs">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Delivery time badge */}
            <div className="mt-2">
              <span className="bg-emerald-50 text-emerald-800 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200/50 inline-block shadow-2xs">
                ⚡ {item.time}
              </span>
            </div>

            {/* Item name */}
            <span className="text-xs sm:text-sm font-semibold text-slate-800 mt-1.5 text-center w-full leading-tight truncate px-1 group-hover:text-swiggy-orange transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstamartGrocerySection;
