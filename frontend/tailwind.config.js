/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Use aspas para garantir que o nome seja lido corretamente
        "primary": "#f59f0a", 
        "secondary": "#3b82f6",
        "background-light": "#f8f7f5",
        "background-dark": "#0b0e14",
        "card-dark": "#1a1f26",
        "accent-blue": "#38bdf8",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
}