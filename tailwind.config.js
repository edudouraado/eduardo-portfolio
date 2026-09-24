/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepBlue: '#0A192F',
        glassBlue: 'rgba(17, 34, 64, 0.7)',
        neonBlue: '#64ffda'
      }
    },
  },
  plugins: [],
}