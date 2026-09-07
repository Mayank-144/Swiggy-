import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Percent } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const DINEOUT_RESTAURANTS = [
  {
    id: 'do-1',
    name: 'Shree Vrindavan by Hotel Sak...',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
    cuisine: 'North Indian • Chinese',
    location: 'Shivananda Circle, Seshadripuram',
    distance: '4.1 km',
    costForTwo: '₹400 for two',
    rating: '4.0',
    primaryOffer: 'Flat 25% off on pre-booking',
    extraOffersCount: '+1 more',
    bankOffer: 'Up to 10% off with bank offers',
    walletOffer: 'Get extra ₹100 off using AXIS BANK'
  },
  {
    id: 'do-2',
    name: 'GFC - Gourmet Food Club',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    cuisine: 'Chinese • North Indian',
    location: 'The Green Building, BTM Ring Road',
    distance: '4.4 km',
    costForTwo: '₹700 for two',
    rating: '3.6',
    primaryOffer: 'Flat 20% off on walk-in',
    extraOffersCount: '+1 more',
    bankOffer: 'Up to 10% off with bank offers',
    walletOffer: 'Get extra ₹100 off using HDFC BANK'
  },
  {
    id: 'do-3',
    name: 'Nayak Pizza & Cafe',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    cuisine: 'Pizza • Italian • Fast Food',
    location: 'Seshadripuram, Kumara Park West',
    distance: '3.2 km',
    costForTwo: '₹450 for two',
    rating: '4.2',
    primaryOffer: 'Flat 25% off on walk-in',
    extraOffersCount: '+1 more',
    bankOffer: 'Up to 10% off with bank offers',
    walletOffer: 'Get extra ₹100 off using ICICI BANK'
  },
  {
    id: 'do-4',
    name: 'Toit Brewpub & Kitchen',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop&q=80',
    cuisine: 'Microbrewery • Continental • Italian',
    location: 'Indiranagar 100ft Road',
    distance: '5.6 km',
    costForTwo: '₹1,500 for two',
    rating: '4.8',
    primaryOffer: 'Flat 20% off with Swiggy Dineout',
    extraOffersCount: '+2 more',
    bankOffer: 'Up to 20% off with HDFC Cards',
    walletOffer: 'Flat ₹200 Cashback with CRED Pay'
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
    addToast(`Table reserved at ${restName}! Offer applied on bill 🍽️`, 'success');
  };

  return (
    <div id="dineout-section" className="w-full">
      <div className="flex items-center justify-between mb-3 sm:mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1C1C1C] tracking-tight">
            Discover best restaurants on Dineout
          </h2>
        </div>

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

      <div
        ref={scrollRef}
        className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-3 scroll-smooth"
      >
        {DINEOUT_RESTAURANTS.map((rest) => (
          <div
            key={rest.id}
            onClick={() => handleBookTable(rest.name)}
            className="w-72 sm:w-80 lg:w-88 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between shrink-0 cursor-pointer group"
          >
            <div>
              {/* Photo with gradient overlay and bottom name + rating */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Dark gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Bottom Overlay Info: Name & Rating Badge */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base text-white truncate drop-shadow-md">
                    {rest.name}
                  </h3>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-600 text-white rounded-md text-[10px] sm:text-xs font-bold shrink-0 shadow-xs">
                    <Star className="w-2.5 h-2.5 fill-white" />
                    <span>{rest.rating}</span>
                  </div>
                </div>
              </div>

              {/* Middle Section: Cuisine, Location, Price */}
              <div className="p-3 sm:p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-500 font-medium text-[11px] sm:text-xs">
                  <span className="truncate">{rest.cuisine}</span>
                  <span className="font-bold text-slate-800 shrink-0">{rest.costForTwo}</span>
                </div>

                <div className="flex items-center justify-between text-slate-400 text-[10px] sm:text-[11px]">
                  <span className="truncate">{rest.location}</span>
                  <span className="shrink-0">{rest.distance}</span>
                </div>

                {/* Green Offer Pill: e.g. Flat 25% off on pre-booking */}
                <div className="p-2 rounded-xl bg-[#E8F8F0] border border-emerald-300/60 text-emerald-800 flex items-center justify-between gap-1 text-[11px] font-extrabold">
                  <div className="flex items-center gap-1.5 truncate">
                    <Percent className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{rest.primaryOffer}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 underline shrink-0 font-bold">
                    {rest.extraOffersCount}
                  </span>
                </div>

                {/* Bank Offer Line */}
                <div className="text-[10px] sm:text-[11px] font-bold text-emerald-700 truncate">
                  {rest.bankOffer}
                </div>

                {/* Wallet Offer Line */}
                <div className="text-[10px] sm:text-[11px] font-bold text-indigo-700 truncate">
                  {rest.walletOffer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DineoutSection;


