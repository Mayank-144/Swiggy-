import React, { useState } from 'react';

const CITIES = [
  'Order food online in Bangalore',
  'Order food online in Gurgaon',
  'Order food online in Hyderabad',
  'Order food online in Delhi',
  'Order food online in Mumbai',
  'Order food online in Pune',
  'Order food online in Kolkata',
  'Order food online in Chennai',
  'Order food online in Ahmedabad',
  'Order food online in Chandigarh',
  'Order food online in Jaipur',
  'Order food online in Kochi',
  'Order food online in Lucknow',
  'Order food online in Noida',
  'Order food online in Goa'
];

export const ExploreNearMe = ({ onSelectCuisine }) => {
  const [showMoreCities, setShowMoreCities] = useState(false);

  // Default shows first 11 cities + 12th is the Show More button
  const displayedCities = showMoreCities ? CITIES : CITIES.slice(0, 11);

  return (
    <section className="w-full my-4 sm:my-8 space-y-3 sm:space-y-4 font-sans">
      {/* Header */}
      <div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1C1C1C] tracking-tight text-left">
          Cities with food delivery
        </h3>
      </div>

      {/* Pills grid: 1 col on small mobile, 2 col on tablet, 4 columns on desktop */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 pt-1">
        {displayedCities.map((city) => (
          <button
            key={city}
            onClick={() => onSelectCuisine && onSelectCuisine(city.replace('Order food online in ', ''))}
            className="w-full bg-white border border-slate-200/90 hover:border-[#FF5200] hover:text-[#FF5200] text-[#1C1C1C] font-semibold text-xs sm:text-[13px] py-3 sm:py-3.5 px-3 rounded-xl transition-all truncate shadow-2xs cursor-pointer block text-center"
          >
            {city}
          </button>
        ))}

        {/* 12th button: Show More / Show Less */}
        <button
          onClick={() => setShowMoreCities(!showMoreCities)}
          className="w-full bg-white border border-slate-200/90 hover:border-[#FF5200] text-[#FF5200] font-bold text-xs sm:text-[13px] py-3 sm:py-3.5 px-3 rounded-xl transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-1"
        >
          <span>{showMoreCities ? 'Show Less' : 'Show More'}</span>
          <span>{showMoreCities ? '▴' : '▾'}</span>
        </button>
      </div>
    </section>
  );
};

export default ExploreNearMe;
