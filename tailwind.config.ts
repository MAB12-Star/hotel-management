import type { Config } from 'tailwindcss'
const {fontFamily}= require("tailwindcss/defaultTheme")
const config: Config = {
  darkMode:"class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        colors: {
          primary: "#038c75",
          secondary:"#F2c641",
          tertiary:{
            dark:"#f27405",
            light:"#f2c641",
          },
        },
        fontFamily:{
          poppins:['var(--font-poppins)',...fontFamily.sans]
        }
     },
  },
  plugins: [],
}
export default config
