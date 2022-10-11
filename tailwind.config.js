/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F6B89",
        grey: { 600: "#F7F7F7", 500: "#8B8BA4" },
        green: "#6FA7B4;",
      },
      backgroundImage: (theme) => ({
        "hero-pattern": "url('/public/static/images/HeroImage.png')",
        filter: "linear-gradient(180deg, rgba(0, 35, 125, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%)",
      }),

      keyframes: {
        "ltr-linear-infinite": {
          // from: { "background-position": "0 0" },
          // to: { "background-position": "400% 0%" },
        },
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(-120%)",
            transform: "translateX(-120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
        "slide-out": {
          "0%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
          "100%": {
            "-webkit-transform": "translateX(-120%)",
            transform: "translateX(-120%)",
          },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "25% ": {
            opacity: 0,
          },
          "50%": {
            opacity: 0,
          },
          "75%": {
            opacity: 0,
          },
          "100% ": { opacity: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100% ": { opacity: 1 },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s forwards",
        "slide-out": "slide-out 0.5s forwards",
        "fade-in": "fade-in 2s forwards ",
        "fade-out": "fade-out 2s forwards ",
        "ltr-linear-infinite": "ltr-linear-infinite 10s linear infinite",
      },
    },
  },
  plugins: [],
};
