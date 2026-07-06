/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./services/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gwa: {
          dark: '#0D1117',
          card: '#131B2E',
          border: '#1E293B',
          accent: '#E98C8C',
          red: '#E53E3E',
          live: '#FF3B30',
          muted: '#8FA0BA',
        }
      }
    },
  },
  plugins: [],
};