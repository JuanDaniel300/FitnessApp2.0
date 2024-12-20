// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/(tabs)/meditate.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        signika: ["Signika-Regular"],
      },
    },
  },
  plugins: [],
};
