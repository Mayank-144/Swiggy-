/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        swiggy: {
          orange: '#FC8019',
          orangeDark: '#E66800',
          orangeLight: '#FFF4EB',
          orangeGlow: '#FF9436',
          dark: '#02060C',
          darkMuted: '#282C3F',
          gray: '#686B78',
          grayLight: '#93959F',
          border: '#E2E8F0',
          bgLight: '#F7F7F9',
          green: '#1BA672',
          greenDark: '#138055',
          greenLight: '#E8F6F1',
          red: '#E43B4F',
          redLight: '#FDF0F1',
          yellow: '#F5A623',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif']
      },
      boxShadow: {
        'swiggy': '0 15px 40px -10px rgba(40,44,63,.15)',
        'swiggy-sm': '0 4px 20px -2px rgba(40,44,63,.08)',
        'swiggy-card': '0 8px 24px rgba(149, 157, 165, 0.15)',
        'swiggy-hover': '0 14px 28px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.06)',
        'glow-orange': '0 0 25px rgba(252, 128, 25, 0.35)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
        'bounce-light': 'bounceLight 1s infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        bounceLight: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
