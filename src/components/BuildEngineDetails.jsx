import { motion } from 'framer-motion';
import SiteHeader from './SiteHeader.jsx'; 
import { Code, GitBranch, Terminal } from 'lucide-react';

const BuildEngineDetails = ({ onReturnToLanding, onViewEngine }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-s-background flex flex-col">
      {/* SiteHeader for universal navigation */}
      <SiteHeader 
        // Allow the "Start Project" button in the header to take them back to the Strategy tool
        onLaunchTool={() => onViewEngine('strategy-tool')} 
        onViewEngine={onViewEngine} 
      />
      
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center pt-32">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center w-full max-w-5xl"
        >
          <div className="p-12 rounded-2xl bg-s-primary border border-s-accent/30 shadow-2xl">
              <Code className="w-16 h-16 text-s-accent mx-auto mb-6" />
              <h1 className="text-5xl font-black text-s-background mb-4">
                🛠️ Build Engine (Phase 2)
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                The **Professional Software Developer** engine. It receives the *Blueprint* from the Strategy Engine and executes, generating high-quality, modern, file-by-file code based on the latest tech stacks.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                      <h3 className="text-s-accent font-bold mb-2 flex items-center justify-center space-x-2"><Terminal className='w-4 h-4' /> Focus</h3>
                      <p className="text-gray-300 text-sm">Strictly building; no strategic questioning. Only uses input from Strategy.</p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                      <h3 className="text-s-accent font-bold mb-2 flex items-center justify-center space-x-2"><GitBranch className='w-4 h-4' /> Tech Stack</h3>
                      <p className="text-gray-300 text-sm">React/Next.js, Tailwind CSS, Framer Motion, and modern deployment standards.</p>
                  </div>
                   <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                      <h3 className="text-s-accent font-bold mb-2 flex items-center justify-center space-x-2"><Code className='w-4 h-4' /> Output</h3>
                      <p className="text-gray-300 text-sm">Copy/paste code files presented in a canvas format, ready for your GitHub repo.</p>
                  </div>
              </div>

              <button
                  onClick={onReturnToLanding}
                  className="mt-4 px-8 py-3 bg-gray-700 text-gray-300 font-bold rounded-lg shadow-xl hover:bg-gray-600 transition duration-300 transform hover:scale-[1.03]"
              >
                  ← Return to Landing Page
              </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default BuildEngineDetails;

