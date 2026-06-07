/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          500: '#1e3a5f',
          600: '#162d4a',
          700: '#0f1f35',
          800: '#0a1628',
          900: '#050d1a',
        },
        gold: {
          400: '#f5c842',
          500: '#d4a017',
          600: '#b8860b',
        }
      }
    },
  },
  plugins: [],
}