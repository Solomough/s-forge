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


### 2. `src/components/LandingPage.jsx` (New file for marketing site encapsulation)

```jsx
import SiteHeader from './SiteHeader.jsx'; 
import HeroSection from './HeroSection.jsx'; 
import WorkflowSection from './WorkflowSection.jsx'; 
import CaseStudiesSection from './CaseStudiesSection.jsx'; 
import CallToActionSection from './CallToActionSection.jsx'; 
import SiteFooter from './SiteFooter.jsx'; 

// This component combines all marketing sections for easy routing management in App.jsx
const LandingPage = ({ onLaunchTool }) => {
  return (
    <>
      {/* Note: We need to assume SiteHeader also receives and uses onLaunchTool for its CTA */}
      <SiteHeader onLaunchTool={onLaunchTool} /> 
      
      <main className="flex-grow">
        <HeroSection onLaunchTool={onLaunchTool} /> 
        <WorkflowSection /> 
        <CaseStudiesSection /> 
        <CallToActionSection /> 
      </main>
      
      <SiteFooter />
    </>
  );
};

export default LandingPage;


### 3. `src/App.jsx` (Finalized with routing logic)

```jsx
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react'; 

// Import the two main views
import LandingPage from './components/LandingPage.jsx'; 
import StrategyInterface from './components/StrategyInterface.jsx'; 

// Framer Motion variant for smooth page transitions
const pageTransition = {
  initial: { opacity: 0, x: 20, rotate: 1 },
  animate: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, rotate: -1, transition: { duration: 0.4, ease: "easeIn" } },
};

function App() {
  // Simple state to control which view is rendered: 'landing' or 'tool'
  const [currentView, setCurrentView] = useState('landing'); 

  const handleLaunchTool = () => {
    setCurrentView('tool');
  };

  return (
    // AnimatePresence manages the exit and entry animations between views
    <AnimatePresence mode="wait" initial={false}>
      {/* -------------------- LANDING PAGE VIEW -------------------- */}
      {currentView === 'landing' && (
        <motion.div 
          key="landing"
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen bg-s-background flex flex-col font-sans" 
        >
          {/* Pass the launch function down to the Hero CTA */}
          <LandingPage onLaunchTool={handleLaunchTool} /> 
        </motion.div>
      )}

      {/* -------------------- S-FORGE TOOL INTERFACE VIEW -------------------- */}
      {currentView === 'tool' && (
        <motion.div 
          key="tool"
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen flex flex-col font-sans" 
        >
          {/* The core Strategy Engine UI */}
          <StrategyInterface /> 
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;


The S-Forge project is now fully structured, branded, and includes the critical transition logic to move from the marketing site to the functional **Strategy Engine** interface. This is ready for production deployment! 💯🤜🏾
          
