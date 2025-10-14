/** @type {import('tailwindcss').Config} */
export default {
  // ... (content remains the same)
  theme: {
    // Defines custom design tokens
    extend: {
      colors: {
        // OFFICIAL S-FORGE BRAND COLORS
        's-primary': '#000000',     // Black (Sophistication, Foundation)
        's-accent': '#FFD700',      // Gold (Prestige, Excellence)
        's-background': '#FFFFFF',  // White (Simplicity, Contrast)
        's-text': '#000000',        // Default text color
      },
      fontFamily: {
        // Using Inter as a high-quality, modern sans-serif font
        sans: ['Inter', 'sans-serif'], 
      },
      // ... (other extensions)
    },
  },
  plugins: [],
}
