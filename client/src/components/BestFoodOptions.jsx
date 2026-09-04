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
    <div id="food-options-section" className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight text-left">
            Order our best food options
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Satisfy your cravings with top cuisines and popular meals
          </p>
        </div>

        {/* Right side: circle arrow buttons < > for navigation */}
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

      {/* Horizontal Swipeable Carousel */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-6 pt-1 pb-2 scroll-smooth"
      >
        {CUISINE_ITEMS.map((item, idx) => {
          const isSelected = selectedCategory === item.id;
          return (
            <button
              key={`${item.name}-${idx}`}
              onClick={() => onSelectCategory(item.id)}
              className="flex flex-col items-center gap-2 group focus:outline-none cursor-pointer shrink-0 min-w-[76px] sm:min-w-[96px]"
            >
              {/* Circle image container */}
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden transition-all duration-300 shadow-2xs ${
                  isSelected ? 'ring-3 ring-[#FF5200] scale-105 shadow-md' : 'group-hover:scale-105'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>

              {/* Label */}
              <span
                className={`text-center truncate max-w-full text-xs sm:text-sm font-semibold transition-colors ${
                  isSelected ? 'text-[#FF5200]' : 'text-slate-700 group-hover:text-[#FF5200]'
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BestFoodOptions;
