import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0f5d7f",
          light: "#4a90a0",
          dark: "#0b455e"
        }
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;

