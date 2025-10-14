import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// S-Forge Core Questions (from our Stage 1 Strategy)
const strategyQuestions = [
  { id: 1, prompt: "What is the core purpose of your website or digital project?", placeholder: "e.g., Showcase portfolio, sell a service, launch a DAO..." },
  { id: 2, prompt: "Who is your specific target audience, and what are their primary expectations?", placeholder: "e.g., Tech Founders, Agencies, AI-Literate Creators..." },
  { id: 3, prompt: "How would you define your brand's identity and visual style (e.g., Futuristic, Professional, Playful)?", placeholder: "e.g., Visionary, Gold/Black/White, Minimalist..." },
  { id: 4, prompt: "What are the must-have features or functionalities for your project (e.g., AI integration, Web3 wallets, Forms)?", placeholder: "e.g., Wallet Connect, Dynamic Form Builder, Framer Motion animations..." },
  { id: 5, prompt: "Can you provide Hex codes for your Primary Brand Color and Accent Color?", placeholder: "e.g., #0066FF (Primary) and #FFD700 (Accent)" },
];

const promptVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
};

const StrategyInterface = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const currentQuestion = strategyQuestions[currentStep];

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < strategyQuestions.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Logic for final project generation
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        alert("Strategy Complete! The Build Engine is now ready to generate your blueprint.");
        // In a real app, this would trigger the backend generation process
      }, 2000); 
    }
  };

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-s-background flex flex-col pt-20">
      
      {/* Strategy Header */}
      <header className="py-6 bg-s-primary shadow-lg border-b border-s-accent/50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-s-accent">
            <span className="text-s-background">S-Forge</span> Strategy Engine
          </h1>
          <p className="text-sm text-gray-400 mt-1">Your vision, guided by expert AI strategy. Step {Math.min(currentStep + 1, strategyQuestions.length)} of {strategyQuestions.length}.</p>
        </div>
      </header>

      {/* Main Conversational Area */}
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-2xl shadow-2xl border border-s-accent/20">

          <AnimatePresence mode="wait">
            {currentStep < strategyQuestions.length ? (
              <motion.div
                key={currentStep}
                variants={promptVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <p className="text-s-accent text-lg mb-2 font-medium">S-Forge Question {currentStep + 1}:</p>
                <h2 className="text-3xl font-extrabold text-s-background mb-6">
                  {currentQuestion.prompt}
                </h2>

                <form onSubmit={handleNext}>
                  <textarea
                    rows="4"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    required
                    className="w-full p-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-s-accent focus:ring-1 focus:ring-s-accent transition duration-300"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="px-6 py-3 bg-s-accent text-s-primary font-bold rounded-lg shadow-md hover:bg-opacity-90 transition duration-300 disabled:opacity-50"
                    >
                      {currentStep < strategyQuestions.length - 1 ? 'Next Question →' : 'Finalize Strategy'}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="summary"
                variants={promptVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <p className="text-s-accent text-2xl mb-4">✨ Strategy Complete!</p>
                <h2 className="text-4xl font-extrabold text-s-background mb-6">
                  Initiating Build Engine...
                </h2>
                <p className="text-gray-400">
                  Your project blueprint is being compiled based on the focused data. Ready for the code generation phase.
                </p>
                
                {isProcessing && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 flex justify-center items-center space-x-2"
                  >
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-s-accent"></div>
                    <span className="text-s-accent">Processing excellence...</span>
                  </motion.div>
                )}
                
                {!isProcessing && (
                    <button
                        onClick={() => alert("Simulating switch to Build Canvas UI...")}
                        className="mt-8 px-8 py-4 bg-s-accent text-s-primary font-bold rounded-lg shadow-xl hover:bg-opacity-90 transition duration-300"
                    >
                        View Project Blueprint & Code Canvas
                    </button>
                )}
                
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default StrategyInterface;
