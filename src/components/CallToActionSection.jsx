import { motion } from 'framer-motion';

// Variants for the section entry (simple fade up)
const ctaVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: "easeOut", 
      delay: 0.2 
    } 
  }
};

const CallToActionSection = () => {
  return (
    <motion.section 
      id="signup" 
      variants={ctaVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      // High-contrast background using the primary brand color (Black)
      className="py-24 md:py-32 bg-s-primary" 
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Main Headline (in Gold and White) */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-s-accent mb-4">
          Ready to Forge Your Vision into Reality?
        </h2>
        
        {/* Subtitle / Value Proposition */}
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Stop struggling with generic AI. Start building with S-Forge: **focused excellence** for Web, Web3, and AI projects. Join the future of development.
        </p>

        {/* Signup Form Area */}
        <div className="flex justify-center">
          <form className="w-full max-w-lg flex flex-col sm:flex-row gap-4 p-4 bg-white/10 rounded-xl border border-s-accent/30 shadow-2xl">
            
            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your professional email for Early Access"
              aria-label="Email for Early Access"
              required
              className="flex-grow px-5 py-3 rounded-lg border border-gray-700 bg-s-primary text-white placeholder-gray-500 focus:ring-2 focus:ring-s-accent focus:border-s-accent transition duration-300"
            />
            
            {/* Submit Button (CTA) */}
            <button
              type="submit"
              className="px-8 py-3 bg-s-accent text-s-primary font-bold rounded-lg shadow-lg hover:bg-s-primary hover:text-s-accent border-2 border-s-accent transition duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-s-accent focus:ring-opacity-50"
            >
              Secure Early Access
            </button>
            
          </form>
        </div>
        
        <p className="mt-4 text-sm text-gray-500">
          Get updates on the **Build Engine** and **Market Engine** launch schedules.
        </p>

      </div>
    </motion.section>
  );
};

export default CallToActionSection;
  
