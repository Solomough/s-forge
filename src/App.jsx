import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// S-Forge Note: Placeholder component imports.
// In a full S-Forge output, these would be the core pages defined in the Strategy Stage.
import PlaceholderHero from './components/PlaceholderHero.jsx';
import PlaceholderFooter from './components/PlaceholderFooter.jsx';

// Framer Motion variant for smooth page transitions
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

function App() {
  // Simple state to simulate rendering different "pages" or content blocks
  const [currentPage, setCurrentPage] = useState('home');

  return (
    // AnimatePresence is essential for exit animations (when components are removed from the DOM)
    <AnimatePresence mode="wait">
      <motion.div 
        key={currentPage} // Framer Motion uses a unique key for animation detection
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen bg-gray-50 flex flex-col font-sans" 
        // Tailwind classes establish the base look and feel
      >
        {/* S-Forge Note: Navigation and Layout components would wrap the main content */}
        
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Content determined by the current state/route */}
          {currentPage === 'home' && (
            <PlaceholderHero onNavigate={() => setCurrentPage('about')} />
          )}
          {currentPage === 'about' && (
            <motion.div variants={pageTransition}>
              <h1 className="text-4xl font-bold text-primary-brand mb-4">About Us</h1>
              <p className="text-lg">This is the placeholder content for the About page. Excellence in modular design begins here.</p>
              <button 
                onClick={() => setCurrentPage('home')}
                className="mt-6 px-6 py-2 bg-secondary-accent text-white rounded-lg shadow-lg hover:bg-opacity-90 transition"
              >
                Go Back Home
              </button>
            </motion.div>
          )}
        </main>
        
        <PlaceholderFooter />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
        
