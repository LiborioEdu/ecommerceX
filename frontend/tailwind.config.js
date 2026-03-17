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
        "primary": "#f59e0b", 
        "background-dark": "#0b0e14",
        "card-dark": "#1a1f26",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
}