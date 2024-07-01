/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#373737',
        'yellow': '#FFCB05',
        'gray': '#FAFAFA',
        'red': '#FF6F61',
        'darkgray': '#666666'
      },
      boxShadow: {
        'card': '0 0px 15px 0px rgba(0, 0, 0, 0.06)',
        'navbar': '0 4px 10px 0px rgba(0, 0, 0, 0.04)',
        'list': '0 0px 10px 0px rgba(0, 0, 0, 0.04)',
      },
      fontFamily: {
        inter: ['Inter']
      }
    },
    fontSize: {
      xss: ['12px', '16px'],
      xs: ['12px', '18px'],
      sm: ['14px', '14px'],
      hd: ['14px', '18px'],
      btn: ['14px', '22px'],
      base: ['16px', '18px'],
      lg: ['18px', '22px'],
      xl: ['24px', '32px'],
    }
  },
  plugins: [],
}

