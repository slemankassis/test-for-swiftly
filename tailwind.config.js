/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#252525",
        "gray-500": "#B1B1B1",
        "gray-300": "#E5E5E5",
        "blue-600": "#2564C5",
      },
      borderRadius: {
        DEFAULT: "3px",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        base: "18px",
        xl: "24px",
      },
      fontWeight: {
        normal: 400,
      },
    },
  },
  plugins: [],
};
