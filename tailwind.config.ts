import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0D",
        section: "#131417",
        foreground: "#F2EEE9",
        card: "#1B1C20",
        secondary: "rgba(242,238,233,0.72)",
        accent: "#1B1C20",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        mona: ["var(--font-mona)", "sans-serif"],
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "border-spin": "border-spin 4s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "border-spin": {
          "0%": { "--angle": "0deg" },
          "100%": { "--angle": "360deg" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
