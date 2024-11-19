/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        canva: "url('/src/assets/image.png')",
        hero:"url('/src/assets/animated-soil.gif')"
      },
      fontFamily: {
        plus: ['Plus Jakarta Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}