/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#2a4d69',
        blue: '#4b86b4',
        sky: '#adcbe3',
        mist: '#e7eff6',
        azure: '#63ace5',
      },
      fontFamily: {
        serif: ['"source-serif-pro"', 'serif'],
        ballet: ['"Ballet"', 'cursive'],
        krub: ['"Krub"', 'sans-serif'],
        instrument: ['"Instrument Serif"', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
