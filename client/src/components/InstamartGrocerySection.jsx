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
      const offset = dir === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleItemClick = (name) => {
    addToast(`Swiggy Instamart is delivering ${name} in 10 mins! ⚡`, 'info');
  };

  return (
    <div
      id="instamart-section"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: '1px solid #F0F0F0'
      }}
      className="w-full my-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2
          style={{ fontSize: '18px', fontWeight: 800, color: '#1C1C1C' }}
          className="tracking-tight text-left"
        >
          Shop groceries on Instamart
        </h2>

        {/* Right: < > circle outline buttons (gray border, 32px) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            style={{ width: '32px', height: '32px', borderColor: '#E0E0E0' }}
            className="rounded-full border bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors shadow-2xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            style={{ width: '32px', height: '32px', borderColor: '#E0E0E0' }}
            className="rounded-full border bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors shadow-2xs cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 pb-1 scroll-smooth"
      >
        {GROCERY_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.name)}
            style={{ width: '130px' }}
            className="flex flex-col items-center cursor-pointer group shrink-0 text-center"
          >
            {/* Square image: 120x120px, rounded-xl, object-cover */}
            <div className="w-[120px] h-[120px] rounded-xl overflow-hidden bg-slate-50 group-hover:scale-105 transition-transform duration-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-xl"
                loading="lazy"
              />
            </div>

            {/* Green badge: background: #E8F5E9, color: #2E7D32, font-size: 11px, "⚡ 10 MINS" — padding 2px 8px, border-radius 20px */}
            <div className="mt-2">
              <span
                style={{
                  backgroundColor: '#E8F5E9',
                  color: '#2E7D32',
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '20px'
                }}
                className="font-bold inline-block"
              >
                ⚡ {item.time}
              </span>
            </div>

            {/* Item name: font-size 12px, font-weight 500, color #1C1C1C, text-align center, margin-top 8px */}
            <span
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: '#1C1C1C',
                marginTop: '8px'
              }}
              className="text-center w-full leading-tight truncate px-1"
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstamartGrocerySection;
