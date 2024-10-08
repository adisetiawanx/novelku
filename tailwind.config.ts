/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "576px",
        md: "768px",
        lg: "1024px",
        xl: "1148px",
      },
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
    },
    fontFamily: {
      body: "Poppins",
      display: "Poppins",
    },
    extend: {
      colors: {
        primary: "#4063b2",
        "primary-hover": "#30529f",
        "primary-dark": "#383838",
        "primary-light": "#f5f5f5",
        "primary-darker": "#121212",
      },
      aspectRatio: {
        "6/9": "6 / 9",
      },
    },
  },
  plugins: [],
};
