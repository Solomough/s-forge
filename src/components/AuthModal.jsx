import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, LogIn, UserPlus } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthModal = ({ onClose, auth }) => {
    const [isSignInMode, setIsSignInMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Framer Motion variants for the modal and backdrop
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { y: "-100vh", opacity: 0 },
        visible: { 
            y: "0", 
            opacity: 1, 
            transition: { delay: 0.1, duration: 0.3 } 
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isSignInMode) {
                // Sign In Mode
                await signInWithEmailAndPassword(auth, email, password);
                console.log("User signed in successfully.");
            } else {
                // Sign Up Mode
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("User created successfully.");
            }
            // Close modal on successful authentication (App.jsx handles state change)
            onClose(); 
        } catch (err) {
            console.error("Authentication error:", err);
            // Display a user-friendly error message
            if (err.code) {
                switch (err.code) {
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        setError('Invalid email or password.');
                        break;
                    case 'auth/email-already-in-use':
                        setError('This email is already registered.');
                        break;
                    case 'auth/invalid-email':
                        setError('Please enter a valid email address.');
                        break;
                    case 'auth/weak-password':
                        setError('Password should be at least 6 characters.');
                        break;
                    default:
                        setError('Authentication failed. Please try again.');
                }
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            className="fixed inset-0 z-[100] bg-black bg-opacity-70 flex items-center justify-center p-4 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose} // Allows closing by clicking the backdrop
        >
            <motion.div 
                className="w-full max-w-md p-8 bg-gray-900 rounded-xl shadow-2xl border border-s-accent/30 relative"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-s-accent transition duration-200 rounded-full hover:bg-gray-800"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-3">
                        {isSignInMode 
                            ? <LogIn className="w-8 h-8 text-s-accent" />
                            : <UserPlus className="w-8 h-8 text-s-accent" />
                        }
                    </div>
                    <h2 className="text-3xl font-bold text-s-primary">
                        {isSignInMode ? 'Sign In to S-Forge' : 'Create Account'}
                    </h2>
                    <p className="text-gray-400 mt-1">
                        {isSignInMode ? 'Access your saved projects' : 'Start forging your first project'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Error Display */}
                    {error && (
                        <div className="p-3 bg-red-800/50 text-red-300 border border-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2 bg-gray-800 text-s-primary border border-gray-700 rounded-lg focus:border-s-accent focus:ring-s-accent transition duration-200 outline-none"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            minLength={6}
                            className="w-full px-4 py-2 bg-gray-800 text-s-primary border border-gray-700 rounded-lg focus:border-s-accent focus:ring-s-accent transition duration-200 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-6 bg-s-accent text-s-primary font-bold rounded-lg shadow-md hover:bg-s-accent/90 transition duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                        {loading && (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-t-2 border-t-s-primary border-s-accent rounded-full"
                            />
                        )}
                        <span>{isSignInMode ? (loading ? 'Signing In...' : 'Sign In') : (loading ? 'Creating Account...' : 'Sign Up')}</span>
                    </button>
                </form>

                {/* Mode Toggle Link */}
                <div className="mt-6 text-center text-sm">
                    <button
                        onClick={() => setIsSignInMode(!isSignInMode)}
                        className="text-s-accent hover:underline transition duration-200"
                        disabled={loading}
                    >
                        {isSignInMode 
                            ? "Need an account? Sign Up" 
                            : "Already have an account? Sign In"
                        }
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AuthModal;
