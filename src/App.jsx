import { AnimatePresence, motion } from 'framer-motion';
import SiteHeader from './components/SiteHeader.jsx'; 
import HeroSection from './components/HeroSection.jsx'; // Import the new Hero component
// We can now remove PlaceholderFooter import entirely since we'll build a branded one later

// Framer Motion variant for smooth page transitions (keeping this for potential routing later)
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

function App() {
  const currentPage = 'home'; 

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={currentPage} 
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        // Ensure the main container adheres to the brand background color
        className="min-h-screen bg-s-background flex flex-col font-sans" 
      >
        {/* 1. The Fixed Header */}
        <SiteHeader /> 
        
        {/* 2. Main Content Area */}
        <main className="flex-grow">
          <HeroSection /> {/* The high-impact, branded Hero */}
          {/* All subsequent sections will follow here (Strategy, Build, Market, etc.) */}
        </main>
        
        {/* We will build the final branded footer here next */}
        
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
        
