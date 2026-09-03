import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin, Tag, Utensils } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const DINEOUT_RESTAURANTS = [
  {
    id: 'do-1',
    name: 'Toit Brewpub',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop&q=80',
    cuisine: 'Microbrewery, Italian, American',
    area: 'Indiranagar, Bengaluru',
    rating: 4.8,
    cost: '₹1,500 for two',
    offer: 'FLAT 25% OFF with Swiggy Dineout',
    tag: 'Table Booking Available'
  },
  {
    id: 'do-2',
    name: 'Windmills Craftworks',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    cuisine: 'North Indian, Continental, Craft Beer',
    area: 'Whitefield, Bengaluru',
    rating: 4.7,
    cost: '₹2,000 for two',
    offer: 'UPTO 30% OFF on Dining Bill',
    tag: 'Rooftop & Live Jazz'
  },
  {
    id: 'do-3',
    name: 'The Fatty Bao - Asian Gastro Bar',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
    cuisine: 'Asian, Sushi, Cocktails',
    area: '100ft Rd, Indiranagar',
    rating: 4.6,
    cost: '₹1,800 for two',
    offer: 'FLAT 40% OFF with Swiggy One',
    tag: 'Fine Dining'
  },
  {
    id: 'do-4',
    name: 'Olive Beach',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    cuisine: 'Mediterranean, European, Wine Bar',
    area: 'Ashok Nagar, Bengaluru',
    rating: 4.9,
    cost: '₹2,400 for two',
    offer: 'FLAT 20% OFF + 10% Extra Cashback',
    tag: 'Romantic Courtyard'
  }
];

export const DineoutSection = () => {
  const scrollRef = useRef(null);
  const { addToast } = useToast();

  const handleScroll = (dir) => {
    if (scrollRef.current) {
      const offset = dir === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleBookTable = (restName) => {
    addToast(`Table booking opened for ${restName}! Up to 40% Off applied ✨`, 'success');
  };

  return (
    <section id="dineout-section" className="py-8 border-b border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Discover best restaurants on Dineout
            </h2>
            <span className="hidden sm:inline-flex text-[10px] font-black uppercase text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
              UPTO 50% OFF
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Book tables, pay bills & save big at top cafes and luxury restaurants
          </p>
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
        className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-3 scroll-smooth"
      >
        {DINEOUT_RESTAURANTS.map((rest) => (
          <div
            key={rest.id}
            className="w-72 sm:w-80 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between shrink-0 group"
          >
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[10px] font-extrabold text-white px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Utensils className="w-3 h-3 text-[#FF5200]" />
                  <span>{rest.tag}</span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1 text-white font-black text-xs drop-shadow-md">
                  <Tag className="w-3.5 h-3.5 text-amber-300" />
                  <span className="truncate uppercase">{rest.offer}</span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-800 truncate group-hover:text-[#FF5200] transition-colors">
                    {rest.name}
                  </h3>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-600 text-white rounded text-xs font-black shrink-0">
                    <Star className="w-3 h-3 fill-white" />
                    <span>{rest.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 truncate font-medium">{rest.cuisine}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3" /> {rest.area}
                  </span>
                  <span className="shrink-0 font-bold text-slate-600">{rest.cost}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => handleBookTable(rest.name)}
                className="w-full py-2.5 bg-slate-900 hover:bg-[#FF5200] text-white font-extrabold text-xs rounded-xl shadow-sm transition-colors uppercase tracking-wider"
              >
                Book Table & Get Offer
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DineoutSection;
