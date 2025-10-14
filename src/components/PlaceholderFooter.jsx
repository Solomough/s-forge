import { motion } from 'framer-motion';

const PlaceholderFooter = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-gray-800 text-white mt-12 py-8"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Solomough's Vision. Forged by **S-Forge**.
        </p>
        <p className="mt-2 text-xs text-gray-400">
          Built with React, Tailwind CSS, and Framer Motion for unparalleled excellence.
        </p>
      </div>
    </motion.footer>
  );
};

export default PlaceholderFooter;
