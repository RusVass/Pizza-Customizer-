/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', '"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif']
      },
      colors: {
        canvas: {
          light: '#f8f5f1',
          dark: '#0f1216'
        },
        ink: {
          light: '#1c1f26',
          dark: '#eef2f6'
        },
        accent: {
          light: '#ff6b35',
          dark: '#ff9f1c'
        },
        surface: {
          light: '#ffffff',
          dark: '#171b22'
        }
      },
      boxShadow: {
        soft: '0 20px 60px -40px rgba(0,0,0,0.45)'
      }
    }
  },
  plugins: []
}
