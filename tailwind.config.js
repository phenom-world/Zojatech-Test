/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F6B89",
        grey: { 600: "#F7F7F7", 500: "#8B8BA4" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
