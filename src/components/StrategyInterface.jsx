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
  const [currentStep, setCurrentStep] = useState(0); // 0-4 are questions
  const [answers, setAnswers] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBlueprintReady, setIsBlueprintReady] = useState(false); // New state for final transition

  const currentQuestion = strategyQuestions[currentStep];

  const handleNext = (e) => {
    e.preventDefault();
    
    // Check if current answer is empty before proceeding
    if (currentStep < strategyQuestions.length && !answers[currentQuestion.id]) {
      alert("Please provide an answer before moving to the next question.");
      return;
    }

    if (currentStep < strategyQuestions.length - 1) {
      // Move to the next question
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === strategyQuestions.length - 1) {
      // Final question answered: Start Processing Phase
      setIsProcessing(true);
      console.log("[STRATEGY ENGINE] Final Answers:", answers);
      
      // Simulate backend processing time for the Project Blueprint
      setTimeout(() => {
        setIsProcessing(false);
        setIsBlueprintReady(true);
        console.log("[STRATEGY ENGINE] Project Blueprint Generated. Ready for Build Engine.");
      }, 3500); // 3.5 second simulated processing time
    }
  };

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };
  
  // Placeholder for triggering the next phase (Build Engine)
  const launchBuildCanvas = () => {
      alert("Launching Build Canvas! (Simulation). In a real application, the generated code files would now appear in the editor.");
      console.log("[S-FORGE] Transitioning to Build Canvas with Blueprint Data.");
  }


  // --- Render Logic ---
  const renderContent = () => {
      if (isProcessing) {
          // 1. Processing State
          return (
              <motion.div
                key="processing"
                variants={promptVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <p className="text-s-accent text-2xl mb-4">⚙️ **Strategy Complete!**</p>
                <h2 className="text-4xl font-extrabold text-s-background mb-6">
                  Analyzing Data & Compiling Project Blueprint...
                </h2>
                <div className="mt-6 flex justify-center items-center space-x-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-s-accent"></div>
                  <span className="text-s-accent text-xl font-medium">Please wait, forging excellence...</span>
                </div>
              </motion.div>
          );
      } else if (isBlueprintReady) {
          // 2. Blueprint Ready State (Final CTA)
          return (
              <motion.div
                key="summary"
                variants={promptVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <p className="text-s-accent text-2xl mb-4">✅ **Blueprint Ready: Output 1/3 Complete!**</p>
                <h2 className="text-4xl font-extrabold text-s-background mb-6">
                  Initiate the Build Engine
                </h2>
                <p className="text-gray-400 max-w-lg mx-auto">
                  Your vision is clear. Click below to generate the pristine, file-by-file code based on your strategy.
                </p>
                
                <button
                    onClick={launchBuildCanvas}
                    className="mt-8 px-8 py-4 bg-s-accent text-s-primary font-bold rounded-lg shadow-xl hover:bg-opacity-90 transition duration-300 transform hover:scale-[1.05]"
                >
                    Launch Build Canvas →
                </button>
              </motion.div>
          );
      } else {
          // 3. Question State
          return (
              <motion.div
                key={currentStep}
                variants={promptVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <p className="text-s-accent text-lg mb-2 font-medium">S-Forge Question {currentStep + 1} of {strategyQuestions.length}:</p>
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
                      className="px-6 py-3 bg-s-accent text-s-primary font-bold rounded-lg shadow-md hover:bg-opacity-90 transition duration-300"
                    >
                      {currentStep < strategyQuestions.length - 1 ? 'Next Question →' : 'Finalize Strategy'}
                    </button>
                  </div>
                </form>
              </motion.div>
          );
      }
  }


  return (
    <div className="min-h-screen bg-gray-900 text-s-background flex flex-col pt-20">
      
      {/* Strategy Header */}
      <header className="py-6 bg-s-primary shadow-lg border-b border-s-accent/50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-s-accent">
            <span className="text-s-background">S-Forge</span> Strategy Engine
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Phase: {isBlueprintReady ? 'Blueprint Ready' : isProcessing ? 'Processing' : `Strategy Collection`}
          </p>
        </div>
      </header>

      {/* Main Conversational Area */}
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-2xl shadow-2xl border border-s-accent/20">

          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default StrategyInterface;
