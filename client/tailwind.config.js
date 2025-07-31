/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        edmPurple: '#9b4dff',
        neonGreen: '#ccff33',
        darkBg: '#1a1a2e',
        neonYellow: '#f7ff00',  // <== this is what enables `text-neonYellow`
      },
    },
  },
  plugins: [],
}

