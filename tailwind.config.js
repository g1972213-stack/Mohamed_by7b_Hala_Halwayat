/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#030303',
          midnight: '#070b19',
          purple: '#12072B',
          silver: '#E2E8F0',
          rose: '#FDA4AF',
          lavender: '#E9D5FF'
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      },
      letterSpacing: {
        luxury: '0.25em',
        cinematic: '0.4em'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        }
      },
      boxShadow: {
        'luxury-glow': '0 0 40px rgba(253, 164, 175, 0.15)',
        'cosmic-glow': '0 0 50px rgba(233, 213, 255, 0.1)'
      }
    },
  },
  plugins: [],
}