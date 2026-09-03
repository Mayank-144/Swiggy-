import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Utensils } from 'lucide-react';

const TOP_LOCALITIES = [
  'Explore Restaurants Near Me',
  'Explore Top Rated Restaurants Near Me',
  'Chinese Restaurants Near Me',
  'South Indian Restaurants Near Me',
  'Indian Restaurants Near Me',
  'Kerala Restaurants Near Me',
  'Korean Restaurants Near Me',
  'North Indian Restaurants Near Me',
  'Seafood Restaurants Near Me',
  'Bengali Restaurants Near Me',
  'Punjabi Restaurants Near Me',
  'Italian Restaurants Near Me'
];

const CITIES = [
  'Bangalore Restaurants',
  'Delhi Restaurants',
  'Mumbai Restaurants',
  'Hyderabad Restaurants',
  'Pune Restaurants',
  'Kolkata Restaurants',
  'Chennai Restaurants',
  'Ahmedabad Restaurants',
  'Chandigarh Restaurants',
  'Jaipur Restaurants',
  'Kochi Restaurants',
  'Lucknow Restaurants'
];

export const ExploreNearMe = ({ onSelectCuisine }) => {
  const [showMoreLocalities, setShowMoreLocalities] = useState(false);
  const [showMoreCities, setShowMoreCities] = useState(false);

  const displayedLocalities = showMoreLocalities ? TOP_LOCALITIES : TOP_LOCALITIES.slice(0, 8);
  const displayedCities = showMoreCities ? CITIES : CITIES.slice(0, 8);

  return (
    <section className="py-8 border-b border-slate-100 space-y-10">
      {/* Popular Cuisines Near Me */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Utensils className="w-5 h-5 text-[#FF5200]" />
          <span>Explore Every Restaurant Near Me</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {displayedLocalities.map((loc) => (
            <button
              key={loc}
              onClick={() => onSelectCuisine && onSelectCuisine(loc.split(' ')[0])}
              className="p-3.5 bg-white border border-slate-200 hover:border-[#FF5200] hover:text-[#FF5200] rounded-2xl text-xs font-bold text-slate-700 text-center transition-all truncate shadow-2xs"
            >
              {loc}
            </button>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setShowMoreLocalities(!showMoreLocalities)}
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#FF5200] hover:underline"
          >
            <span>{showMoreLocalities ? 'Show Less' : 'Show More Cuisines'}</span>
            {showMoreLocalities ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Cities with food delivery */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#FF5200]" />
          <span>Cities With Food Delivery</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {displayedCities.map((city) => (
            <div
              key={city}
              className="p-3.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 text-center transition-all truncate shadow-2xs"
            >
              {city}
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setShowMoreCities(!showMoreCities)}
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#FF5200] hover:underline"
          >
            <span>{showMoreCities ? 'Show Less' : 'Show More Cities'}</span>
            {showMoreCities ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreNearMe;
