import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// FIREBASE IMPORTS
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { setLogLevel } from 'firebase/firestore'; // Optional: Use for debugging if needed

// Import all required views/interfaces
import LandingPage from './components/LandingPage.jsx'; 
import StrategyInterface from './components/StrategyInterface.jsx'; 
import BuildEngineDetails from './components/BuildEngineDetails.jsx'; 
import MarketEngineDetails from './components/MarketEngineDetails.jsx'; 
import ProjectsHistory from './components/ProjectsHistory.jsx'; 
import AuthModal from './components/AuthModal.jsx'; // CRITICAL: Import Auth Modal

// Framer Motion variant for smooth page transitions
const pageTransition = {
  initial: { opacity: 0, x: 20, rotate: 1 },
  animate: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, rotate: -1, transition: { duration: 0.4, ease: "easeIn" } },
};

function App() {
  // --- STATE MANAGEMENT ---
  const [currentView, setCurrentView] = useState('landing'); 
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [currentUser, setCurrentUser] = useState(/** @type {User | null | undefined} */(undefined)); // undefined = loading
  const isAuthReady = currentUser !== undefined; // True once Firebase auth status is known
  
  // State for the Auth Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // State to hold the ID of the project being worked on for deep linking between steps
  const [activeProjectId, setActiveProjectId] = useState(null); 
  
  // Unique ID generator for unauthenticated users/paths
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

  // --- FIREBASE INITIALIZATION & AUTHENTICATION ---
  useEffect(() => {
    // setLogLevel('debug'); // Enable for debugging
    
    try {
      // 1. Configuration Check
      const firebaseConfigString = typeof __firebase_config !== 'undefined' ? __firebase_config : '{}';
      const firebaseConfig = JSON.parse(firebaseConfigString);
      if (Object.keys(firebaseConfig).length === 0) {
        console.error("Firebase config is empty. Cannot initialize services.");
        // Treat as ready if config is missing to allow UI rendering
        setCurrentUser(null);
        return;
      }
      
      // 2. Initialize App and Services
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const authService = getAuth(app);
      
      setDb(firestore);
      setAuth(authService);

      // 3. Authentication Listener
      const unsubscribe = onAuthStateChanged(authService, async (user) => {
        if (user) {
          // User is signed in (authenticated or custom token used)
          setCurrentUser(user);
        } else if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          // Use custom token if provided
          try {
            await signInWithCustomToken(authService, __initial_auth_token);
          } catch (error) {
            console.error("Error signing in with custom token, signing in anonymously:", error);
            await signInAnonymously(authService);
          }
        } else {
          // No token provided, sign in anonymously for access to public rules
          await signInAnonymously(authService);
        }
      });

      return () => unsubscribe();
      
    } catch (e) {
      console.error("Error initializing Firebase:", e);
      setCurrentUser(null); // Stop loading if error occurs
    }
  }, [appId]);
  
  // --- AUTH HANDLERS ---
  const handleSignOut = async () => {
    if (auth) {
        try {
            await signOut(auth);
            // After sign out, the onAuthStateChanged listener will handle the new state (usually anonymous sign-in)
            setCurrentView('landing'); // Return to landing page after sign out
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }
  };
  
  const onOpenAuthModal = () => setIsAuthModalOpen(true);
  const onCloseAuthModal = () => setIsAuthModalOpen(false);
  
  // --- NAVIGATION HANDLERS ---
  const handleLaunchTool = () => { setCurrentView('strategy-tool'); };
  
  // Generic handler for internal navigation, used by SiteHeader and internal CTAs
  const handleViewEngine = (engineKey, projectId = null) => { 
    if (projectId) {
        setActiveProjectId(projectId); // Set active project for context
    }
    setCurrentView(engineKey); 
  };
  
  const handleReturnToLanding = () => { setCurrentView('landing'); };


  // --- RENDERING LOGIC ---
  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-s-accent">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-t-4 border-t-s-accent border-gray-700 rounded-full mx-auto mb-4"
          />
          <p className="text-lg font-medium">Forging connection to S-Forge Core...</p>
        </div>
      </div>
    );
  }

  // Once Firebase is ready, render the application based on the current view
  return (
    <>
        <AnimatePresence mode="wait" initial={false}>
        
        {/* 1. Marketing Landing Page View */}
        {currentView === 'landing' && (
            <motion.div 
            key="landing"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-s-background flex flex-col font-sans" 
            >
            <LandingPage 
                onLaunchTool={handleLaunchTool} 
                onViewEngine={handleViewEngine} 
                currentUser={currentUser} // Pass for header
                onSignOut={handleSignOut} // Pass for header
                onOpenAuthModal={onOpenAuthModal} // Pass for header
            /> 
            </motion.div>
        )}

        {/* 2. S-Forge Strategy Tool Interface View */}
        {currentView === 'strategy-tool' && (
            <motion.div 
            key="strategy-tool" 
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen flex flex-col font-sans" 
            >
            <StrategyInterface 
                onReturnToLanding={handleReturnToLanding} 
                onViewEngine={handleViewEngine}
                db={db}
                auth={auth}
                currentUser={currentUser}
                appId={appId}
                setActiveProjectId={setActiveProjectId}
                onSignOut={handleSignOut} // Pass for header
                onOpenAuthModal={onOpenAuthModal} // Pass for header
            /> 
            </motion.div>
        )}
        
        {/* 3. Build Engine Details View */}
        {currentView === 'build-details' && (
            <motion.div 
            key="build"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen flex flex-col font-sans" 
            >
            <BuildEngineDetails 
                onReturnToLanding={handleReturnToLanding} 
                onViewEngine={handleViewEngine} 
                db={db}
                auth={auth}
                currentUser={currentUser}
                appId={appId}
                projectId={activeProjectId}
                onSignOut={handleSignOut} // Pass for header
                onOpenAuthModal={onOpenAuthModal} // Pass for header
            /> 
            </motion.div>
        )}
        
        {/* 4. Market Engine Details View */}
        {currentView === 'market-details' && (
            <motion.div 
            key="market"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen flex flex-col font-sans" 
            >
            <MarketEngineDetails 
                onReturnT
