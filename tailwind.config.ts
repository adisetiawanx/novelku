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
        xl: "1280px",
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
        "primary-dark": "#333333",
      },
    },
  },
  plugins: [],
};
