/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Spectral: ['Spectral', 'sans-serif'],
        custom: ['CustomFont', 'sans-serif'],
      },
      colors: {
        customBlue: 'rgba(58, 91, 255, 0.15)',
        customWarning: 'rgba(245, 126, 119, 0.12)',
        customYellow: 'rgba(255, 204, 145, 0.20)',
      },
      boxShadow: {
        shadowUser: '0px 4px 30px 0px rgba(46, 45, 116, 0.05)',
      }
    },
  },
  plugins: []
}
