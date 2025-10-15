import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Code, Zap, DollarSign, Archive, LogIn, LogOut, User } from 'lucide-react'; 

// Navigation links data
const navLinks = [
  // isTool: true links call onLaunchTool (to start the Strategy process)
  // isTool: false links call onViewEngine (to see details or Projects History)
  { name: "Strategy", path: "strategy-tool", icon: Zap, isTool: true },
  { name: "Build", path: "build-details", icon: Code, isTool: false },
  { name: "Market", path: "market-details", icon: DollarSign, isTool: false },
  { name: "Projects", path: "projects-history", icon: Archive, isTool: false },
];

// Framer Motion variant for the header entry animation
const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, delay: 0.2 } },
};

// Framer Motion variants for the mobile menu transition
const menuVariants = {
    hidden: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
};

// --- Component Definition ---
const SiteHeader = ({ onLaunchTool, onViewEngine, currentUser, onSignOut, onOpenAuthModal }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Helper to check if the current user is a registered user (not anonymous)
    const isRegisteredUser = currentUser && !currentUser.isAnonymous;

    // Determines which function to call based on the link's type
    const handleNavigation = (path, isTool) => {
        setIsMenuOpen(false); // Close menu on click
        setIsUserMenuOpen(false); // Close user menu on click
        if (isTool) {
            onLaunchTool();
        } else {
            onViewEngine(path);
        }
    };
    
    // Handler for Sign In / Sign Up
    const handleAuthClick = () => {
        setIsMenuOpen(false);
        onOpenAuthModal();
    };
    
    // Handler for Sign Out
    const handleSignOutClick = () => {
        setIsUserMenuOpen(false);
        onSignOut();
    };

    return (
        <motion.header 
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="fixed top-0 z-50 w-full bg-s-background/95 backdrop-blur-sm shadow-xl border-b border-gray-100" 
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            
            {/* Logo/Brand Name (Navigates to landing page) */}
            <button 
                onClick={() => onViewEngine('landing')} 
                className="text-2xl font-extrabold text-s-primary tracking-tight flex items-center transition duration-300 hover:text-s-accent"
            >
              <span className="text-s-accent">S</span>-Forge
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.path, link.isTool)}
                  className="text-s-text font-semibold hover:text-s-accent transition duration-200 relative group"
                >
                  {link.name}
                  {/* Futuristic Underline Effect */}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-s-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
              ))}
            </nav>

            {/* CTA Button (Desktop) */}
            <div className="hidden sm:flex items-center space-x-4 relative">
                
                {/* 1. If NOT Signed In, show Sign In button */}
                {!isRegisteredUser && (
                    <button 
                        onClick={handleAuthClick}
                        className="px-6 py-2 bg-s-primary text-s-accent border border-s-accent font-medium rounded-lg shadow-lg hover:bg-s-accent hover:text-s-primary transition duration-300 transform hover:scale-[1.03] flex items-center space-x-2"
                    >
                        <LogIn className='w-4 h-4'/>
                        <span>Sign In</span>
                    </button>
                )}
                
                {/* 2. If Signed In, show User Menu */}
                {isRegisteredUser && (
                    <>
                        <button 
                            onClick={() => handleNavigation('strategy-tool', true)} // Launch Tool button for registered users
                            className="px-6 py-2 bg-s-accent text-s-primary font-medium rounded-lg shadow-lg hover:bg-s-accent/90 transition duration-300 transform hover:scale-[1.03]"
                        >
                            Launch Tool
                        </button>
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-s-accent text-s-primary font-bold border-2 border-s-accent hover:ring-2 hover:ring-s-accent/50 transition duration-200"
                            aria-expanded={isUserMenuOpen}
                        >
                            <User className='w-5 h-5'/>
                        </button>
                        
                        {/* User Dropdown Menu */}
                        {isUserMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-14 mt-2 w-48 bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700"
                            >
                                <div className="p-3 text-sm text-s-accent font-semibold truncate border-b border-gray-700">
                                    {currentUser.email || "Anonymous User"}
                                </div>
                                <button
                                    onClick={() => handleNavigation('projects-history', false)}
                                    className="flex items-center space-x-3 w-full p-3 text-left text-s-text hover:bg-gray-700 transition duration-150"
                                >
                                    <Archive className='w-4 h-4' />
                                    <span>My Projects</span>
                                </button>
                                <button
                                    onClick={handleSignOutClick}
                                    className="flex items-center space-x-3 w-full p-3 text-left text-red-400 hover:bg-gray-700 transition duration-150 border-t border-gray-700"
                                >
                                    <LogOut className='w-4 h-4' />
                                    <span>Sign Out</span>
                                </button>
                            </motion.div>
                        )}
                    </>
                )}
                
                {/* 3. If Anonymous, only show Launch Tool (This is managed by App.jsx, but we keep the button consistent) */}
                {currentUser && currentUser.isAnonymous && !isRegisteredUser && (
                    <button 
                        onClick={() => handleNavigation('strategy-tool', true)}
                        className="px-6 py-2 bg-s-accent text-s-primary font-medium rounded-lg shadow-lg hover:bg-s-accent/90 transition duration-300 transform hover:scale-[1.03]"
                    >
                        Launch Tool
                    </button>
                )}
                
            </div>

            {/* Mobile Menu Icon (Toggle) */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-s-primary rounded-md focus:outline-none focus:ring-2 focus:ring-s-accent"
              >
                {isMenuOpen ? <X className="w-6 h-6 text-s-accent" /> : <Menu className="w-6 h-6 text-s-accent" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu (Animated with Framer Motion) */}
          {isMenuOpen && (
                <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    className="lg:hidden bg-s-background shadow-lg border-t border-gray-100 pb-4"
                >
                    <motion.nav 
                        className="flex flex-col space-y-1 p-4"
                        variants={menuVariants}
                    >
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.name}
                                variants={itemVariants}
                                onClick={() => handleNavigation(link.path, link.isTool)}
                                className="flex items-center space-x-3 p-3 text-left text-s-primary text-lg font-medium hover:bg-gray-100 rounded-lg transition duration-300"
                            >
                                <link.icon className="w-5 h-5 text-s-accent" />
                                <span>{link.name}</span>
                            </motion.button>
                        ))}
                        
                        {/* Mobile Authentication/Start CTA */}
                        {isRegisteredUser ? (
                            <motion.button
                                variants={itemVariants}
                                onClick={handleSignOutClick}
                                className="flex items-center space-x-3 p-3 mt-4 bg-red-500 text-s-primary font-bold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                            >
                                <LogOut className="w-5 h-5"/>
                                <span>Sign Out ({currentUser.email.split('@')[0]})</span>
                            </motion.button>
                        ) : (
                            <motion.button
                                variants={itemVariants}
                                onClick={handleAuthClick}
                                className="flex items-center space-x-3 p-3 mt-4 bg-s-primary text-s-accent font-bold rounded-lg shadow-md hover:bg-s-accent hover:text-s-primary transition duration-300 border border-s-accent"
                            >
                                <LogIn className="w-5 h-5"/>
                                <span>Sign In / Sign Up</span>
                            </motion.button>
                        )}
                    </motion.nav>
                </motion.div>
            )}
        </motion.header>
    );
};

export default SiteHeader;
