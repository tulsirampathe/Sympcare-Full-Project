/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary':'#5F6FFF',
        'ayurvedic-green': '#1A5653',
        'ayurvedic-darkgreen': '#123A38',
        'ayurvedic-gold': '#C89B41',
        'ayurvedic-darkgold': '#A87D35',
        'ayurvedic-sand': '#F5E6D3'
      }
    },
  },
  plugins: [],
}