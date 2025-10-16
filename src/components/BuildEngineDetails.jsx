import { useEffect, useState } from 'react';
// ... (all other imports remain the same)
// ... (fetchWithExponentialBackoff and buildSteps remain the same)

// Renamed internally for clarity, but lives in BuildEngineDetails.jsx
const BuildEngine = ({ onViewEngine, db, currentUser, appId, projectId, onSignOut, onOpenAuthModal, onReturnToLanding }) => {
// ... (all state remains the same)

  // CRITICAL ADDITION: Fetch the key from the environment variables
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // 1. Fetch Project Data (Blueprint and Answers)
  // ... (useEffect remains the same)

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
    
    // ... (codePrompt construction remains the same)
    
    // CRITICAL FIX: Explicitly append the API key to the URL
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`; 
    
    // ... (systemPrompt and payload construction remains the same)

    try {
        const result = await fetchWithExponentialBackoff(apiUrl, payload);
        // ... (rest of try block remains the same)
    } catch (e) {
        // ... (error handling remains the same)
    } finally {
        setIsGenerating(false);
    }
  };
  
  // ... (rest of the component remains the same)
};

// We export the component under the original file name
export default BuildEngine;
