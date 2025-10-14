/** @type {import('tailwindcss').Config} */
export default {
  // CRITICAL: Ensure 'content' covers all file types in your 'src' directory
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // S-Forge Brand Colors
        's-primary': '#0D0D0D',   // Near Black for backgrounds and main text
        's-accent': '#FFD700',    // Gold for highlights and CTAs
        's-background': '#FFFFFF', // Clean White for contrasting sections/text
      },
    },
  },
  plugins: [],
}
