/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        '13/24': '54.166666%',
        '7/24': '29.166666%',
        '17/24': '70.833333%',
      },
    },
    fontFamily: {
      helvetica: ['Helvetica Neue'],
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('flowbite/plugin')],
};
