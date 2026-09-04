import React from 'react';
import { Smartphone, QrCode, Star, ArrowUpRight } from 'lucide-react';
import SwiggyLogo from './SwiggyLogo';

export const AppDownloadBanner = () => {
  return (
    <section className="my-4 sm:my-8 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#02060C] text-white p-5 sm:p-8 md:p-10 border border-slate-800 shadow-xl">
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#FF5200]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10 max-w-6xl mx-auto">
        {/* Left Side: Brand Logo, Headline & Value Proposition */}
        <div className="space-y-3 sm:space-y-4 text-center lg:text-left max-w-xl">
          {/* Swiggy Logo */}
          <div className="flex justify-center lg:justify-start">
            <SwiggyLogo variant="white" size="sm" />
          </div>

          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight sm:leading-snug">
            Get the Swiggy App now!
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            For best offers and discounts curated specially for you. Enjoy live order tracking, 10-minute grocery deliveries & Dineout bill discounts.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 pt-1 text-[11px] sm:text-xs font-bold text-slate-300">
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>4.6 ★ on App Stores</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <span>⚡ 100M+ Downloads</span>
            </div>
          </div>

          {/* App Store / Play Store Links */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-2">
            <button
              onClick={() => window.open('https://play.google.com/store/apps/details?id=in.swiggy.android', '_blank')}
              className="flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-slate-700 hover:border-slate-500 shadow-md transition-all active:scale-95 cursor-pointer text-left"
            >
              <div className="w-5 h-5 flex items-center justify-center text-emerald-400 font-black text-xs">
                ▶
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">GET IT ON</span>
                <span className="font-extrabold text-xs sm:text-sm tracking-tight">Google Play</span>
              </div>
            </button>

            <button
              onClick={() => window.open('https://apps.apple.com/in/app/swiggy-food-grocery-delivery/id989587007', '_blank')}
              className="flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-slate-700 hover:border-slate-500 shadow-md transition-all active:scale-95 cursor-pointer text-left"
            >
              <div className="w-5 h-5 flex items-center justify-center text-white font-black text-xs">
                
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Download on the</span>
                <span className="font-extrabold text-xs sm:text-sm tracking-tight">App Store</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Side: Phone Mockup with QR Code & Floating Food Assets */}
        <div className="relative shrink-0 flex items-center justify-center pt-2 sm:pt-0">
          {/* Floating Food Badges */}
          <div className="hidden sm:block absolute -top-3 -left-6 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-lg animate-bounce duration-1000">
            <span className="text-xl">🍔</span>
          </div>
          <div className="hidden sm:block absolute top-1/2 -right-5 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-lg">
            <span className="text-xl">🌮</span>
          </div>
          <div className="hidden sm:block absolute -bottom-2 -left-4 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-lg">
            <span className="text-xl">🥤</span>
          </div>

          {/* Smartphone Mockup */}
          <div className="w-56 xs:w-64 sm:w-72 bg-white rounded-3xl p-3 sm:p-4 text-slate-900 shadow-2xl border-4 border-slate-700/80 flex flex-col items-center">
            {/* Phone Top Notch Bar */}
            <div className="w-16 h-1.5 bg-slate-300 rounded-full mb-3" />

            {/* QR Code Graphic */}
            <div className="w-full bg-slate-50 rounded-2xl p-3 border border-slate-200 flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-2.5 bg-white rounded-xl shadow-xs border border-slate-200/80">
                <QrCode className="w-24 h-24 sm:w-28 sm:h-28 text-slate-900" />
              </div>
              <p className="text-[11px] sm:text-xs font-black text-[#FF5200] tracking-tight">
                Scan to download
              </p>
              <p className="text-[10px] text-slate-400 font-semibold">
                Point your camera to download iOS & Android App
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadBanner;


