/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'imdb': {
          'yellow': '#F5C518',
          'blue': '#5799EF',
          'dark': '#121212',
          'light': '#F5F5F5',
          'gray': {
            100: '#F5F5F5',
            200: '#E5E5E5',
            300: '#D4D4D4',
            400: '#A3A3A3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          }
        }
      },
      fontFamily: {
        sans: ['Amazon Ember', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'imdb-xs': ['0.75rem', { lineHeight: '1rem' }],
        'imdb-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'imdb-base': ['1rem', { lineHeight: '1.5rem' }],
        'imdb-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'imdb-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'imdb-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'imdb-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'imdb-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      boxShadow: {
        'imdb': '0 2px 8px rgba(0,0,0,0.1)',
        'imdb-lg': '0 4px 12px rgba(0,0,0,0.15)',
      },
      borderRadius: {
        'imdb': '4px',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 