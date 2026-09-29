/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#FAF7F1",
        paper: "#FFFFFF",
        line: "#E3DAC7",
        muted: "#6E6659",
        fog: "#1D1A14",
        accent: "#2B44E4",
      },
      fontFamily: {
        serif: ['"Newsreader"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
