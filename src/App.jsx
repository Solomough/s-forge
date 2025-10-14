import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

// Import the two main views - LandingPage replaces all the previous section imports
import LandingPage from './components/LandingPage.jsx'; 
import StrategyInterface from './components/StrategyInterface.jsx'; 

// Framer Motion variant for smooth page transitions
const pageTransition = {
  initial: { opacity: 0, x: 20, rotate: 1 },
  animate: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, rotate: -1, transition: { duration: 0.4, ease: "easeIn" } },
};

function App() {
  // Simple state to control which view is rendered
  const [currentView, setCurrentView] = useState('landing'); 

  // Function passed down to the LandingPage to trigger the view switch
  const handleLaunchTool = () => {
    setCurrentView('tool');
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {/* View 1: Marketing Landing Page */}
      {currentView === 'landing' && (
        <motion.div 
          key="landing"
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen bg-s-background flex flex-col font-sans" 
        >
          {/* LandingPage component renders all marketing sections */}
          <LandingPage onLaunchTool={handleLaunchTool} /> 
        </motion.div>
      )}

      {/* View 2: S-Forge Strategy Tool Interface */}
      {currentView === 'tool' && (
        <motion.div 
          key="tool"
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen flex flex-col font-sans" 
        >
          <StrategyInterface /> 
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
