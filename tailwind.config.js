/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "rotate(-3deg)",
          },
          "50%": {
            transform: "rotate(3deg)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
    patterns: {
      opacities: {
        100: "1",
        80: ".80",
        60: ".60",
        40: ".40",
        20: ".20",
        10: ".10",
        5: ".05",
        4: ".04",
        3: ".03",
        2: ".02",
      },
      sizes: {
        1: "0.25rem",
        2: "0.5rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-bg-patterns")],
  // daisyUI config (optional)
  themes: ["light", "dark", "corporate", "winter"],
};
