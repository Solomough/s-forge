import { useState } from 'react';
import { motion } from 'framer-motion';
import SiteHeader from './SiteHeader.jsx'; 
import { TrendingUp, Users, Megaphone, Loader2 } from 'lucide-react';

// NOTE: We assume fetchWithExponentialBackoff is globally available or imported
// from a shared utility file, as in the other engines.
// If it's not, you must copy it from StrategyInterface.jsx!
// const fetchWithExponentialBackoff = async (apiUrl, payload, retries = 5, delay = 1000) => { /* ... */ };

// Place the utility function here for completeness, if it's not shared:
const fetchWithExponentialBackoff = async (apiUrl, payload, retries = 5, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorBody = await response.text().catch(() => response.statusText);
                if (response.status >= 400 && response.status < 500) {
                    throw new Error(`Client Error (${response.status}): ${errorBody}`, { cause: 'no_retry' });
                }
                throw new Error(`API call failed with status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            if (error.cause === 'no_retry' || i === retries - 1) {
                console.error("Market Engine Fetch failed:", error);
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, delay * (2 ** i)));
        }
    }
};


// Added db, projectId, etc. to match props needed for a functional engine
const MarketEngineDetails = ({ onReturnToLanding, onViewEngine, currentUser, onSignOut, onOpenAuthModal, db, appId, projectId }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [marketResult, setMarketResult] = useState(null);
  const [error, setError] = useState(null);
  
  // CRITICAL ADDITION: Fetch the key from the environment variables
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // Placeholder function for the eventual marketing generation logic
  const startMarketGeneration = async () => {
    setError(null);
    if (!GEMINI_API_KEY) {
        setError("Configuration Error: Gemini API Key is missing. Cannot run Market Engine.");
        return;
    }
    
    setIsProcessing(true);
    
    // --- Future Logic Placeholder ---
    // 1. Fetch the Blueprint using projectId (requires useEffect/getDoc, which is skipped for now)
    // 2. Construct prompt based on Blueprint and a new user input (e.g., site URL)
    
    const placeholderPrompt = `Generate a high-impact launch tweet and a 3-point SEO strategy for a new web app based on the core idea: "An AI tool that builds code from a strategic blueprint."`;
    
    // CRITICAL FIX: Explicitly append the API key to the URL
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`; 

    const systemPrompt = "Act as S-Forge's Market Consultant. Your task is to generate concise, actionable, and persuasive marketing assets in clean Markdown. The output should be ready for launch across multiple channels.";
      
    const payload = {
      contents: [{ parts: [{ text: placeholderPrompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    try {
        const result = await fetchWithExponentialBackoff(apiUrl, payload);
        const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Error: Failed to generate marketing content.";
        
        setMarketResult(generatedText);
        // ... (Future: Save result to Firestore)
        
    } catch (e) {
        let errorMessage = `Market Generation Failed.`;
        if (e.message.includes('HTTP Error')) {
            errorMessage = e.message;
        }
        setError(errorMessage);
        console.error("Market Engine API Error:", e);
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* SiteHeader remains the same */}
      <SiteHeader 
        onLaunchTool={() => onViewEngine('strategy-tool')} 
        onViewEngine={onViewEngine} 
        currentUser={currentUser}
        onSignOut={onSignOut}
        onOpenAuthModal={onOpenAuthModal}
      />
      
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center pt-32">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center w-full max-w-5xl"
        >
          <div className="p-12 rounded-2xl bg-gray-800 border border-s-accent/30 shadow-2xl">
              <Megaphone className="w-16 h-16 text-s-accent mx-auto mb-6" />
              <h1 className="text-5xl font-black text-white mb-4">
                🚀 Market Engine (Phase 3)
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                The **Growth and Launch Consultant** engine. It takes the fully built project and generates all necessary marketing assets, from launch tweets to SEO strategies and documentation.
              </p>
              
              {/* Display Error Message */}
              {error && (
                <div className="bg-red-900/50 text-red-300 p-4 rounded-lg mb-6 text-sm mx-auto max-w-xl">
                    {error}
                </div>
              )}

              {/* Engine Features Grid - remains the same */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-gray-700 p-6 rounded-xl border border-gray-600">
                      <h3 className="text-s-accent font-bold mb-2 flex items-center justify-center space-x-2"><TrendingUp className='w-4 h-4' /> Strategy</h3>
                      <p className="text-gray-300 text-sm">Creates SEO tags, content calendars, and social media post templates.</p>
                  </div>
                  <div className="bg-gray-700 p-6 rounded-xl border border-gray-600">
                      <h3 className="text-s-accent font-bold mb-2 flex items-center justify-center space-x-2"><Users className='w-4 h-4' /> Messaging</h3>
                      <p className="text-gray-300 text-sm">Generates pitch decks, mission statements, and audience-specific copy.</p>
                  </div>
                   <div className="bg-gray-700 p-6 rounded-xl border border-gray-600">
                      <h3 className="text-s-accent font-bold mb-2 flex items-center justify-center space-x-2"><Megaphone className='w-4 h-4' /> Launch Plan</h3>
                      <p className="text-gray-300 text-sm">Step-by-step guidance for product launch on platforms like Product Hunt and Hacker News.</p>
                  </div>
              </div>

              {/* Result Viewer (Hidden until results are ready) */}
              {marketResult && (
                  <div className="text-left mt-8 p-6 bg-gray-700/50 rounded-xl border border-s-accent/40">
                      <h2 className="text-2xl font-bold text-s-accent mb-4">Market Strategy Output:</h2>
                      <pre className="whitespace-pre-wrap font-mono text-sm text-green-300">{marketResult}</pre>
                  </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-8">
                  <button
                      onClick={() => onViewEngine('build-details')}
                      className="px-8 py-3 bg-gray-700 text-gray-300 font-bold rounded-lg shadow-xl hover:bg-gray-600 transition duration-300"
                  >
                      ← Return to Build Engine
                  </button>
                  
                  {/* New Primary CTA to run the engine */}
                  <button
                      onClick={startMarketGeneration}
                      disabled={isProcessing}
                      className="px-8 py-3 bg-s-accent text-s-primary font-bold rounded-lg shadow-xl hover:bg-opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                      {isProcessing ? (
                          <>
                              <Loader2 className="animate-spin w-5 h-5" />
                              <span>Generating Assets...</span>
                          </>
                      ) : (
                          <span>Generate Market Strategy →</span>
                      )}
                  </button>
              </div>

          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default MarketEngineDetails;
