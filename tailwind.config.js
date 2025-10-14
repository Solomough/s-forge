/** @type {import('tailwindcss').Config} */
export default {
  // Directs Tailwind to scan all React and JavaScript files for class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Defines custom design tokens (optional, but good practice for a brand-focused tool)
    extend: {
      colors: {
        // Placeholder custom color—S-Forge will fill this with brand colors from Stage 1
        'primary-brand': '#0066FF', // Example of a strong blue
        'secondary-accent': '#FFD700', // Example of a gold/yellow accent
      },
      fontFamily: {
        // Placeholder custom font—S-Forge will recommend based on project strategy
        sans: ['Inter', 'sans-serif'], 
        serif: ['Merriweather', 'serif'],
      },
      // You can add more customizations here (e.g., custom animations, shadows)
    },
  },
  plugins: [],
}
