/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-grey': '#474747',
        'davys-grey': '#545454',
        'quick-silver': '#A5A5A5',
        'silver-sand': '#C3C3C3',
        'granite-grey': '#5F5F5F',
        yellow: '#eed30a',
        success: 'var(--el-color-success)',
        error: 'var(--el-color-error)',
      },

      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}

