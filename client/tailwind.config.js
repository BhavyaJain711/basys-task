/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import { dark } from "@mui/material/styles/createPalette";
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  darkMode: "class",
  safelist: [
    {
      pattern: /bg-(.*)-(.*)/,
      variants: ['hover'],
    },
        ],
  theme: {
    darkMode: "class",
    extend: {
      colors: {
        light: {
          background: '#F5F5F5',
          text: '#333333',
          container: '#EEEEEE',
          heading: '#007BFF',
          navbarBg: '#fff',
          navbarText: '#F5F5F5',
          navbarHover: '#0056b3',
        },
        dark: {
          background: '#1E1E1E',
          text: '#CCCCCC',
          container: '#2A2A2A',
          heading: '#3498DB',
          navbarBg: '#2A2A2A',
          navbarText: '#CCCCCC',
          navbarHover: '#4D4D4D',
        },
      },
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors, flowbite.plugin(),],


};


function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}