import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UtensilsCrossed,
  Star,
  MapPin,
  Calendar,
  Clock,
  Users,
  Percent,
  CheckCircle,
  X,
  Phone,
  Sparkles,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const DINEOUT_VENUES = [
  {
    id: 'do-1',
    name: 'Shree Vrindavan by Hotel Saket',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    cuisines: 'North Indian • Chinese • South Indian',
    location: 'Shivananda Circle, Seshadripuram',
    distance: '4.1 km',
    costForTwo: '₹400 for two',
    rating: '4.0',
    tag: 'Casual Dining',
    discount: 'FLAT 50% OFF',
    primaryOffer: 'Flat 50% off on pre-booking',
    bankOffer: 'Up to 15% extra off with HDFC Cards',
    walletOffer: 'Get extra ₹100 cashback using CRED Pay',
    openSlots: ['12:30 PM', '01:00 PM', '07:30 PM', '08:00 PM', '09:00 PM']
  },
  {
    id: 'do-2',
    name: 'GFC - Gourmet Food Club',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    cuisines: 'Chinese • North Indian • Continental',
    location: 'The Green Building, BTM Ring Road',
    distance: '4.4 km',
    costForTwo: '₹700 for two',
    rating: '4.2',
    tag: 'Fine Dining',
    discount: 'FLAT 40% OFF',
    primaryOffer: 'Flat 40% off on total food bill',
    bankOffer: 'Flat 20% off with ICICI Bank Cards',
    walletOffer: 'Flat ₹150 Cashback on Axis Bank',
    openSlots: ['12:00 PM', '01:30 PM', '07:00 PM', '08:30 PM', '09:30 PM']
  },
  {
    id: 'do-3',
    name: 'Toit Brewpub & Kitchen',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80',
    cuisines: 'Microbrewery • Italian • Finger Food',
    location: 'Indiranagar 100ft Road',
    distance: '5.6 km',
    costForTwo: '₹1,500 for two',
    rating: '4.8',
    tag: 'Microbrewery & Pubs',
    discount: 'FLAT 30% OFF',
    primaryOffer: 'Flat 30% off with Swiggy Dineout',
    bankOffer: 'Up to 25% off with HDFC Diners Club',
    walletOffer: 'Flat ₹200 Cashback with CRED Pay',
    openSlots: ['01:00 PM', '02:00 PM', '06:30 PM', '08:00 PM', '10:00 PM']
  },
  {
    id: 'do-4',
    name: 'The Bier Library Brewery & Kitchen',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop&q=80',
    cuisines: 'Continental • Pizza • Craft Beer',
    location: 'Koramangala 6th Block',
    distance: '2.8 km',
    costForTwo: '₹1,600 for two',
    rating: '4.7',
    tag: 'Rooftop',
    discount: 'FLAT 50% OFF',
    primaryOffer: 'Flat 50% off on Food Bill (Table Booking)',
    bankOffer: 'Extra ₹250 off with SBI Credit Cards',
    walletOffer: 'Up to ₹200 Cashback with Paytm UPI',
    openSlots: ['12:30 PM', '02:00 PM', '07:00 PM', '08:30 PM', '09:30 PM']
  },
  {
    id: 'do-5',
    name: 'Nayak Pizza & Cafe Bistro',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    cuisines: 'Wood-fired Pizza • Italian • Cafe',
    location: 'Seshadripuram, Kumara Park',
    distance: '3.2 km',
    costForTwo: '₹450 for two',
    rating: '4.3',
    tag: 'Cafes & Desserts',
    discount: '1+1 ON PIZZAS',
    primaryOffer: '1+1 on all Gourmet Pizzas',
    bankOffer: 'Extra 10% off with Amazon Pay',
    walletOffer: 'Flat ₹50 cashback',
    openSlots: ['11:30 AM', '01:00 PM', '04:00 PM', '07:00 PM', '09:00 PM']
  },
  {
    id: 'do-6',
    name: 'Ebony - Rooftop Fine Dining',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    cuisines: 'Mughlai • Parsi • Pan Asian',
    location: 'MG Road, Barton Centre 13th Floor',
    distance: '6.1 km',
    costForTwo: '₹2,200 for two',
    rating: '4.6',
    tag: 'Rooftop',
    discount: 'FLAT 25% OFF',
    primaryOffer: 'Flat 25% off on Candlelight Dinner',
    bankOffer: 'Complimentary Dessert with Amex',
    walletOffer: 'Extra ₹300 off on bill above ₹2000',
    openSlots: ['07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM']
  }
];

const DINEOUT_TAGS = [
  'All',
  'Flat 50% OFF',
  'Rooftop',
  'Microbrewery & Pubs',
  'Fine Dining',
  'Casual Dining',
  'Cafes & Desserts'
];

export const DineoutPage = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingVenue, setBookingVenue] = useState(null);
  const [guestCount, setGuestCount] = useState(2);
  const [bookingDate, setBookingDate] = useState('Today');
  const [selectedSlot, setSelectedSlot] = useState('08:00 PM');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const { addToast } = useToast();

  const filteredVenues = DINEOUT_VENUES.filter((v) => {
    const matchesTag =
      selectedTag === 'All' ||
      v.tag === selectedTag ||
      (selectedTag === 'Flat 50% OFF' && v.discount.includes('50%'));
    const matchesSearch =
      !searchQuery ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.cuisines.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleOpenBooking = (venue) => {
    setBookingVenue(venue);
    setSelectedSlot(venue.openSlots[0] || '08:00 PM');
    setBookingSuccess(false);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    addToast(`Table confirmed at ${bookingVenue.name} for ${guestCount} guests! 🍽️`, 'success');
  };

  return (
    <div className="w-full bg-[#FAFAFC] min-h-screen pb-20 font-sans">
      {/* Top Dineout Banner */}
      <div className="w-full bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#334155] text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Swiggy Dineout Experience</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Eat Out &amp; Save Up to 50%
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Book tables instantly at premier dining spots, microbreweries, rooftop bistros &amp; enjoy pre-applied bill discounts.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-center min-w-[110px]">
              <p className="text-xl sm:text-2xl font-black text-rose-400">FLAT 50%</p>
              <p className="text-[10px] font-bold text-slate-300 uppercase">Dining Deals</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-center min-w-[110px]">
              <p className="text-xl sm:text-2xl font-black text-white">0 FEES</p>
              <p className="text-[10px] font-bold text-slate-300 uppercase">Instant Booking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-6">
        {/* Search & Highlights */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by restaurant name, cuisine or area (Koramangala, Indiranagar)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-rose-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">
            <Percent className="w-4 h-4" />
            <span>Pay bill via Swiggy for extra 10-15% bank discount</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {DINEOUT_TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                selectedTag === t
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Venues Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Discover {filteredVenues.length} Best Dining Places
            </h2>
            <span className="text-xs font-bold text-slate-400">Guaranteed Table Reservation</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredVenues.map((venue) => (
              <div
                key={venue.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Photo with Overlay Badge */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wider">
                      {venue.discount}
                    </div>

                    {/* Tag badge */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white font-bold text-[10px] px-2 py-0.5 rounded-md">
                      {venue.tag}
                    </div>

                    {/* Bottom overlay: Name & Rating */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                      <h3 className="font-black text-base sm:text-lg text-white truncate drop-shadow-md">
                        {venue.name}
                      </h3>
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-600 text-white rounded-md text-xs font-bold shrink-0 shadow-xs">
                        <Star className="w-3 h-3 fill-white" />
                        <span>{venue.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between text-slate-500 font-medium">
                      <span className="truncate">{venue.cuisines}</span>
                      <span className="font-extrabold text-slate-800 shrink-0">{venue.costForTwo}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{venue.location}</span>
                      <span>•</span>
                      <span className="shrink-0">{venue.distance}</span>
                    </div>

                    {/* Green Pre-booking Offer Pill */}
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 flex items-center justify-between gap-2 text-xs font-extrabold">
                      <div className="flex items-center gap-1.5 truncate">
                        <Percent className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate">{venue.primaryOffer}</span>
                      </div>
                    </div>

                    {/* Bank Offer snippet */}
                    <p className="text-[11px] font-bold text-emerald-700 truncate">{venue.bankOffer}</p>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => handleOpenBooking(venue)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-[#FF5200] text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Book a Table (Free)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Table Booking Modal */}
      <AnimatePresence>
        {bookingVenue && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-100 relative"
            >
              <button
                onClick={() => setBookingVenue(null)}
                className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!bookingSuccess ? (
                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      {bookingVenue.discount} Pre-Applied
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">{bookingVenue.name}</h3>
                    <p className="text-xs text-slate-400">{bookingVenue.location}</p>
                  </div>

                  {/* Number of Guests */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#FF5200]" />
                      <span>Number of Guests</span>
                    </label>
                    <div className="flex items-center gap-2 overflow-x-auto py-1">
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestCount(num)}
                          className={`w-10 h-10 rounded-xl font-black text-xs shrink-0 transition-all cursor-pointer ${
                            guestCount === num
                              ? 'bg-[#FF5200] text-white shadow-md'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FF5200]" />
                      <span>Select Date</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Today', 'Tomorrow', 'This Weekend'].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setBookingDate(d)}
                          className={`py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                            bookingDate === d
                              ? 'bg-slate-900 text-white shadow-md'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FF5200]" />
                      <span>Select Time Slot</span>
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {bookingVenue.openSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                            selectedSlot === slot
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#FF5200] hover:bg-[#E04800] text-white font-extrabold text-sm rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
                    >
                      Confirm Table Reservation (Free)
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900">Table Reserved Successfully!</h3>
                    <p className="text-xs text-slate-500">
                      Reservation for <span className="font-bold text-slate-800">{guestCount} Guests</span> on{' '}
                      <span className="font-bold text-slate-800">{bookingDate}</span> at{' '}
                      <span className="font-bold text-slate-800">{selectedSlot}</span>.
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-800">
                    Show your reservation upon arrival to enjoy {bookingVenue.discount} on your total bill!
                  </div>

                  <button
                    type="button"
                    onClick={() => setBookingVenue(null)}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DineoutPage;
