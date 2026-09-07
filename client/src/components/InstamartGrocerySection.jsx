import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const GROCERY_ITEMS = [
  { id: 'veg', name: 'Fresh Vegetables', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=80' },
  { id: 'fruits', name: 'Fresh Fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&auto=format&fit=crop&q=80' },
  { id: 'dairy', name: 'Dairy, Bread and Eggs', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80' },
  { id: 'rice', name: 'Rice, Atta and Dal', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80' },
  { id: 'masala', name: 'Masalas and Dry Fruits', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&auto=format&fit=crop&q=80' },
  { id: 'oils', name: 'Oils and Ghee', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=80' },
  { id: 'snacks', name: 'Munchies & Snacks', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&auto=format&fit=crop&q=80' }
];

export const InstamartGrocerySection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const { addToast } = useToast();

  const handleScroll = (dir) => {
    if (scrollRef.current) {
      const offset = dir === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleItemClick = (name) => {
    navigate('/instamart');
  };

  return (
    <div id="instamart-section" className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-5">
        <div onClick={() => navigate('/instamart')} className="cursor-pointer group flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1C1C1C] tracking-tight group-hover:text-purple-700 transition-colors">
            Shop groceries on Instamart
          </h2>
          <ArrowRight className="w-5 h-5 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
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
            className="w-28 xs:w-32 sm:w-36 md:w-40 flex flex-col items-center cursor-pointer group shrink-0 text-center select-none"
          >
            {/* Square/Rounded Container with soft neutral background */}
            <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-[#F2F4F7] p-2 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-2xs border border-slate-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-xl"
                loading="lazy"
              />
            </div>

            {/* Item name below */}
            <span className="text-xs sm:text-sm font-semibold text-slate-800 mt-2 text-center w-full leading-tight line-clamp-2 px-1 group-hover:text-[#FF5200] transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstamartGrocerySection;
