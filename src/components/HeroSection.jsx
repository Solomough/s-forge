import { motion } from 'framer-motion';

// Framer Motion variants for the main container and staggering
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between child animations
    }
  }
};

// Framer Motion variants for text lines and elements
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }
};

// S-Forge Update: Accepts onLaunchTool prop
const HeroSection = ({ onLaunchTool }) => { 
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full overflow-hidden flex items-center justify-center py-24 md:py-36 lg:py-48 min-h-[80vh] bg-s-primary" // Black background for dramatic contrast
    >
      {/* Subtle Futuristic Glow/Pattern in the background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-color-s-accent)_0%,_transparent_50%)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Main Tagline/Headline */}
        <motion.h1 
          className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-6 text-s-background" // White text against black background
        >
          <motion.span 
            variants={itemVariants} 
            className="block"
          >
            From Vision to Reality
          </motion.span>
        </motion.h1>

        {/* Sub-Headline / Core Value Proposition */}
        <motion.p 
          variants={itemVariants}
          className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-300 max-w-4xl mx-auto mb-10"
        >
          Strategy, Build, Market. <span className="text-s-accent font-medium">Your vision + my strategy = excellence.</span>
        </motion.p>
        
        {/* Primary CTA */}
        <motion.div variants={itemVariants}>
          <button 
            // S-Forge Update: Use the passed function to switch the view
            onClick={onLaunchTool} 
            className="px-10 py-4 bg-s-accent text-s-primary font-bold text-lg rounded-full shadow-2xl transition duration-300 
            hover:bg-s-primary hover:text-s-accent border-2 border-s-accent transform hover:scale-[1.05] focus:outline-none focus:ring-4 focus:ring-s-accent focus:ring-opacity-50"
          >
            Launch Strategy Engine Demo
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
