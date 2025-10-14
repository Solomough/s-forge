import { AnimatePresence, motion } from 'framer-motion';
import SiteHeader from './components/SiteHeader.jsx'; 
import HeroSection from './components/HeroSection.jsx'; 
import WorkflowSection from './components/WorkflowSection.jsx'; 
import CaseStudiesSection from './components/CaseStudiesSection.jsx'; 
import CallToActionSection from './components/CallToActionSection.jsx'; // Import the new CTA component

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
          <WorkflowSection /> 
          <CaseStudiesSection /> 
          <CallToActionSection /> {/* The final, high-impact CTA */}
        </main>
        
        {/* 3. Footer will go here */}
        
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
