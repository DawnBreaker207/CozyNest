/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Spectral: ['Spectral', 'sans-serif'],
        // Ađ new custom font
        custom: ['CustomFont', 'sans-serif'],
      }
    }
  },

  plugins: []
}

