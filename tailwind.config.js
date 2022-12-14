/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
    
      fontFamily: {
        body: ["Source Serif Pro", ...defaultTheme.fontFamily.serif],
        header: ["Source Serif Pro", ...defaultTheme.fontFamily.serif],
      }
    }
  }
}