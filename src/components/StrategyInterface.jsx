import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';
import SiteHeader from './SiteHeader.jsx'; 
import { collection, addDoc, getFirestore } from 'firebase/firestore'; 
import { User } from 'firebase/auth';
import { marked } from 'marked'; // For rendering Markdown output

// Utility function to handle API calls with network resilience
const fetchWithExponentialBackoff = async (apiUrl, payload, retries = 5, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                // Throw an error to trigger retry logic, unless it's a 4xx error (user error)
                if (response.status >= 400 && response.status < 500) {
                    throw new Error(`Client Error: ${response.statusText}`, { cause: 'no_retry' });
                }
                throw new Error(`API call failed with status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            if (error.cause === 'no_retry' || i === retries - 1) {
                console.error("Fetch failed after all retries or due to client error:", error);
                throw error;
            }
            // Wait for exponentially increasing time
            await new Promise(resolve => setTimeout(resolve, delay * (2 ** i)));
        }
    }
};

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
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  exit: { opacity: 0, y: -10 }
};

const StrategyInterface = ({ onViewEngine, db, auth, currentUser, appId }) => {
  const [currentStep, setCurrentStep] = useState(0); 
  const [answers, setAnswers] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBlueprintReady, setIsBlueprintReady] = useState(false);
  const [inputError, setInputError] = useState(null);
  const [blueprintText, setBlueprintText] = useState("");
  const [processError, setProcessError] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const currentQuestion = strategyQuestions[currentStep];
  const userId = currentUser?.uid || 'anonymous';
  
  // Construct the full prompt for the Gemini API call
  const constructGeminiPrompt = (userAnswers) => {
    let prompt = "Generate a comprehensive Project Blueprint based on the following strategy answers:\n\n";
    strategyQuestions.forEach(q => {
        prompt += `Q${q.id}: ${q.prompt}\nA: ${userAnswers[q.id] || 'No Answer Provided'}\n\n`;
    });
    prompt += "Please ensure the output is pure, clean Markdown, ready for display.";
    return prompt;
  };

  // Function to save the project data to Firestore
  const saveProject = async (blueprint) => {
    if (!db) return; // DB must be initialized

    try {
        const projectsCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/projects`);
        
        const projectData = {
            userId: userId,
            createdAt: new Date(),
            status: 'Blueprint Ready',
            answers: answers, // Save raw user answers
            blueprint: blueprint, // Save AI generated text
            title: answers[1] || 'New Project Blueprint', // Use the core purpose as the title
        };
        
        const docRef = await addDoc(projectsCollectionRef, projectData);
        setCurrentProjectId(docRef.id);
        console.log("Project Blueprint saved to Firestore:", docRef.id);

    } catch (error) {
        console.error("Error saving project to Firestore:", error);
    }
  };


  const handleNext = async (e) => {
    e.preventDefault();
    setProcessError(null); // Clear previous errors
    
    // Custom validation
    if (currentStep < strategyQuestions.length && !answers[currentQuestion.id]?.trim()) {
      setInputError("Your strategist requires input to proceed. Please provide a detailed answer.");
      return;
    }
    
    setInputError(null);

    if (currentStep < strategyQuestions.length - 1) {
      // Move to the next question
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === strategyQuestions.length - 1) {
      // Final question answered: Start Processing Phase and API Call
      setIsProcessing(true);
      
      const userQuery = constructGeminiPrompt(answers);
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=`; // API Key is handled by Canvas

      const systemPrompt = "Act as S-Forge, a world-class AI Digital Strategy Consultant. Your goal is to analyze the user's input and generate a highly detailed and actionable Project Blueprint in clean Markdown format. The Blueprint must contain four sections: **1. Project Vision (Summary)**, **2. Technical Blueprint (Tech Stack & Files)**, **3. Content Strategy (Messaging)**, and **4. Next Steps (Build Engine Readiness)**. Ensure the final output is styled beautifully using only Markdown.";
      
      const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
      };

      try {
        const result = await fetchWithExponentialBackoff(apiUrl, payload);
        const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text || 
                             "Error: Failed to generate a meaningful blueprint. Please try again.";
        
        setBlueprintText(generatedText);
        
        // 1. Save the generated blueprint to Firestore
        await saveProject(generatedText); 

        // 2. Transition state
        setIsProcessing(false);
        setIsBlueprintReady(true);
        console.log("[STRATEGY ENGINE] Project Blueprint Generated and Saved.");

      } catch (e) {
        setProcessError("Failed to generate Blueprint. Check your network or try again.");
        setIsProcessing(false);
        console.error("Gemini API Error:", e);
      }
    }
  };

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
    if (inputError) setInputError(null); 
  };
  
  // Transition to the Build Engine Details page
  const launchBuildCanvas = () => {
      // Here you would typically pass the blueprintText and currentProjectId to the next view
      onViewEngine('build-details');
      console.log(`[S-FORGE] Transitioning to Build Canvas for Project ID: ${currentProjectId}`);
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
                exit="exit"
                className="text-center"
              >
                <p className="text-s-accent text-2xl mb-4">⚙️ **Strategy Complete!**</p>
                <h2 className="text-4xl font-extrabold text-s-background mb-6">
                  Analyzing Data & Compiling Project Blueprint...
                </h2>
                <div className="mt-6 flex justify-center items-center space-x-4">
                  <Loader2 className="animate-spin h-8 w-8 text-s-accent" />
                  <span className="text-s-accent text-xl font-medium">Please wait, forging excellence...</span>
                </div>
              </motion.div>
          );
      } else if (isBlueprintReady) {
          // 2. Blueprint Ready State (Final CTA + Blueprint Viewer)
          return (
              <motion.div
                key="summary"
                variants={promptVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-left"
              >
                <p className="text-s-accent text-2xl mb-4">✅ **Blueprint Ready: Output 1/3 Complete!**</p>
                <h2 className="text-4xl font-extrabold text-s-background mb-6">
                  Project Blueprint Generated
                </h2>
                
                {/* Blueprint Viewer */}
                <div className="bg-gray-700/50 p-6 rounded-xl border border-s-accent/20 h-[50vh] overflow-y-auto blueprint-viewer">
                    {/* Render Markdown using dangerouslySetInnerHTML */}
                    <div 
                        dangerouslySetInnerHTML={{ __html: marked.parse(blueprintText) }} 
                        className="prose prose-invert max-w-none text-white space-y-4"
                    />
                </div>
                
                <h2 className="text-2xl font-extrabold text-s-background mt-8 mb-4 text-center">
                    Initiate the Build Engine
                </h2>

                <button
                    onClick={launchBuildCanvas}
                    className="w-full mt-4 px-8 py-4 bg-s-accent text-s-primary font-bold rounded-lg shadow-xl hover:bg-opacity-90 transition duration-300 transform hover:scale-[1.03]"
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
                exit="exit"
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

                  {inputError && (
                    <motion.p 
                        initial={{ opacity: 0, y: 5 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="flex items-center space-x-2 text-red-400 mt-2 text-sm font-medium"
                    >
                        <AlertTriangle className="w-4 h-4"/>
                        <span>{inputError}</span>
                    </motion.p>
                  )}
                  
                  {processError && (
                    <motion.p 
                        initial={{ opacity: 0, y: 5 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="flex items-center space-x-2 text-red-400 mt-2 text-sm font-medium"
                    >
                        <AlertTriangle className="w-4 h-4"/>
                        <span>{processError}</span>
                    </motion.p>
                  )}

                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="px-6 py-3 bg-s-accent text-s-primary font-bold rounded-lg shadow-md hover:bg-opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <div className="flex items-center space-x-2">
                           <Loader2 className="animate-spin h-5 w-5" />
                           <span>Processing...</span>
                        </div>
                      ) : (
                        currentStep < strategyQuestions.length - 1 ? 'Next Question →' : 'Finalize Strategy'
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
          );
      }
  }


  return (
    <>
      <style>
        {/* Basic CSS for Markdown rendering consistency */}
        {`
          .blueprint-viewer h1 { @apply text-3xl font-bold text-s-accent border-b border-s-accent/50 pb-2 mb-4; }
          .blueprint-viewer h2 { @apply text-2xl font-semibold text-white mt-6 mb-3; }
          .blueprint-viewer p { @apply text-gray-300 mb-3; }
          .blueprint-viewer ul { @apply list-disc list-inside ml-4; }
          .blueprint-viewer li { @apply text-gray-400; }
          .blueprint-viewer strong { @apply text-s-accent font-bold; }
        `}
      </style>
      <div className="min-h-screen bg-gray-900 text-s-background flex flex-col">
        
        {/* 1. Global Header for navigation consistency */}
        <SiteHeader 
          onLaunchTool={() => onViewEngine('strategy-tool')} 
          onViewEngine={onViewEngine} 
        />

        {/* Main Conversational Area - uses pt-20 to clear fixed header */}
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center pt-32"> 
          <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-2xl shadow-2xl border border-s-accent/20">

            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
};

export default StrategyInterface;
          
