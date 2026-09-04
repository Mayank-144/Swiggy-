import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Official Swiggy Brand Logo Component
 * Matches the official Swiggy pin inside a rounded squircle badge + bold wordmark
 *
 * @param {string} variant - 'white' (white badge, white text for orange hero), 
 *                           'orange' (orange badge, orange/dark text for white navbar), 
 *                           'dark' (orange badge, white text for dark footer/modals),
 *                           'badge-only' (just the squircle icon badge)
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} withText - whether to render the "Swiggy" wordmark
 * @param {string} className - optional extra classes
 */
export const SwiggyLogo = ({
  variant = 'white',
  size = 'md',
  withText = true,
  className = '',
  to = '/'
}) => {
  // Size mappings
  const badgeSizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl p-1',
    md: 'w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl p-1.5',
    lg: 'w-10 h-10 sm:w-12 sm:h-12 rounded-2xl sm:rounded-[18px] p-2'
  };

  const textSizes = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl lg:text-4xl'
  };

  // Badge background & Pin color
  let badgeBg = 'bg-white shadow-md';
  let pinFill = '#FF5200';
  let textColor = 'text-white';

  if (variant === 'orange') {
    badgeBg = 'bg-[#FF5200] shadow-md shadow-orange-500/20';
    pinFill = '#FFFFFF';
    textColor = 'text-[#FF5200]';
  } else if (variant === 'dark') {
    badgeBg = 'bg-[#FF5200] shadow-md';
    pinFill = '#FFFFFF';
    textColor = 'text-white';
  } else if (variant === 'white-on-light') {
    badgeBg = 'bg-[#FF5200] shadow-md';
    pinFill = '#FFFFFF';
    textColor = 'text-slate-900';
  }

  const LogoContent = (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
      {/* Official Swiggy Location Pin in Rounded Squircle Badge */}
      <div className={`${badgeSizes[size]} ${badgeBg} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-200`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Swiggy Pin Shape */}
          <path
            d="M16 2.5C10.753 2.5 6.5 6.753 6.5 12C6.5 19.125 16 29.5 16 29.5C16 29.5 25.5 19.125 25.5 12C25.5 6.753 21.247 2.5 16 2.5ZM16 16.25C13.653 16.25 11.75 14.347 11.75 12C11.75 9.653 13.653 7.75 16 7.75C18.347 7.75 20.25 9.653 20.25 12C20.25 14.347 18.347 16.25 16 16.25Z"
            fill={pinFill}
          />
        </svg>
      </div>

      {/* Swiggy Wordmark */}
      {withText && (
        <span className={`font-black tracking-tighter leading-none ${textSizes[size]} ${textColor} font-sans`}>
          Swiggy
        </span>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="group inline-flex items-center">
        {LogoContent}
      </Link>
    );
  }

  return LogoContent;
};

export default SwiggyLogo;
