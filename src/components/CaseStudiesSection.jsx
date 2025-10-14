import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react'; // Example Icon

// Data for case studies
const caseStudies = [
  {
    title: "Vizion DAO Dashboard",
    description: "A high-performance Web3 governance dashboard built for community management and token staking.",
    tech: ["React", "Web3.js", "Tailwind CSS", "Framer Motion"],
    link: "https://case-study-viziondao.com", // Placeholder URL
  },
  {
    title: "AI Prompt Generator",
    description: "An intuitive AI tool wrapper for creative content generation, focused on clean UX and speed.",
    tech: ["React", "OpenAI API", "Tailwind CSS"],
    link: "https://case-study-aiprompt.com", // Placeholder URL
  },
  {
    title: "Solomough Portfolio v3",
    description: "The creator's own vision brought to life, merging personal brand narrative with cutting-edge tech showcases.",
    tech: ["React", "Framer Motion", "Tailwind CSS", "SEO Focus"],
    link: "https://solo-mough-yh1r.vercel.app", // Placeholder URL
  },
];

const CaseStudiesSection = () => {
    
  const handleCaseStudyClick = (title) => {
      // Action simulation instead of a hard link that reloads
      console.log(`[PROJECTS] Navigating to simulated case study for: ${title}`);
      // NOTE: Using a custom modal/message box instead of alert()
      alert(`Viewing simulated case study for: ${title}. (In a full app, this would load a new page or modal).`);
  };

  return (
    <section id="projects" className="py-20 md:py-32 bg-s-primary text-s-background">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-s-accent"
        >
          Proof of Excellence: Projects Forged
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center text-lg sm:text-xl font-light text-gray-400 max-w-3xl mx-auto mb-16"
        >
          See the results of the **Build Engine**—high-quality, focused solutions leveraging the best in modern web development.
        </motion.p>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-gray-800 p-8 rounded-2xl shadow-xl border-t-4 border-s-accent/50 flex flex-col justify-between transform hover:shadow-s-accent/30 transition duration-300"
            >
              <div>
                <h3 className="text-2xl font-bold mb-3 text-s-background">{study.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow">{study.description}</p>
                
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-3 py-1 bg-s-accent/10 text-s-accent rounded-full border border-s-accent/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Functional CTA Button */}
              <button
                onClick={() => handleCaseStudyClick(study.title)}
                className="mt-4 flex items-center text-s-accent font-semibold hover:text-s-background transition duration-300 group"
              >
                View Project Case Study 
                <ChevronRight className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
