import { motion } from 'framer-motion';

// Component now accepts the onOpenAuthModal function as a prop
const CallToActionSection = ({ onOpenAuthModal }) => {
  // We no longer need the handleEarlyAccess function as the button will trigger the modal.
  // We'll keep the input but only to show users that an email will be required.

  const handleCtaClick = (e) => {
    e.preventDefault();
    
    // Check if the modal function exists and call it
    if (onOpenAuthModal) {
        onOpenAuthModal();
    } else {
        // Fallback for development/testing if prop is missing
        console.error("onOpenAuthModal function is missing!");
        alert("The sign-in/sign-up feature is not fully connected. Please use the header button.");
    }
  };

  return (
    <section className="py-20 md:py-32 bg-s-accent text-s-primary">
      <div className="container mx-auto px-4 text-center">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
        >
          Ready to Forge Your Vision into Reality?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-xl sm:text-2xl font-medium max-w-3xl mx-auto mb-12"
        >
          Stop struggling with generic AI. Start building with S-Forge: **focused excellence** for Web, Web3, and AI projects. Sign in to start your Project Blueprint.
        </motion.p>
        
        {/* We change this form to a div and the submit to a button click handler */}
        <motion.div 
          onClick={handleCtaClick} // Attach the click handler to the button or the entire container if desired
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 px-4 cursor-pointer" // Added cursor pointer
        >
          {/* We keep the input visual but it's not strictly functional anymore */}
          <input
            id="earlyAccessEmail"
            type="email"
            placeholder="Enter your professional email to Sign In"
            required
            // Added pointer-events-none so clicking here triggers the parent div's click
            className="flex-grow p-4 rounded-xl border-2 border-s-primary placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-s-primary/50 transition duration-300 shadow-inner text-s-primary pointer-events-none" 
            readOnly // Make it clear this is just a prompt
          />
          <button
            type="button" // Change to type="button" to prevent form submission
            className="px-8 py-4 bg-s-primary text-s-accent font-bold rounded-xl shadow-lg transition duration-300 hover:bg-gray-800 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-s-primary/50"
            onClick={handleCtaClick} // Ensure the button itself works too
          >
            Sign In / Sign Up to Start →
          </button>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-sm mt-4 opacity-80"
        >
          Your Project Blueprint is ready to be forged immediately after registration.
        </motion.p>

      </div>
    </section>
  );
};

export default CallToActionSection;
