/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 40px rgba(249, 115, 22, 0.12)',
      },
      backgroundImage: {
        birthday: "radial-gradient(circle at top, rgba(249, 115, 22, 0.15), transparent 40%), radial-gradient(circle at right, rgba(149, 76, 233, 0.12), transparent 35%)",
      },
    },
  },
  plugins: [],
};
