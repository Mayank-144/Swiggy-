import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CUISINE_ITEMS = [
  { id: 'North Indian', name: 'North Indian', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300&auto=format&fit=crop&q=80' },
  { id: 'Desserts', name: 'Desserts', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300&auto=format&fit=crop&q=80' },
  { id: 'Pizza', name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=80' },
  { id: 'Biryani', name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80' },
  { id: 'Burgers', name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80' },
  { id: 'South Indian', name: 'South Indian', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=300&auto=format&fit=crop&q=80' },
  { id: 'Chinese', name: 'Chinese', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&auto=format&fit=crop&q=80' },
  { id: 'Beverages', name: 'Coffee', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80' },
  { id: 'Chinese', name: 'Noodles', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop&q=80' },
  { id: 'South Indian', name: 'Dosa', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&auto=format&fit=crop&q=80' },
  { id: 'Rolls', name: 'Rolls', image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=300&auto=format&fit=crop&q=80' },
  { id: 'Paratha', name: 'Paratha', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=300&auto=format&fit=crop&q=80' }
];

export const BestFoodOptions = ({ selectedCategory, onSelectCategory }) => {
  const scrollRef = useRef(null);

  const handleScroll = (dir) => {
    if (scrollRef.current) {
      const offset = dir === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="food-options-section" className="py-2 bg-white">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight text-left">
          Order our best food options
        </h2>

        {/* Right side: two circle arrow buttons < > for navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            className="w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors shadow-2xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            className="w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors shadow-2xs cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MOBILE: horizontal scroll row (NOT grid), flex, overflow-x-auto, scrollbar-hide, min-width 80px */}
      {/* DESKTOP: grid, 6 columns, no scroll */}
      <div
        ref={scrollRef}
        className="flex md:grid md:grid-cols-6 overflow-x-auto md:overflow-visible scrollbar-hide gap-4 md:gap-6 pt-1 scroll-smooth"
      >
        {CUISINE_ITEMS.map((item, idx) => {
          const isSelected = selectedCategory === item.id;
          return (
            <button
              key={`${item.name}-${idx}`}
              onClick={() => onSelectCategory(item.id)}
              className="flex flex-col items-center gap-2 group focus:outline-none cursor-pointer shrink-0 md:shrink min-w-[80px] md:min-w-0"
            >
              {/* Circle image: 80px diameter on mobile, 100px on desktop. NO borders, NO card bg */}
              <div
                className={`w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden transition-transform duration-200 ${
                  isSelected ? 'ring-3 ring-[#FC8019] scale-105' : 'group-hover:scale-105'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>

              {/* Label: font-size 12px mobile, 13px desktop, color: #3D3D3D */}
              <span
                style={{
                  color: isSelected ? '#FC8019' : '#3D3D3D'
                }}
                className="text-center truncate max-w-full text-[12px] md:text-[13px] font-medium leading-tight"
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default BestFoodOptions;
