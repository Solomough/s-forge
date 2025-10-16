import { useEffect, useState } from 'react';
// ... (all other imports remain the same)

// Utility function to handle API calls with network resilience
const fetchWithExponentialBackoff = async (apiUrl, payload, retries = 5, delay = 1000) => {
    // ... (Implementation remains the same, no changes needed here)
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(apiUrl, {
// ...
// ...
        } catch (error) {
// ...
        }
    }
};

// ... (strategyQuestions and promptVariants remain the same)

const StrategyInterface = ({ onViewEngine, db, auth, currentUser, appId, onSignOut, onOpenAuthModal }) => {
// ... (all state remains the same)

  // CRITICAL ADDITION: Fetch the key from the environment variables exposed by Vercel/Vite
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

// ... (constructGeminiPrompt and saveProject functions remain the same)


  const handleNext = async (e) => {
    e.preventDefault();
    setProcessError(null); 
    
    // ... (validation remains the same)

    if (currentStep < strategyQuestions.length - 1) {
      // Move to the next question
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === strategyQuestions.length - 1) {
      // Final question answered: Start Processing Phase and API Call
      
      // NEW CHECK: Ensure API Key is present
      if (!GEMINI_API_KEY) {
         setProcessError("Configuration Error: Gemini API Key is missing. Please set VITE_GEMINI_API_KEY in Vercel.");
         setIsProcessing(false);
         return;
      }

      setIsProcessing(true);
      
      const userQuery = constructGeminiPrompt(answers);
      
      // CRITICAL FIX: Explicitly append the API key to the URL
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`; 

      const systemPrompt = "Act as S-Forge, a world-class AI Digital Strategy Consultant. Your goal is to analyze the user's input and generate a highly detailed and actionable Project Blueprint in clean Markdown format. The Blueprint must contain four sections: **1. Project Vision (Summary)**, **2. Technical Blueprint (Tech Stack & Files)**, **3. Content Strategy (Messaging)**, and **4. Next Steps (Build Engine Readiness)**. Ensure the final output is styled beautifully using only Markdown.";
      
      const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
      };

      try {
        const result = await fetchWithExponentialBackoff(apiUrl, payload);
        // ... (rest of try block remains the same)
        
        // ... (saveProject and transition logic remains the same)

      } catch (e) {
        // ... (error handling remains the same)
        setProcessError(errorMessage);
        setIsProcessing(false);
        console.error("Gemini API Error:", e);
      }
    }
  };

  // ... (rest of the component remains the same)
};

export default StrategyInterface;
