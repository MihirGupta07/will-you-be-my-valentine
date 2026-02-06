import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pastel Pink Palette
        valentine: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
        },
        // Accent colors
        rose: {
          400: "#fb7185",
          500: "#f43f5e",
        },
        cream: "#fff5f7",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        handwriting: ["var(--font-caveat)", "cursive"],
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "float-slow": "float 4s ease-in-out infinite",
        "float-slower": "float 5s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "bounce-soft": "bounce-soft 1s ease-in-out infinite",
        "wiggle": "wiggle 0.5s ease-in-out infinite",
        "pop-in": "pop-in 0.3s ease-out forwards",
        "confetti": "confetti 1s ease-out forwards",
        "heart-beat": "heart-beat 1.2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        confetti: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(-100vh) rotate(720deg)", opacity: "0" },
        },
        "heart-beat": {
          "0%, 100%": { transform: "scale(1)" },
          "10%, 30%": { transform: "scale(1.1)" },
          "20%": { transform: "scale(1.2)" },
          "40%": { transform: "scale(1)" },
        },
      },
      boxShadow: {
        "valentine": "0 4px 14px rgba(236, 72, 153, 0.25)",
        "valentine-lg": "0 8px 25px rgba(236, 72, 153, 0.35)",
        "valentine-glow": "0 0 20px rgba(236, 72, 153, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
