import React from 'react';
import { Smartphone, Download, Star, ShieldCheck } from 'lucide-react';

export const AppDownloadBanner = () => {
  return (
    <section className="py-10 my-8 bg-gradient-to-r from-slate-100 via-orange-50/50 to-slate-100 rounded-3xl p-6 sm:p-10 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
      <div className="space-y-2 text-center md:text-left max-w-xl">
        <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
          For better experience, download the Swiggy app now
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Get real-time live order tracking, exclusive app-only coupons, and lightning fast delivery at your fingertips.
        </p>

        <div className="flex items-center justify-center md:justify-start gap-4 pt-2 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
            <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
            <span>4.6 ★ on App Stores</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-[#FF5200]" />
            <span>100M+ Downloads</span>
          </div>
        </div>
      </div>

      {/* App Store / Play Store Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
        <button
          onClick={() => window.open('https://play.google.com/store/apps/details?id=in.swiggy.android', '_blank')}
          className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black hover:bg-neutral-900 text-white shadow-lg transition-transform active:scale-95 border border-slate-800"
        >
          <div className="text-left">
            <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">GET IT ON</span>
            <span className="font-extrabold text-sm tracking-tight">Google Play</span>
          </div>
        </button>

        <button
          onClick={() => window.open('https://apps.apple.com/in/app/swiggy-food-grocery-delivery/id989587007', '_blank')}
          className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black hover:bg-neutral-900 text-white shadow-lg transition-transform active:scale-95 border border-slate-800"
        >
          <div className="text-left">
            <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Download on the</span>
            <span className="font-extrabold text-sm tracking-tight">App Store</span>
          </div>
        </button>
      </div>
    </section>
  );
};

export default AppDownloadBanner;
