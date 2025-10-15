import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Code, Zap, DollarSign, Archive, LogIn } from 'lucide-react'; 

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


const SiteHeader = ({ onLaunchTool, onViewEngine }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Determines which function to call based on the link's type
    const handleNavigation = (path, isTool) => {
        setIsMenuOpen(false); // Close menu on click
        if (isTool) {
            onLaunchTool();
        } else {
            onViewEngine(path);
        }
    };

    return (
        <motion.header 
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          // Changed to fixed for better mobile usability, allowing content scrolling underneath
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

            {/* CTA Button (Sign In / Start Project) */}
            <button 
                onClick={() => handleNavigation('strategy-tool', true)} // Uses the Strategy Engine Launch
                className="hidden sm:block px-6 py-2 bg-s-primary text-s-accent border border-s-accent font-medium rounded-lg shadow-lg hover:bg-s-accent hover:text-s-primary transition duration-300 transform hover:scale-[1.03] flex items-center space-x-2"
            >
                <LogIn className='w-4 h-4'/>
                <span>Start Project</span>
            </button>

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
                        <motion.button
                            variants={itemVariants}
                            onClick={() => console.log("[AUTH] Launch Sign In/Sign Up Modal")}
                            className="flex items-center space-x-3 p-3 mt-4 bg-s-primary text-s-accent font-bold rounded-lg shadow-md hover:bg-s-accent hover:text-s-primary transition duration-300 border border-s-accent"
                        >
                            <LogIn className="w-5 h-5"/>
                            <span>Sign In / Sign Up</span>
                        </motion.button>
                    </motion.nav>
                </motion.div>
            )}
        </motion.header>
    );
};

export default SiteHeader;
                  
