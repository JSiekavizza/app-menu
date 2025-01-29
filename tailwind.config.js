/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        h2: ["Rum Raisin", "serif"],
      },
      fontWeight: {
        h2: ["400"],
      },
    },
  },
  plugins: [],
};
