const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: colors.white,
      black: colors.black,
      red: '#DA3025',
      main: '#000F6F',
      secondary: '#76FAA1',
      'blue': {
        light: '#BFD1FF',
        DEFAULT: '#5881F2',
        dark: '#608CFE',
      },
    },
    extend: {},
  },
  plugins: [],
}
