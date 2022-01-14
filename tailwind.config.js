module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  media: false,
  theme: {
    extend: {
      colors:{
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921"
        }
      },
      animation:{
        bounce: "bounce 1s ease-in-out"
      }
    },
  },
  variants:{
    extend: {}
  },
  plugins: [require('@tailwindcss/line-clamp')],
}

