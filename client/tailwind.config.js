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
        blackDark: '#232629',
        blacklight: '#6a737c',
        black300: '#9FA6AD',
        black600: '#525960',
        black900: '#0c0D0E',
        brgray: '#e3e6e8',
        main: '#F48225',
        bubg: '#0A95FF',
        Link: '#0074cc',
        nickname: '#0074cc',
        users000: '#F1F2F3',
        primaryBlue: '#0995FF',
        darkBlue: '#0074CC',
        lightBlue: '#F4F8FB',
        hoverBlue: '#E1ECF4',
        buttonHover: '#F8F9F9',
        buttonBorer: 'rgb(214, 217, 220)',
        footerTitle: '#BABFC4',
        footerText: '#9199A1',
      },
    },
  },
  plugins: [],
};
