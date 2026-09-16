/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bmf: {
          bg: '#0a1930',
          sidebar: '#0b1e3d',
          orange: '#FE8405',
          blueDark: '#1E4D8C',
          blueDeep: '#1B3A6B',
          card: '#12294d',
        },
      },
    },
  },
  plugins: [],
}
