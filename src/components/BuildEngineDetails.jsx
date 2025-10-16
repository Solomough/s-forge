import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Zap, Copy } from 'lucide-react'; // Added lucide icons explicitly
import SiteHeader from './SiteHeader.jsx'; 
import { doc, getDoc } from 'firebase/firestore'; 
import { marked } from 'marked'; // For rendering Markdown output

// Utility function to handle API calls with network resilience (FIXED SYNTAX)
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
        } catch (error) { // <-- SYNTAX FIXED HERE
            if (error.cause === 'no_retry' || i === retries - 1) {
                console.error("Build Engine Fetch failed:", error);
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, delay * (2 ** i)));
        }
    }
};


// The file order for the Build Engine (Remains the same)
const buildSteps = [
    { id: 1, fileName: 'src/App.jsx', description: 'Core application structure and routing setup (React, Tailwind, Framer Motion initialization).' },
    { id: 2, fileName: 'src/components/SiteHeader.jsx', description: 'The custom header component with dynamic Sign In/Sign Out state.' },
    { id: 3, fileName: 'src/pages/Landing.jsx', description: 'The main, highly stylized landing page component.' },
    { id: 4, fileName: 'src/styles/index.css', description: 'Any custom CSS/Tailwind configuration needed for the brand identity.' },
    // Add more files here as the project grows
];

// Renamed internally for clarity, but lives in BuildEngineDetails.jsx
const BuildEngine = ({ onViewEngine, db, currentUser, appId, projectId, onSignOut, onOpenAuthModal, onReturnToLanding }) => {
  const [projectData, setProjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBuildStep, setCurrentBuildStep] = useState(0); // 0 is initial, 1+ is code generation steps
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyStatus, setCopyStatus] = useState(null);
  
  const currentStepDetails = buildSteps[currentBuildStep - 1]; // Step 0 is the initial view

  // CRITICAL ADDITION: Fetch the key from the environment variables
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // 1. Fetch Project Data (Blueprint and Answers) (Remains the same)
  useEffect(() => {
    const fetchProject = async () => {
      if (!db || !projectId || !currentUser?.uid) {
        setIsLoading(false);
        // If we have projectId but no user, we might want to prompt sign in, but for now, just exit.
        if (projectId) {
            setError("Authentication Error: You must be signed in to view this project.");
        } else {
             setError("Project ID is missing. Please run the Strategy Engine first.");
        }
        return;
      }

      try {
        const docRef = doc(db, `artifacts/${appId}/users/${currentUser.uid}/projects`, projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProjectData(docSnap.data());
          setCurrentBuildStep(0); 
        } else {
          setError("Project Blueprint not found. It may have been deleted.");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project details from Firestore. Check network and permissions.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [db, appId, currentUser, projectId]);

  // 2. Code Generation Function
  const startCodeGeneration = async (stepIndex) => {
    
    // NEW CHECK: Ensure API Key is present
    if (!GEMINI_API_KEY) {
        setError("Configuration Error: Gemini API Key is missing. Cannot generate code.");
        return;
    }

    setIsGenerating(true);
    setGeneratedCode('');
    setError(null);
    const { fileName, description } = buildSteps[stepIndex];
    
    // Construct the prompt for code generation (Remains the same)
    const codePrompt = `
      Based on the following Project Blueprint and the target file:
      
      --- PROJECT BLUEPRINT ---
      ${projectData.blueprint}
      --- END BLUEPRINT ---
      
      **TASK:** Generate the complete, clean code for the file: \`${fileName}\`. 
      
      **REQUIREMENTS:**
      1.  The code must be pure, production-ready, and directly copy-pasteable.
      2.  Do NOT include any surrounding prose, explanations, or Markdown fences (like \`\`\`jsx) in your final output.
      3.  The file purpose is: ${description}.
      4.  If it is a React component, ensure it uses the data/styles suggested in the blueprint (e.g., Tailwind classes, Hex codes).

      Provide ONLY the content of the file.
    `;
    
    // CRITICAL FIX: Explicitly append the API key to the URL
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`; 
    
    const systemPrompt = "Act as S-Forge's Build Engine, a highly specialized AI code generator. Your sole function is to take the Strategy Blueprint and a file requirement, and output the requested code exactly as written, with no extra text or markdown code blocks. Ensure the output is only code.";
      
    const payload = {
      contents: [{ parts: [{ text: codePrompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }],
    };

    try {
        const result = await fetchWithExponentialBackoff(apiUrl, payload);
        const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text || 
                             `Error: Failed to generate code for ${fileName}.`;
        
        // CRITICAL: Clean up any remaining markdown blocks the model might have added
        // This is a common failure point; we aggressively remove the code fences
        const cleanedCode = generatedText.replace(/```(jsx|javascript|js|html|css)?\n?/gi, '').replace(/```$/g, '').trim();
        
        setGeneratedCode(cleanedCode);
        setCurrentBuildStep(stepIndex + 1); // Advance the step
        console.log(`[BUILD ENGINE] Code generated for: ${fileName}`);

    } catch (e) {
        let errorMessage = `Code Generation Failed for ${fileName}.`;
        if (e.message.includes('HTTP Error')) {
            errorMessage = e.message;
        }
        setError(errorMessage);
        console.error("Code Generation API Error:", e);
    } finally {
        setIsGenerating(false);
    }
  };
  
  // 3. Copy Code to Clipboard (Remains the same)
  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus(null), 2000);
    }, () => {
        setCopyStatus("Failed to copy!");
        setTimeout(() => setCopyStatus(null), 2000);
    });
  };

  // 4. Handle Next/Previous File Navigation (Remains the same)
  const handleNextStep = () => {
      // Check if there is a next file to generate
      if (currentBuildStep < buildSteps.length) {
          startCodeGeneration(currentBuildStep); // currentBuildStep is the index of the NEXT file
      } else {
          // All files generated, move to Market Engine
          onViewEngine('market-details'); // Corrected key to 'market-details'
      }
  };


  // --- Render Logic --- (Remains the same)
  const renderContent = () => {
      // General Loading/Error States
      if (isLoading) {
          return (
            <div className="text-center py-20">
              <Loader2 className="animate-spin h-12 w-12 text-s-accent mx-auto" />
              <span className="text-xl text-s-accent ml-4">Loading Project Blueprint...</span>
            </div>
          );
      }
      
      if (error) {
          return (
             <div className="text-center py-20 bg-gray-800/50 p-8 rounded-xl">
                <h2 className="text-3xl font-bold text-red-400">🚨 Build Error</h2>
                <p className="mt-4 text-white">{error}</p>
                <button
                    onClick={() => onReturnToLanding()}
                    className="mt-6 px-8 py-3 bg-red-700 text-white font-bold rounded-lg shadow-xl hover:bg-red-600 transition"
                >
                    Return to Home
                </button>
             </div>
          );
      }

      // 1. Initial State: Review Blueprint (currentBuildStep === 0)
      if (currentBuildStep === 0) {
          return (
              <>
                <h1 className="text-4xl font-extrabold text-s-accent mb-2">Build Engine: Project Review</h1>
                <p className="text-lg text-white/80 mb-8">Review your S-Forge Blueprint before initiating the code generation sequence.</p>

                {/* Blueprint Viewer */}
                <div className="bg-gray-800/50 p-6 rounded-xl border border-s-accent/20 h-[60vh] overflow-y-auto blueprint-viewer">
                  <div 
                      dangerouslySetInnerHTML={{ __html: marked.parse(projectData.blueprint) }} 
                      className="prose prose-invert max-w-none text-white space-y-4"
                  />
                </div>

                <div className="text-center mt-10">
                  <button
                      onClick={() => startCodeGeneration(0)} // Start with the first file (index 0)
                      className="px-10 py-4 bg-s-accent text-s-primary font-bold text-xl rounded-lg shadow-xl hover:bg-opacity-90 transition duration-300 transform hover:scale-[1.03] flex items-center justify-center mx-auto space-x-3"
                  >
                      <Zap className="w-6 h-6"/>
                      <span>Initiate Code Generation: {buildSteps[0].fileName}</span>
                  </button>
                </div>
              </>
          );
      }

      // 2. Code Generation Steps (currentBuildStep > 0)
      return (
        <div className="w-full">
          <h1 className="text-4xl font-extrabold text-white mb-2">
              File {currentBuildStep} of {buildSteps.length}: 
              <span className="text-s-accent ml-2">{currentStepDetails.fileName}</span>
          </h1>
          <p className="text-lg text-white/80 mb-6">{currentStepDetails.description}</p>
          
          {isGenerating ? (
              <div className="text-center py-20 bg-gray-800 rounded-xl">
                  <Loader2 className="animate-spin h-12 w-12 text-s-accent mx-auto" />
                  <p className="text-xl text-s-accent mt-4">Forging code for {currentStepDetails.fileName}...</p>
              </div>
          ) : (
              <div className="relative">
                  {/* Code Viewer */}
                  <pre className="bg-gray-900 p-6 rounded-xl border border-s-accent/40 text-sm overflow-x-auto text-green-300 h-[60vh] whitespace-pre-wrap font-mono">
                      {generatedCode || `Code will appear here for ${currentStepDetails.fileName}.`}
                  </pre>
                  
                  {/* Copy Button */}
                  <button 
                      onClick={copyCode}
                      disabled={!generatedCode}
                      className="absolute top-4 right-4 p-2 bg-s-accent/20 text-s-accent rounded-lg hover:bg-s-accent/40 transition disabled:opacity-50 flex items-center space-x-1"
                  >
                      <Copy className="w-4 h-4"/>
                      <span className="font-medium">{copyStatus || 'Copy Code'}</span>
                  </button>

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-6">
                      <button
                          onClick={handleNextStep} 
                          className="px-6 py-3 bg-s-accent text-s-primary font-bold rounded-lg shadow-md hover:bg-opacity-90 transition duration-300 flex items-center space-x-2 disabled:opacity-50"
                          disabled={!generatedCode || isGenerating}
                      >
                          {currentBuildStep < buildSteps.length ? 
                              `Next File: ${buildSteps[currentBuildStep].fileName} →` 
                              : `Launch Market Engine →`}
                      </button>
                      
                      {/* Go back only if we are past the first generated file */}
                      {currentBuildStep > 1 && (
                          <button
                              onClick={() => setCurrentBuildStep(prev => prev - 1)} 
                              className="px-4 py-2 text-white/70 hover:text-white transition"
                          >
                              ← Review Previous
                          </button>
                      )}
                  </div>
              </div>
          )}
        </div>
      );
  };
  
  // Outer Container
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* SiteHeader for universal navigation */}
      <SiteHeader 
        onLaunchTool={() => onViewEngine('strategy-tool')} 
        onViewEngine={onViewEngine} 
        currentUser={currentUser}
        onSignOut={onSignOut}
        onOpenAuthModal={onOpenAuthModal}
      />
      
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center pt-32">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl"
        >
            <AnimatePresence mode="wait">
                {renderContent()}
            </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

// We export the component under the original file name
export default BuildEngine;
