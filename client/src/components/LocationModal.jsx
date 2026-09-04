import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, X, Check, Navigation } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const POPULAR_CITIES = [
  {
    city: 'Bengaluru',
    areas: ['Koramangala 4th Block', 'Indiranagar 100ft Rd', 'HSR Layout Sector 1', 'Whitefield', 'Jayanagar 4th Block', 'BTM Layout']
  },
  {
    city: 'Delhi NCR',
    areas: ['Connaught Place', 'Hauz Khas', 'Cyber Hub Gurgaon', 'Noida Sector 18', 'Saket', 'Karol Bagh']
  },
  {
    city: 'Mumbai',
    areas: ['Bandra West', 'Andheri West', 'Powai Hiranandani', 'Lower Parel', 'Juhu Tara Rd', 'Colaba']
  },
  {
    city: 'Hyderabad',
    areas: ['Hitec City', 'Jubilee Hills', 'Gachibowli', 'Banjara Hills', 'Madhapur', 'Kondapur']
  },
  {
    city: 'Pune',
    areas: ['Koregaon Park', 'Viman Nagar', 'Baner', 'Kalyani Nagar', 'FC Road', 'Hinjawadi']
  }
];

export const LocationModal = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, currentLocation, updateLocation } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Bengaluru');

  if (!isLocationModalOpen) return null;

  const currentCityData = POPULAR_CITIES.find(c => c.city === selectedCity) || POPULAR_CITIES[0];
  const filteredAreas = currentCityData.areas.filter(area =>
    area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (area, city) => {
    updateLocation({
      city,
      area,
      fullAddress: `${area}, ${city}`
    });
    setIsLocationModalOpen(false);
  };

  const handleUseCurrent = () => {
    handleSelect('Koramangala 4th Block', 'Bengaluru');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col my-auto max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-swiggy-orange shrink-0" />
              <h3 className="font-bold text-base sm:text-lg text-slate-800">Choose Delivery Location</h3>
            </div>
            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="p-1 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 overflow-y-auto">
            {/* GPS locate button */}
            <button
              onClick={handleUseCurrent}
              className="w-full flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl border border-swiggy-orange/30 bg-swiggy-orange/5 hover:bg-swiggy-orange/10 text-swiggy-orange font-semibold transition-colors text-xs sm:text-sm"
            >
              <Navigation className="w-4 h-4 fill-swiggy-orange shrink-0" />
              <span className="truncate">Use Current GPS Location</span>
            </button>

            {/* City selector tabs */}
            <div>
              <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Popular Cities
              </label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {POPULAR_CITIES.map((c) => (
                  <button
                    key={c.city}
                    onClick={() => setSelectedCity(c.city)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      selectedCity === c.city
                        ? 'bg-swiggy-orange text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {c.city}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search area in ${selectedCity}...`}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-swiggy-orange text-xs sm:text-sm font-medium"
              />
            </div>

            {/* Areas list */}
            <div className="space-y-1">
              <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Select Locality in {selectedCity}
              </label>
              {filteredAreas.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs sm:text-sm">
                  No areas found matching "{searchQuery}"
                </div>
              ) : (
                filteredAreas.map((area) => {
                  const isSelected = currentLocation.city === selectedCity && currentLocation.area === area;
                  return (
                    <button
                      key={area}
                      onClick={() => handleSelect(area, selectedCity)}
                      className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl transition-colors text-left text-xs sm:text-sm ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                          : 'hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <MapPin className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <span className="truncate">{area}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LocationModal;
