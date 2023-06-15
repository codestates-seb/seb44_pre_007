/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        btn: '0px 1px 0px 0px inset #ffffff66',
      },
      colors: {
        inactive: '#525960',
        acitve: '#0c0D0E',
        main: '#F48225',
        label: '#6a737c',
        black300: '#9FA6AD',
      },
    },
  },
  plugins: [],
};
