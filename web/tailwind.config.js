module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        primary: "#15B5B0",
        "primary-hover": "#10c4be",
      },
      boxShadow: {
        recipe: "0px 0px 10px 7.5px rgba(0,0,0,0.075)",
      },
    },
  },
  plugins: [],
};
