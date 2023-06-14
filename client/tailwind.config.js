/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '13p': '13px',
        '11p': '11px',
      },
      colors: {
        inactive: '#525960',
        acitve: '#0c0D0E',
      },
    },
  },
  plugins: [],
};
