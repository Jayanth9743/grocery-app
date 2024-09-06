/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        xs:"480px",
        mdx:"840px",
        sxs:"375px",
        sxx:"392px",
        xss:"400px",
        xsl:"599px",
      },
      height:{
        100:"30rem"
      },
      colors:{
        "green-1000":"#399918",
        "green-900":"#3BB67D",
        "c1":"#FEEFEA",
        "c2":"#FFF3FF",
        "c3":"#F2FCE4",
        "c4":"#ECFFEC",
        "c5":"#FFFCEB",

      },
      borderRadius:{
        "5xl":"2rem"
      },
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(30rem, 1fr))',
      },
    },
  },
  plugins: [],
}

