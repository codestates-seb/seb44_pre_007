/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        btn: '0px 1px 0px 0px inset #ffffff66',
        input: '0px 0px 5px #9ca3af',
      },
      colors: {
        blackDark: '#232629',
        blacklight: '#6a737c',
        black300: '#9FA6AD',
        black600: '#525960',
        black900: '#0c0D0E',
        brgray: '#e3e6e8',
        main: '#F48225',
        bubg: '#0A95FF',
        nickname: '#0074cc',
      },
    },
  },
  plugins: [],
};
