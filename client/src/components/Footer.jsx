import React from 'react';
import { Truck, ShieldCheck, Headphones, Smartphone } from 'lucide-react';
import SwiggyLogo from './SwiggyLogo';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white mt-12 sm:mt-20 pt-10 sm:pt-14 pb-8 sm:pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Features Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-8 sm:pb-10 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-swiggy-orange shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-slate-100">Superfast Delivery</h5>
              <p className="text-xs text-slate-400">Doorstep delivery in 30 mins</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-slate-100">Live Order Tracking</h5>
              <p className="text-xs text-slate-400">Real-time status of your food</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-amber-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-slate-100">24x7 Customer Help</h5>
              <p className="text-xs text-slate-400">Instant query support anytime</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-rose-400 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-slate-100">Best Food Offers</h5>
              <p className="text-xs text-slate-400">Up to 60% discounts everyday</p>
            </div>
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-xs text-slate-400">
          {/* Brand Col */}
          <div className="col-span-1 sm:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <SwiggyLogo variant="dark" size="md" />
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Swiggy is India's leading on-demand food delivery platform, connecting foodies with the best restaurants, cafes and eateries across the country.
            </p>
            <p className="text-slate-500 text-[11px]">
              © 2026 Bundl Technologies Pvt. Ltd. All rights reserved.
            </p>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h6 className="font-black text-slate-200 uppercase tracking-wider text-[11px]">Company</h6>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Swiggy One</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Swiggy Instamart</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-3">
            <h6 className="font-black text-slate-200 uppercase tracking-wider text-[11px]">Contact & Legal</h6>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Help & Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partner with us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Cities */}
          <div className="space-y-3">
            <h6 className="font-black text-slate-200 uppercase tracking-wider text-[11px]">We deliver to:</h6>
            <ul className="space-y-2 font-medium">
              <li><span className="hover:text-white transition-colors">Bengaluru</span></li>
              <li><span className="hover:text-white transition-colors">Delhi NCR</span></li>
              <li><span className="hover:text-white transition-colors">Mumbai</span></li>
              <li><span className="hover:text-white transition-colors">Hyderabad</span></li>
              <li><span className="hover:text-white transition-colors">Pune & 500+ cities</span></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
