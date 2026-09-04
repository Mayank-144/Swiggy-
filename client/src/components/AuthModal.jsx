import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import SwiggyLogo from './SwiggyLogo';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, setAuthModalMode, login, register, demoLogin } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authModalMode === 'login') {
        await login(formData.email, formData.password);
      } else {
        if (!formData.name.trim()) {
          throw new Error('Please enter your full name');
        }
        await register(formData.name, formData.email, formData.password, formData.phone);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoClick = async () => {
    setLoading(true);
    setError('');
    try {
      await demoLogin();
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden relative flex flex-col my-auto max-h-[95vh] overflow-y-auto"
        >
          {/* Top Banner Accent */}
          <div className="h-1.5 sm:h-2 bg-gradient-to-r from-swiggy-orange via-amber-500 to-rose-500 shrink-0" />

          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-5 sm:p-7">
            {/* Header / Tabs */}
            <div className="mb-4 sm:mb-6 pr-6 space-y-1">
              <SwiggyLogo variant="orange" size="sm" to={null} className="mb-1" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                {authModalMode === 'login' ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                {authModalMode === 'login'
                  ? 'Login to track orders and access your favorites'
                  : 'Join Swiggy for exclusive offers and lightning fast delivery'}
              </p>
            </div>

            {/* Mode Switcher Pills */}
            <div className="flex p-1 bg-slate-100 rounded-xl mb-4 sm:mb-6">
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('login');
                  setError('');
                }}
                className={`flex-1 py-1.5 sm:py-2 text-xs font-bold rounded-lg transition-all ${
                  authModalMode === 'login'
                    ? 'bg-white text-swiggy-orange shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('signup');
                  setError('');
                }}
                className={`flex-1 py-1.5 sm:py-2 text-xs font-bold rounded-lg transition-all ${
                  authModalMode === 'signup'
                    ? 'bg-white text-swiggy-orange shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Demo Login Instant Action Button */}
            <button
              type="button"
              onClick={handleDemoClick}
              disabled={loading}
              className="w-full mb-4 sm:mb-5 py-2 sm:py-2.5 px-3 sm:px-4 bg-gradient-to-r from-amber-500/10 to-swiggy-orange/15 hover:from-amber-500/20 hover:to-swiggy-orange/25 border border-swiggy-orange/30 rounded-xl text-swiggy-orangeDark font-bold text-[11px] sm:text-xs flex items-center justify-center gap-2 transition-all group text-center"
            >
              <Sparkles className="w-4 h-4 text-swiggy-orange group-hover:rotate-12 transition-transform shrink-0" />
              <span className="truncate">⚡ Instant Demo Login (Mayank Jaiswal)</span>
            </button>

            {/* Error banner */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
              {authModalMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-swiggy-orange focus:bg-white font-medium"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-swiggy-orange focus:bg-white font-medium"
                  />
                </div>
              </div>

              {authModalMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (Optional)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-swiggy-orange focus:bg-white font-medium"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-swiggy-orange focus:bg-white font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-2.5 sm:py-3 px-4 bg-swiggy-orange hover:bg-swiggy-orangeDark text-white font-bold rounded-xl shadow-lg shadow-swiggy-orange/25 flex items-center justify-center gap-2 transition-all hover:shadow-swiggy-orange/40 active:scale-[0.99] disabled:opacity-70 text-xs sm:text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{authModalMode === 'login' ? 'Sign In to Swiggy' : 'Create Free Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Privacy notice */}
            <p className="text-[10px] sm:text-[11px] text-slate-400 text-center mt-4 sm:mt-5 leading-relaxed">
              By continuing, you agree to Swiggy's <span className="underline cursor-pointer hover:text-slate-600">Terms of Service</span> & <span className="underline cursor-pointer hover:text-slate-600">Privacy Policy</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
