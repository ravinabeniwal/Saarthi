import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050a17",
          900: "#0a1128",
          800: "#0f1b3a",
          700: "#162752",
        },
        cyan: {
          400: "#3fe0d0",
          500: "#22c7bd",
          600: "#0fa8a0",
        },
        mist: "#c9d3ef",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(63, 224, 208, 0.35)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 20% 20%, rgba(63,224,208,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(63,224,208,0.06), transparent 35%)",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulseSlow: "pulseSlow 2.4s ease-in-out infinite",
        rise: "rise 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
