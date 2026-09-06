/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          900: "#0b1f3a",
          800: "#132a4d",
          700: "#1e3a5f",
        },
      },
    },
  },
  plugins: [],
}
