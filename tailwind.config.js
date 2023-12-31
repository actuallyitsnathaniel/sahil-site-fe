/*eslint-env node*/
/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      orange: colors.orange,
      yellow: colors.yellow,
      purple: colors.purple,
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      emerald: colors.emerald,
      cyan: colors.cyan,
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "logo-left": {
          "0%": { opacity: 0, transform: "translateX(40%)" },
          "100%": { opacity: 1, transform: "translateX(0%)" },
        },
        "logo-middle": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "logo-right": {
          "0%": { opacity: 0, transform: "translateX(-40%)" },
          "100%": { opacity: 1, transform: "translateX(0%)" },
        },
        "appear-slow": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        gradient: {
          "0%, 100%": {
            transform: "translateX(0%)",
          },
          "50%": {
            transform: "translateX(-50%)",
          },
        },
      },
      animation: {
        "fade-in-left": "logo-left 0.75s ease-in-out",
        "fade-in-middle": "logo-middle 0.3s ease-in-out",
        "fade-in-right": "logo-right 0.65s ease-in-out",
        "appear-slow": "appear-slow 0.9s ease-in-out 0.35s both",
        gradient: "gradient 6s ease-in-out infinite",
        "mobile-menu-span":
          "transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0), background 0.5s cubic-bezier(0.77,0.2,0.05,1.0), opacity 0.55s ease",
      },
    },
  },
  plugins: [require("tailwind-clip-path")],
};
