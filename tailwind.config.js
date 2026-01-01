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
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        slideInFromTop: 'slideInFromTop 0.5s ease-out forwards',
        'bounce-in': 'bounceIn 0.4s ease-out',
      },
    },
  },
  plugins: [],
};
