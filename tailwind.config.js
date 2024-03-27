/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        10:'10px',
      },
      width: {
        100: "100%",
        400: "400px",
      },
      height: {
        '80v': "80vh",
      },
      colors: {
        grey: {
          100: '#ccc',
          200: '#f0f0f0',
          300:'#afacac'
        },
        blue: {
          100:'#e6f7ff'
        },
        'yellowGreen': 'yellowGreen',
      },
    },
  },
  plugins: [],
};
