import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  MapPin,
  Clock,
  Heart,
  Edit2,
  Check,
  Plus,
  ArrowRight,
  LogOut,
  ShoppingBag,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { orderAPI, restaurantAPI } from '../services/api';

export const ProfilePage = () => {
  const { user, isAuthenticated, openAuthModal, logout, updateProfile } = useAuth();
  const { addToCart, openCartDrawer } = useCart();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'orders';

  const [orders, setOrders] = useState([]);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Edit Profile Form state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name,
        phone: user.phone || '+91 98765 43210'
      });
    }
  }, [user]);

  // Fetch orders
  useEffect(() => {
    const fetchUserOrders = async () => {
      setLoadingOrders(true);
      try {
        const res = await orderAPI.getUserOrders();
        if (res.success) {
          setOrders(res.data);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchUserOrders();
  }, []);

  // Fetch favorite restaurants
  useEffect(() => {
    const fetchFavs = async () => {
      if (user?.favorites && user.favorites.length > 0) {
        try {
          const res = await restaurantAPI.getRestaurants({});
          if (res.success) {
            const favs = res.data.filter((r) => user.favorites.includes(r.id));
            setFavoriteRestaurants(favs);
          }
        } catch (err) {
          console.error('Error fetching fav restaurants:', err);
        }
      } else {
        setFavoriteRestaurants([]);
      }
    };
    fetchFavs();
  }, [user?.favorites]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-slate-800">Please Sign In</h3>
        <p className="text-xs text-slate-400">Sign in to view your orders, addresses, and saved favorite spots.</p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-6 py-2.5 bg-swiggy-orange text-white text-xs font-bold rounded-xl shadow-md uppercase tracking-wider"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    await updateProfile(profileForm);
    setIsEditingProfile(false);
  };

  const handleReorder = (order) => {
    if (order.items && order.restaurant) {
      order.items.forEach((item) => {
        addToCart(item, order.restaurant);
      });
      openCartDrawer();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-5 sm:space-y-8">
      {/* Profile Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4 relative z-10 min-w-0">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
            alt={user.name}
            className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover border-2 border-swiggy-orange shadow-lg shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-2xl font-black tracking-tight truncate">{user.name}</h2>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
                title="Edit profile"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-0.5 truncate">{user.email}</p>
            <p className="text-xs text-slate-400 font-medium truncate">{user.phone || '+91 98765 43210'}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="relative z-10 px-3.5 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-200 hover:text-rose-300 font-bold text-xs flex items-center justify-center gap-2 transition-all self-stretch sm:self-center border border-white/10"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Edit Profile inline drawer */}
      {isEditingProfile && (
        <form
          onSubmit={handleProfileUpdate}
          className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-sm space-y-4 max-w-lg"
        >
          <h4 className="font-extrabold text-sm text-slate-800">Edit Profile Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-swiggy-orange"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Phone</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-swiggy-orange"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-swiggy-orange text-white font-bold text-xs hover:bg-swiggy-orangeDark transition-colors shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Tab Selectors */}
      <div className="flex border-b border-slate-200 gap-3 sm:gap-6 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
        <button
          onClick={() => setSearchParams({ tab: 'orders' })}
          className={`pb-2.5 sm:pb-3 px-1 sm:px-0 font-extrabold text-xs sm:text-sm tracking-tight transition-all relative flex items-center gap-1.5 sm:gap-2 shrink-0 ${
            activeTab === 'orders' ? 'text-swiggy-orange' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Past Orders ({orders.length})</span>
          {activeTab === 'orders' && (
            <motion.div
              layoutId="profileTabIndicator"
              className="absolute bottom-0 inset-x-0 h-0.5 bg-swiggy-orange"
            />
          )}
        </button>

        <button
          onClick={() => setSearchParams({ tab: 'addresses' })}
          className={`pb-2.5 sm:pb-3 px-1 sm:px-0 font-extrabold text-xs sm:text-sm tracking-tight transition-all relative flex items-center gap-1.5 sm:gap-2 shrink-0 ${
            activeTab === 'addresses' ? 'text-swiggy-orange' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses ({user.addresses?.length || 1})</span>
          {activeTab === 'addresses' && (
            <motion.div
              layoutId="profileTabIndicator"
              className="absolute bottom-0 inset-x-0 h-0.5 bg-swiggy-orange"
            />
          )}
        </button>

        <button
          onClick={() => setSearchParams({ tab: 'favorites' })}
          className={`pb-2.5 sm:pb-3 px-1 sm:px-0 font-extrabold text-xs sm:text-sm tracking-tight transition-all relative flex items-center gap-1.5 sm:gap-2 shrink-0 ${
            activeTab === 'favorites' ? 'text-swiggy-orange' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Favorite Spots ({user.favorites?.length || 0})</span>
          {activeTab === 'favorites' && (
            <motion.div
              layoutId="profileTabIndicator"
              className="absolute bottom-0 inset-x-0 h-0.5 bg-swiggy-orange"
            />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4 sm:space-y-6">
        {/* 1. Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            {loadingOrders ? (
              <div className="space-y-4">
                <div className="h-32 bg-slate-200 rounded-3xl animate-pulse" />
                <div className="h-32 bg-slate-200 rounded-3xl animate-pulse" />
              </div>
            ) : orders.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-slate-100 p-8 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-extrabold text-base text-slate-700">No previous orders yet</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  When you place orders, they will appear here with live tracking and 1-click reorder options.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.orderId}
                    className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-sm space-y-3 sm:space-y-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={order.restaurant?.image}
                          alt={order.restaurant?.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-black text-xs sm:text-sm text-slate-900 truncate">{order.restaurant?.name}</h4>
                          <p className="text-xs text-slate-400 font-medium truncate">{order.restaurant?.area}</p>
                          <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5 truncate">ORDER #{order.orderId}</p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {/cash\s*on\s*delivery|cod/i.test(order.paymentMethod || '') && order.orderStatus !== 'DELIVERED' && order.paymentStatus !== 'PAID' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                              COD Pending
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                              PAID
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                            {order.orderStatus.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <span className="font-black text-sm text-slate-900 mt-0.5 sm:mt-1">
                          ₹{order.bill?.grandTotal || order.totalAmount}
                        </span>
                      </div>
                    </div>

                    {/* Ordered Items preview */}
                    <div className="text-xs text-slate-600 font-medium">
                      {order.items?.map((item, idx) => (
                        <span key={item.id}>
                          {item.name} x {item.quantity}
                          {idx < order.items.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2">
                      <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>

                      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <Link
                          to={`/order-tracking/${order.orderId}`}
                          className="flex-1 sm:flex-none text-center px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                        >
                          Track Status
                        </Link>
                        <button
                          onClick={() => handleReorder(order)}
                          className="flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl bg-swiggy-orange hover:bg-swiggy-orangeDark text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reorder</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {(user.addresses || []).map((addr, idx) => (
              <div
                key={addr._id || idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-swiggy-orange" />
                    {addr.title || 'Home'}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800">{addr.flatNo}</p>
                  <p className="text-xs text-slate-500 font-medium">{addr.area}, {addr.city}</p>
                  <p className="text-[11px] text-slate-400 font-medium">PIN: {addr.pincode}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. Favorites Tab */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteRestaurants.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-slate-100 p-8 space-y-3">
                <Heart className="w-12 h-12 text-rose-300 mx-auto" />
                <h4 className="font-extrabold text-base text-slate-700">No favorite restaurants yet</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click the heart icon on any restaurant card to save your favorite eateries here!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {favoriteRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="h-36 w-full object-cover"
                    />
                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 truncate">{restaurant.name}</h4>
                        <p className="text-xs text-slate-500 truncate">{restaurant.cuisines.join(', ')}</p>
                      </div>
                      <Link
                        to={`/restaurant/${restaurant.id}`}
                        className="w-full mt-2 py-2 bg-swiggy-orangeLight text-swiggy-orangeDark font-bold text-xs rounded-xl flex items-center justify-center gap-1 hover:bg-swiggy-orange hover:text-white transition-colors"
                      >
                        <span>View Menu</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
