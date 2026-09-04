import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  Phone,
  Sparkles,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Truck,
  Percent,
  Clock,
  MapPin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SwiggyLogo from './SwiggyLogo';

export const AuthGate = ({ children }) => {
  const { isAuthenticated, login, register, demoLogin, authModalMode, setAuthModalMode } = useAuth();

  const [mode, setMode] = useState(authModalMode || 'login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already authenticated, allow full access to the site!
  if (isAuthenticated) {
    return <>{children}</>;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
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

  const handleDemoLogin = async () => {
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
    <div className="min-h-screen bg-gradient-to-br from-[#FF5200] via-[#F14D00] to-[#E03A00] flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Decorative Food Blur Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between relative z-10">
        <SwiggyLogo variant="white" size="lg" to={null} />
        <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full text-white text-xs font-bold border border-white/20">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>Login Required to Access</span>
        </div>
      </header>

      {/* Center Auth Card & Feature Highlights */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 relative z-10 my-auto">
        {/* Left Side: Value Propositions (Desktop/Tablet) */}
        <div className="hidden lg:flex flex-col text-white space-y-6 max-w-md">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white border border-white/30">
              <Sparkles className="w-3.5 h-3.5" />
              India's #1 Food & Grocery App
            </span>
            <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-tight">
              Order food & groceries. Discover best restaurants.
            </h1>
            <p className="text-white/80 text-sm font-medium leading-relaxed">
              Sign in to explore 500+ top restaurants, lightning-fast 30-min deliveries, Instamart groceries, and exclusive dineout discounts.
            </p>
          </div>

          <div className="space-y-3.5 pt-2">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
              <div className="w-10 h-10 rounded-xl bg-white text-[#FF5200] flex items-center justify-center shrink-0 font-bold shadow-sm">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-sm text-white">Superfast 30-Min Delivery</h4>
                <p className="text-xs text-white/70">From the best restaurants near you</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
              <div className="w-10 h-10 rounded-xl bg-white text-[#FF5200] flex items-center justify-center shrink-0 font-bold shadow-sm">
                <Percent className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-sm text-white">Exclusive Deals & Offers</h4>
                <p className="text-xs text-white/70">Up to 60% OFF with instant coupons</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
              <div className="w-10 h-10 rounded-xl bg-white text-[#FF5200] flex items-center justify-center shrink-0 font-bold shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-sm text-white">Live GPS Order Tracking</h4>
                <p className="text-xs text-white/70">Real-time status from kitchen to doorstep</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative"
        >
          {/* Top Orange Accent */}
          <div className="h-2 bg-gradient-to-r from-[#FF5200] via-amber-500 to-rose-500 shrink-0" />

          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center space-y-1 mb-5">
              <div className="inline-flex justify-center mb-1">
                <SwiggyLogo variant="orange" size="md" to={null} />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {mode === 'login'
                  ? 'Access your food cart, past orders and saved addresses'
                  : 'Join Swiggy today to get unlimited food deliveries'}
              </p>
            </div>

            {/* Mode Toggle Pills */}
            <div className="flex p-1 bg-slate-100 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-white text-[#FF5200] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-[#FF5200] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Instant Demo Login CTA */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full mb-4 py-2.5 px-4 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 border border-[#FF5200]/40 rounded-2xl text-[#FF5200] font-black text-xs flex items-center justify-center gap-2 transition-all shadow-xs group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FF5200] group-hover:rotate-12 transition-transform shrink-0" />
              <span>⚡ One-Click Demo Login (Mayank Jaiswal)</span>
            </button>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
              {mode === 'signup' && (
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF5200] focus:bg-white font-medium"
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
                    placeholder="mayank@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF5200] focus:bg-white font-medium"
                  />
                </div>
              </div>

              {mode === 'signup' && (
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF5200] focus:bg-white font-medium"
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF5200] focus:bg-white font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 bg-[#FF5200] hover:bg-[#E04800] text-white font-black rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all hover:shadow-orange-500/40 active:scale-[0.99] disabled:opacity-70 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In & Enter' : 'Create Free Account'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>

            <p className="text-[11px] text-slate-400 text-center mt-4 leading-relaxed">
              By proceeding, you agree to Swiggy's <span className="underline font-semibold">Terms of Service</span> & <span className="underline font-semibold">Privacy Policy</span>.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 text-center text-white/70 text-xs font-medium relative z-10">
        © 2026 Bundl Technologies Pvt. Ltd. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthGate;
