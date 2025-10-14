import { motion } from 'framer-motion';
import { Github, Twitter } from 'lucide-react'; 

const footerLinks = [
  { 
    title: "Quick Links", 
    links: [
      { name: "Strategy", href: "#workflow", type: "internal" },
      { name: "Build", href: "#projects", type: "internal" },
      { name: "Market", href: "#cta", type: "internal" },
      { name: "Projects", href: "#projects", type: "internal" },
    ]
  },
  { 
    title: "Information", 
    links: [
      { name: "Privacy Policy", href: "#privacy", type: "external" },
      { name: "Terms of Service", href: "#terms", type: "external" },
      { name: "Support", href: "mailto:support@s-forge.com", type: "external" },
    ]
  },
];

const SiteFooter = () => {
    
  const handleLinkClick = (e, link) => {
    if (link.type === 'internal') {
        // Prevent default browser refresh for internal SPA links
        e.preventDefault(); 
        const targetElement = document.getElementById(link.href.substring(1));
        if (targetElement) {
            // Smooth scroll to the section
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (link.href.startsWith('#')) {
         // Also prevent refresh for external type links that are currently only placeholders
         e.preventDefault(); 
         console.log(`[FOOTER] Placeholder link clicked for: ${link.name}`);
    }
    // External links (like mailto or real URLs) will proceed normally
  };
    
  return (
    <footer className="bg-s-primary text-gray-400 py-12 md:py-16 border-t border-s-accent/20">
      <div className="container mx-auto px-4">
        
        {/* Main Grid for Content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-10">
          
          {/* S-Forge Branding */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-1"
          >
            <h3 className="text-3xl font-black text-s-accent mb-3">S-Forge</h3>
            <p className="text-sm">Vision to Reality. Focused excellence for Web, Web3, and AI.</p>
          </motion.div>
          
          {/* Quick Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-s-background mb-4 border-b border-s-accent/30 pb-1">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link)}
                      className="text-gray-400 hover:text-s-accent transition duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          
          {/* Creator Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-s-background mb-4 border-b border-s-accent/30 pb-1">Creator: Solomough</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Github className="w-4 h-4 text-s-accent" />
                <a 
                  href="https://github.com/Solomough" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-s-accent transition duration-300 text-sm"
                >
                  GitHub: @Solomough
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Twitter className="w-4 h-4 text-s-accent" />
                <a 
                  href="https://twitter.com/Solomough" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-s-accent transition duration-300 text-sm"
                >
                  X: @Solomough
                </a>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Copyright and Bottom Text */}
        <div className="text-center pt-8 border-t border-s-accent/20">
          <p className="text-sm text-gray-500">
            © 2025 S-Forge. All rights reserved.
          </p>
          <p className="text-xs mt-1 text-gray-600">
            Forged with excellence and vision by Solomough.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default SiteFooter;
