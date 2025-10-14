import { motion } from 'framer-motion';

// External link data for the creator
const creatorLinks = [
  { 
    name: "GitHub: @Solomough", 
    href: "https://github.com/Solomough", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.741.083-.725.083-.725 1.2.083 1.838 1.215 1.838 1.215 1.066 1.82 2.809 1.299 3.49.991.107-.775.418-1.299.762-1.599-2.665-.304-5.467-1.334-5.467-5.931 0-1.31.467-2.383 1.235-3.221-.123-.304-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.29-1.552 3.301-1.23 3.301-1.23.653 1.652.241 2.872.118 3.176.767.838 1.233 1.911 1.233 3.221 0 4.609-2.808 5.621-5.474 5.918.423.367.791 1.095.791 2.217v3.293c0 .319.192.694.8 0 4.773-1.588 8.2-6.085 8.2-11.386 0-6.627-5.373-12-12-12z"/></svg>
    )
  },
  { 
    name: "X: @Solomough", 
    href: "https://x.com/Solomough?t=WDxBeJ3Vi7aBXWM1us00IQ&s=09", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.741.083-.725.083-.725 1.2.083 1.838 1.215 1.838 1.215 1.066 1.82 2.809 1.299 3.49.991.107-.775.418-1.299.762-1.599-2.665-.304-5.467-1.334-5.467-5.931 0-1.31.467-2.383 1.235-3.221-.123-.304-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.29-1.552 3.301-1.23 3.301-1.23.653 1.652.241 2.872.118 3.176.767.838 1.233 1.911 1.233 3.221 0 4.609-2.808 5.621-5.474 5.918.423.367.791 1.095.791 2.217v3.293c0 .319.192.694.8 0 4.773-1.588 8.2-6.085 8.2-11.386 0-6.627-5.373-12-12-12z"/></svg>
    ) // Using a generic placeholder icon for X for now, as Twitter/X's icon changes frequently.
  },
];

// Footer menu links (matching the header for consistency)
const footerNav = [
  { name: "Strategy", href: "#strategy" },
  { name: "Build", href: "#build" },
  { name: "Market", href: "#market" },
  { name: "Projects", href: "#projects" },
];

const SiteFooter = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      // Use the primary brand color (Black) for a sophisticated footer
      className="bg-s-primary text-gray-300 py-12 border-t border-s-accent/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-s-accent/20 pb-8 mb-8">
          
          {/* S-Forge Branding */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="text-3xl font-extrabold text-s-background tracking-tight">
              <span className="text-s-accent">S</span>-Forge
            </a>
            <p className="mt-4 text-sm max-w-xs">
              Vision to Reality. Focused excellence for Web, Web3, and AI.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-s-accent mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerNav.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm hover:text-s-accent transition duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal/Info */}
          <div>
            <h4 className="text-lg font-semibold text-s-accent mb-4">Information</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-s-accent transition duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-s-accent transition duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-sm hover:text-s-accent transition duration-200">Support</a></li>
            </ul>
          </div>
          
          {/* Creator Links */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold text-s-accent mb-4">Creator: Solomough</h4>
            <div className="flex space-x-4">
              {creatorLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-s-accent transition duration-200 flex items-center space-x-2"
                  title={link.name}
                >
                  {/* Icon and Name */}
                  {link.icon}
                  <span className="sr-only sm:not-sr-only text-sm">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Copyright and Signature */}
        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} S-Forge. All rights reserved.</p>
          <p className="mt-1 text-xs text-gray-500">
            Forged with excellence and vision by Solomough.
          </p>
        </div>
        
      </div>
    </motion.footer>
  );
};

export default SiteFooter;
