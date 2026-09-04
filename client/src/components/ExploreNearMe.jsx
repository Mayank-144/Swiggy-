import React, { useState } from 'react';

const CITIES = [
  'Order food online in Bengaluru',
  'Order food online in Gurgaon',
  'Order food online in Hyderabad',
  'Order food online in Delhi NCR',
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
  'Order food online in Goa',
  'Order food online in Indore'
];

export const ExploreNearMe = ({ onSelectCuisine }) => {
  const [showMoreCities, setShowMoreCities] = useState(false);

  // Default shows 12 cities (3 full rows on 4 col desktop, 6 rows on 2 col mobile)
  const displayedCities = showMoreCities ? CITIES : CITIES.slice(0, 12);

  return (
    <section
      style={{
        backgroundColor: '#FAFAFA',
        borderRadius: '16px',
        padding: '24px 20px'
      }}
      className="w-full my-4 space-y-4 font-sans"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3
          style={{ fontSize: '20px', fontWeight: 800, color: '#1C1C1C' }}
          className="tracking-tight text-left"
        >
          Cities with food delivery
        </h3>

        {/* "Show More ▾" — color #FC8019, font-weight 600, text-align right, cursor pointer */}
        <button
          onClick={() => setShowMoreCities(!showMoreCities)}
          style={{ color: '#FC8019', fontWeight: 600, fontSize: '13px' }}
          className="inline-flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-none"
        >
          <span>{showMoreCities ? 'Show Less ▴' : 'Show More ▾'}</span>
        </button>
      </div>

      {/* Pills grid: 1 col on small mobile, 2 col on xs/sm mobile, 4 columns on desktop */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
        {displayedCities.map((city) => (
          <button
            key={city}
            onClick={() => onSelectCuisine && onSelectCuisine(city.replace('Order food online in ', ''))}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E8E8',
              borderRadius: '10px',
              padding: '11px 14px',
              fontSize: '12.5px',
              color: '#1C1C1C'
            }}
            className="w-full font-semibold text-center hover:border-[#FC8019] hover:text-[#FC8019] transition-all truncate shadow-2xs cursor-pointer block min-h-[44px]"
          >
            {city}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ExploreNearMe;
