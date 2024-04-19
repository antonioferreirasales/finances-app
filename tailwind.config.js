/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'gray': {
          200: '#C4C4CC',
          900: '#121214'
        },
        'green': {
          500: '#015F43'
        }
      }
    },
  },
  plugins: [],
}

