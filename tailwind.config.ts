import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapped to CSS variables in globals.css — never hardcode hex in components.
        base: "var(--bg)",
        panel: "var(--bg-elevated)",
        surface: "var(--surface)",
        hairline: "var(--border)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        ink: "var(--text)",
        muted: "var(--text-muted)",
        faint: "var(--text-faint)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.25em",
      },
      boxShadow: {
        glow: "0 0 80px -20px var(--accent-glow)",
        "glow-lg": "0 0 140px -30px var(--accent-glow)",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(120deg, var(--accent), var(--accent-2))",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
