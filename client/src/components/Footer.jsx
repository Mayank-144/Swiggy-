import React from 'react';
import { Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';
import SwiggyLogo from './SwiggyLogo';

export const Footer = () => {
  return (
    <footer className="bg-[#F0F0F5] text-slate-800 mt-12 sm:mt-16 pt-10 sm:pt-14 pb-12 sm:pb-16 border-t border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 text-xs">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <SwiggyLogo variant="orange" size="md" />
            <p className="text-slate-500 text-[12px] font-medium pt-1">
              © 2026 Swiggy Limited
            </p>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-sm">Company</h4>
            <ul className="space-y-2.5 font-medium text-slate-600">
              <li><a href="#" className="hover:text-[#FF5200] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#FF5200] transition-colors">Swiggy Corporate</a></li>
              <li><a href="#" className="hover:text-[#FF5200] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FF5200] transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-[#FF5200] transition-colors">Swiggy One</a></li>
              <li><a href="#" className="hover:text-[#FF5200] transition-colors">Swiggy Instamart</a></li>
              <li><a href="#" className="hover:text-[#FF5200] transition-colors">Swiggy Dineout</a></li>
            </ul>
          </div>

          {/* Contact Us & Legal */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">Contact us</h4>
              <ul className="space-y-2.5 font-medium text-slate-600">
                <li><a href="#" className="hover:text-[#FF5200] transition-colors">Help & Support</a></li>
                <li><a href="#" className="hover:text-[#FF5200] transition-colors">Partner With Us</a></li>
                <li><a href="#" className="hover:text-[#FF5200] transition-colors">Ride With Us</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">Legal</h4>
              <ul className="space-y-2.5 font-medium text-slate-600">
                <li><a href="#" className="hover:text-[#FF5200] transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-[#FF5200] transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-[#FF5200] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Available in */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-sm">Available in:</h4>
            <ul className="space-y-2.5 font-medium text-slate-600">
              <li><span className="hover:text-[#FF5200] cursor-pointer transition-colors">Bangalore</span></li>
              <li><span className="hover:text-[#FF5200] cursor-pointer transition-colors">Gurgaon</span></li>
              <li><span className="hover:text-[#FF5200] cursor-pointer transition-colors">Hyderabad</span></li>
              <li><span className="hover:text-[#FF5200] cursor-pointer transition-colors">Delhi</span></li>
              <li><span className="hover:text-[#FF5200] cursor-pointer transition-colors">Mumbai</span></li>
              <li><span className="hover:text-[#FF5200] cursor-pointer transition-colors">Pune</span></li>
              <li>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-700 hover:border-[#FF5200] cursor-pointer transition-all mt-1 shadow-2xs">
                  <span>685 cities</span>
                  <span>▾</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Life at Swiggy & Social Links */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">Life at Swiggy</h4>
              <ul className="space-y-2.5 font-medium text-slate-600">
                <li><a href="#" className="hover:text-[#FF5200] transition-colors">Explore With Swiggy</a></li>
                <li><a href="#" className="hover:text-[#FF5200] transition-colors">Swiggy News</a></li>
                <li><a href="#" className="hover:text-[#FF5200] transition-colors">SnackBar</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">Social Links</h4>
              <div className="flex items-center gap-3 text-slate-600">
                <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-[#FF5200] hover:border-[#FF5200] transition-colors shadow-2xs">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-[#FF5200] hover:border-[#FF5200] transition-colors shadow-2xs">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-[#FF5200] hover:border-[#FF5200] transition-colors shadow-2xs">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-[#FF5200] hover:border-[#FF5200] transition-colors shadow-2xs">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
