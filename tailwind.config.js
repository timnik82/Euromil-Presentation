/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideInFromTop: {
          'from': { transform: 'translateY(-120%)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideInFromTop: 'slideInFromTop 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};
