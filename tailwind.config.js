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
          navy: '#0b1f3d',
          navyLight: '#142c54',
          blue: '#0263e0',
          blueHover: '#024ebb',
          emerald: '#0ca678',
          emeraldBg: '#e6fcf5',
          amber: '#f59f00',
          amberBg: '#fff9db',
          grayBg: '#f4f6fa',
          surface: '#ffffff',
          border: '#e2e8f0',
        },
      },
    },
  },
  plugins: [],
}
