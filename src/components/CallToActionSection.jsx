import { motion } from 'framer-motion';

const CallToActionSection = () => {
  // Placeholder function for handling the early access signup
  const handleEarlyAccess = (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('earlyAccessEmail');
    if (emailInput && emailInput.value) {
      console.log(`[MARKET ENGINE] Capturing email for early access: ${emailInput.value}`);
      // NOTE: In a production app, this would integrate with a backend service (e.g., Firebase, Mailchimp API)
      alert(`Thank you for securing early access, ${emailInput.value}! We will be in touch.`);
      emailInput.value = ''; // Clear the input
    } else {
      alert("Please enter a valid professional email.");
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
          Stop struggling with generic AI. Start building with S-Forge: **focused excellence** for Web, Web3, and AI projects. Join the future of development.
        </motion.p>
        
        <motion.form 
          onSubmit={handleEarlyAccess}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 px-4"
        >
          <input
            id="earlyAccessEmail"
            type="email"
            placeholder="Enter your professional email for Early Access"
            required
            className="flex-grow p-4 rounded-xl border-2 border-s-primary placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-s-primary/50 transition duration-300 shadow-inner text-s-primary"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-s-primary text-s-accent font-bold rounded-xl shadow-lg transition duration-300 hover:bg-gray-800 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-s-primary/50"
          >
            Secure Early Access
          </button>
        </motion.form>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-sm mt-4 opacity-80"
        >
          Get updates on the **Build Engine** and **Market Engine** launch schedules.
        </motion.p>

      </div>
    </section>
  );
};

export default CallToActionSection;
