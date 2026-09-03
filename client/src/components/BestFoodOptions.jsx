import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ROW_1_ITEMS = [
  { id: 'North Indian', name: 'North Indian', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300&auto=format&fit=crop&q=80' },
  { id: 'Pizza', name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=80' },
  { id: 'South Indian', name: 'South Indian', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=300&auto=format&fit=crop&q=80' },
  { id: 'Desserts', name: 'Desserts', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300&auto=format&fit=crop&q=80' },
  { id: 'Biryani', name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80' },
  { id: 'Burgers', name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80' },
  { id: 'Cake', name: 'Cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=80' }
];

const ROW_2_ITEMS = [
  { id: 'Paratha', name: 'Paratha', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=300&auto=format&fit=crop&q=80' },
  { id: 'Chinese', name: 'Noodles', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&auto=format&fit=crop&q=80' },
  { id: 'Desserts', name: 'Ice Cream', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&auto=format&fit=crop&q=80' },
  { id: 'North Indian', name: 'Chole Bhature', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&auto=format&fit=crop&q=80' },
  { id: 'Desserts', name: 'Gulab Jamun', image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=300&auto=format&fit=crop&q=80' },
  { id: 'Rolls', name: 'Rolls', image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=300&auto=format&fit=crop&q=80' },
  { id: 'Desserts', name: 'Rasgulla', image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=300&auto=format&fit=crop&q=80' }
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
    <section id="food-options-section" className="py-8 border-b border-orange-100">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Order our best food options
        </h2>

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

      {/* 2-Row Horizontal Scroll Grid with Circular Plates */}
      <div
        ref={scrollRef}
        className="overflow-x-auto no-scrollbar space-y-6 pb-2 scroll-smooth"
      >
        {/* Row 1 */}
        <div className="flex items-center gap-7 sm:gap-9 min-w-max">
          {ROW_1_ITEMS.map((item, idx) => {
            const isSelected = selectedCategory === item.id;
            return (
              <button
                key={`${item.name}-${idx}`}
                onClick={() => onSelectCategory(item.id)}
                className="flex flex-col items-center gap-2.5 group focus:outline-none shrink-0"
              >
                <div
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-white overflow-hidden shadow-sm transition-all duration-300 border border-slate-100 ${
                    isSelected
                      ? 'ring-4 ring-[#FF5200] scale-105 shadow-md'
                      : 'group-hover:scale-105 group-hover:shadow-md'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                <span
                  className={`text-xs sm:text-sm font-bold tracking-tight transition-colors ${
                    isSelected ? 'text-[#FF5200] font-black' : 'text-slate-800 group-hover:text-[#FF5200]'
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Row 2 */}
        <div className="flex items-center gap-7 sm:gap-9 min-w-max">
          {ROW_2_ITEMS.map((item, idx) => {
            const isSelected = selectedCategory === item.id;
            return (
              <button
                key={`${item.name}-${idx}`}
                onClick={() => onSelectCategory(item.id)}
                className="flex flex-col items-center gap-2.5 group focus:outline-none shrink-0"
              >
                <div
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-white overflow-hidden shadow-sm transition-all duration-300 border border-slate-100 ${
                    isSelected
                      ? 'ring-4 ring-[#FF5200] scale-105 shadow-md'
                      : 'group-hover:scale-105 group-hover:shadow-md'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                <span
                  className={`text-xs sm:text-sm font-bold tracking-tight transition-colors ${
                    isSelected ? 'text-[#FF5200] font-black' : 'text-slate-800 group-hover:text-[#FF5200]'
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestFoodOptions;
