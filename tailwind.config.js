/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', "serif"],
        mono: ['"DM Mono"', "monospace"],
      },
      colors: {
        emerald: {
          DEFAULT: "#0b3d2e",
          mid: "#145c42",
          soft: "#1d7a58",
          pale: "#edf5f0",
          border: "#c2d9cc",
        },
        gold: {
          DEFAULT: "#a07c20",
          light: "#c49a32",
          pale: "#faf3e0",
          border: "#d4b86a",
        },
        cream: {
          DEFAULT: "#fdfcf8",
          2: "#f7f4ed",
          3: "#efeae0",
        },
        ink: {
          DEFAULT: "#16130e",
          2: "#4a4438",
          3: "#928c82",
        },
        rule: "#e2ddd2",
      },
    },
  },
  plugins: [],
};
