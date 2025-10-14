import { motion } from 'framer-motion';

const navLinks = [
  { name: "Strategy", href: "#strategy" },
  { name: "Build", href: "#build" },
  { name: "Market", href: "#market" },
  { name: "Projects", href: "#projects" },
];

// Framer Motion variant for the header entry animation
const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, delay: 0.2 } },
};

const SiteHeader = () => {
  return (
    <motion.header 
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 w-full bg-s-background/95 backdrop-blur-sm shadow-md"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo/Brand Name */}
        <a href="/" className="text-2xl font-extrabold text-s-primary tracking-tight flex items-center">
          <span className="text-s-accent">S</span>-Forge
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-s-text font-semibold hover:text-s-accent transition duration-200 relative group"
            >
              {link.name}
              {/* Futuristic Underline Effect */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-s-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <button className="hidden sm:block px-6 py-2 bg-s-primary text-s-accent border border-s-accent font-medium rounded-lg shadow-lg hover:bg-s-accent hover:text-s-primary transition duration-300 transform hover:scale-[1.03]">
          Start Your Project (Demo)
        </button>

        {/* Mobile Menu Icon (Placeholder for functionality) */}
        <div className="lg:hidden">
          {/* We'll add an actual menu icon here later */}
          <svg className="w-6 h-6 text-s-text cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </div>
      </div>
    </motion.header>
  );
};

export default SiteHeader;
          
