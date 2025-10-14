import { AnimatePresence, motion } from 'framer-motion';
import SiteHeader from './components/SiteHeader.jsx'; 
import HeroSection from './components/HeroSection.jsx'; 
import WorkflowSection from './components/WorkflowSection.jsx'; // Import the new Workflow component

// Framer Motion variant for smooth page transitions
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
        className="min-h-screen bg-s-background flex flex-col font-sans" 
      >
        {/* 1. The Fixed Header */}
        <SiteHeader /> 
        
        {/* 2. Main Content Area */}
        <main className="flex-grow">
          <HeroSection /> 
          <WorkflowSection /> {/* The clear, three-stage workflow */}
          {/* All subsequent sections will follow here */}
        </main>
        
        {/* We will build the final branded footer here next */}
        
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
