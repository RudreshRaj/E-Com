import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./Sections/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    // fontSize: {
    //   xs: ["12px", "16px"],
    //   sm: ["14px", "20px"],
    //   base: ["16px", "19.5px"],
    //   lg: ["18px", "21.94px"],
    //   xl: ["20px", "24.38px"],
    //   "2xl": ["24px", "29.26px"],
    //   "3xl": ["28px", "50px"],
    //   "4xl": ["48px", "58px"],
    //   "8xl": ["96px", "106px"],
    // },
    extend: {
      colors: {
        primary: "#FF5A1F",
        secondary: "#f42c37",
        brandYellow: "#fdc62e",
        brandGreen: "#2dcc6f",
        brandBlue: "#1376f4",
        brandWhite: "#eeeeee",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "0.1rem",
        },
      },
    },
  },
  plugins: [],
};
export default config;
