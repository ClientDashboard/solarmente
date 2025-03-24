/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'solarmente-button': '#FF371E',
        'solarmente-title': '#060100',
        'solarmente-text': '#323131',
        'solarmente-darkgray': '#3F4445',
        'solarmente-orange': '#FF671F',
      },
    },
  },
  plugins: [],
}
