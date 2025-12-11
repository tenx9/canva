/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#6FBF73',
          'dark-green': '#4A9A4D',
        },
        gray: {
          'light': '#F5F5F5',
        },
        text: {
          dark: '#2D3748',
          light: '#718096',
        },
        border: '#E2E8F0',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
