/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teletext: {
          black: '#000000',
          white: '#FFFFFF',
          red: '#FF0000',
          green: '#00FF00',
          yellow: '#FFFF00',
          blue: '#0000FF',
          magenta: '#FF00FF',
          cyan: '#00FFFF',
        }
      },
      fontFamily: {
        teletext: ['VT323', 'monospace'],
      }
    },
  },
  plugins: [],
}
