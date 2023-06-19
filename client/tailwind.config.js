/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      bp1: { max: '640px' },
      bp2: { max: '817px' },
      bp3: { max: '980px' },
    },
    extend: {
      boxShadow: {
        btn: '0px 1px 0px 0px inset #ffffff66',
        input: '0px 0px 0px 4px #E1ECF8',
        error: '0px 0px 0px 4px #F7E4E4',
        btnActive: '0px 0px 0px 4px #DEE0E0',
      },
      colors: {
        blacklight: '#6a737c',
        black300: '#9FA6AD',
        black600: '#525960',
        black900: '#0c0D0E',
        main: '#F48225',
        users000: '#F1F2F3',
        primaryBlue: '#0995FF',
        darkBlue: '#0074CC',
        buttonHover: '#F8F9F9',
        buttonBorer: 'rgb(214, 217, 220)',
      },
    },
  },
  plugins: [],
};
