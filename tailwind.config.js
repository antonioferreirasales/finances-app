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
        },
        'fuchsia': {
          50: '#eceeff',
          100: '#dde0ff',
          200: '#c2c5ff',
          300: '#9c9eff',
          400: '#7e75ff',
          500: '#674fff',
          600: '#5f36f5',
          700: '#522ad8',
          800: '#4325ae',
          900: '#392689',
          950: '#231650',
        },  
      }
    },
  },
  plugins: [],
}

