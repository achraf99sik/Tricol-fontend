/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // The Dark Void Background
        dark: {
          900: "#050505",
          800: "#0a0a0f",
          700: "#141419",
        },
        // High-Energy Accents
        neon: {
          cyan: "#00f3ff",
          purple: "#bc13fe",
          green: "#0aff0a",
          red: "#ff0a3b",
        },
        // Glass Panel Background
        glass: "rgba(20, 20, 25, 0.6)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"], // For Headers/Data Values
      },
      boxShadow: {
        "glow-cyan": "0 0 15px rgba(0, 243, 255, 0.3)",
        "glow-purple": "0 0 15px rgba(188, 19, 254, 0.3)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
