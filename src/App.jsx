import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

// Import all required views/interfaces
import LandingPage from './components/LandingPage.jsx'; 
import StrategyInterface from './components/StrategyInterface.jsx'; 
import BuildEngineDetails from './components/BuildEngineDetails.jsx'; // Placeholder for Build Engine
import MarketEngineDetails from './components/MarketEngineDetails.jsx'; // Placeholder for Market Engine
import ProjectsHistory from './components/ProjectsHistory.jsx'; // Placeholder for Projects History

// Framer Motion variant for smooth page transitions
const pageTransition = {
  initial: { opacity: 0, x: 20, rotate: 1 },
  animate: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, rotate: -1, transition: { duration: 0.4, ease: "easeIn" } },
};

function App() {
  // State controls which view is rendered: 
  // 'landing', 'strategy-tool', 'build-details', 'market-details', 'projects-history'
  const [currentView, setCurrentView] = useState('landing'); 

  // 1. Handler to launch the Strategy Tool (used by Hero CTA and Header/Menu)
  const handleLaunchTool = () => {
    setCurrentView('strategy-tool');
  };
  
  // 2. Handler for generic internal navigation (used by Header/Menu and Workflow CTAs)
  const handleViewEngine = (engineKey) => {
    setCurrentView(engineKey);
  };
  
  // 3. Handler to return to the landing page (used by internal detail pages)
  const handleReturnToLanding = () => {
    setCurrentView('landing');
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      
      {/* 1. Marketing Landing Page View (Root Router) */}
      {currentView === 'landing' && (
        <motion.div 
          key="landing"
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen bg-s-background flex flex-col font-sans" 
        >
          <LandingPage 
            onLaunchTool={handleLaunchTool} 
            onViewEngine={handleViewEngine} 
          /> 
        </motion.div>
      )}

      {/* 2. S-Forge Strategy Tool Interface View */}
      {currentView === 'strategy-tool' && (
        <motion.div 
          key="strategy-tool" 
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen flex flex-col font-sans" 
        >
          <StrategyInterface 
             onReturnToLanding={handleReturnToLanding} 
             onViewEngine={handleViewEngine} // Critical for navigating to Build Engine
          /> 
        </motion.div>
      )}
      
      {/* 3. Build Engine Details View */}
      {currentView === 'build-details' && (
        <motion.div 
          key="build"
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen flex flex-col font-sans" 
        >
          <BuildEngineDetails onReturnToLanding={handleReturnToLanding} onViewEngine={handleViewEngine} /> 
        </motion.div>
      )}
      
      {/* 4. Market Engine Details View */}
      {currentView === 'market-details' && (
        <motion.div 
          key="market"
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen flex flex-col font-sans" 
        >
          <MarketEngineDetails onReturnToLanding={handleReturnToLanding} onViewEngine={handleViewEngine} /> 
        </motion.div>
      )}
      
      {/* 5. Projects History View */}
      {currentView === 'projects-history' && (
        <motion.div 
          key="history"
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen flex flex-col font-sans" 
        >
          <ProjectsHistory onReturnToLanding={handleReturnToLanding} onViewEngine={handleViewEngine} /> 
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
