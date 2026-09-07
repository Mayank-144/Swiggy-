import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('swiggy_token') || '');
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'

  // Location state
  const [currentLocation, setCurrentLocation] = useState(() => {
    const saved = localStorage.getItem('swiggy_location');
    return saved ? JSON.parse(saved) : {
      city: 'Bengaluru',
      area: 'Koramangala 4th Block',
      fullAddress: '100 Feet Rd, 4th Block, Koramangala, Bengaluru'
    };
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const { addToast } = useToast();

  // Load user profile on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authAPI.getMe();
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            // Token might be invalid
            logout();
          }
        } catch (err) {
          console.warn('Auth check error, resetting token:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const updateLocation = (newLocation) => {
    setCurrentLocation(newLocation);
    localStorage.setItem('swiggy_location', JSON.stringify(newLocation));
    addToast(`Location updated to ${newLocation.area}, ${newLocation.city}`, 'info');
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      if (res.success) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('swiggy_token', res.token);
        setIsAuthModalOpen(false);
        addToast(`Welcome back, ${res.user.name.split(' ')[0]}! 🎉`, 'success');
        return true;
      }
    } catch (err) {
      throw err;
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      const res = await authAPI.register({ name, email, password, phone });
      if (res.success) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('swiggy_token', res.token);
        setIsAuthModalOpen(false);
        addToast(`Account created! Welcome to Swiggy, ${name}! 🎉`, 'success');
        return true;
      }
    } catch (err) {
      throw err;
    }
  };

  const demoLogin = async () => {
    return login('demo@swiggy.com', 'swiggy123');
  };

  const logout = () => {
    setUser(null);
    setToken('');
    try {
      localStorage.removeItem('swiggy_token');
      localStorage.removeItem('swiggy_user');
      localStorage.clear();
    } catch (e) {
      console.warn('Storage clear notice:', e);
    }
    addToast('Logged out successfully', 'info');
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await authAPI.updateProfile(profileData);
      if (res.success && res.user) {
        setUser(res.user);
        addToast('Profile updated!', 'success');
      }
    } catch (err) {
      addToast(err.message || 'Update failed', 'error');
    }
  };

  const toggleFavorite = async (restaurantId) => {
    if (!user) {
      openAuthModal('login');
      return;
    }

    try {
      const res = await authAPI.toggleFavorite(restaurantId);
      if (res.success) {
        setUser((prev) => ({
          ...prev,
          favorites: res.favorites
        }));
        const isFav = res.favorites.includes(restaurantId);
        addToast(isFav ? 'Added to favorites ❤️' : 'Removed from favorites', 'info');
      }
    } catch (err) {
      addToast('Failed to update favorites', 'error');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        demoLogin,
        logout,
        updateProfile,
        toggleFavorite,
        currentLocation,
        updateLocation,
        isLocationModalOpen,
        setIsLocationModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
