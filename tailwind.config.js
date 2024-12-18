/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      opensans: ['"Open Sans"'],
      georama: ["Georama"],
      geologica: ["Geologica"],
      poppins: ["Poppins", "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
      rubik: ["Rubik", "sans-serif"],
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false,
    darkTheme: "white",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
    themeRoot: ":root",
  },
};
