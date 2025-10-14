import { motion } from 'framer-motion';

// Data for example projects forged by S-Forge
const projects = [
  {
    title: "Vizion DAO Dashboard",
    description: "A high-performance Web3 governance dashboard built for community management and token staking.",
    stack: ["React", "Web3.js", "Tailwind CSS", "Framer Motion"],
    link: "#",
    delay: 0.1,
  },
  {
    title: "AI Prompt Generator",
    description: "An intuitive AI tool wrapper for creative content generation, focused on clean UX and speed.",
    stack: ["React", "OpenAI API", "Tailwind CSS"],
    link: "#",
    delay: 0.2,
  },
  {
    title: "Solomough Portfolio v3",
    description: "The creator's own vision brought to life, merging personal brand narrative with cutting-edge tech showcases.",
    stack: ["React", "Framer Motion", "Tailwind CSS", "SEO Focus"],
    link: "#",
    delay: 0.3,
  },
];

// Framer Motion variants for card entry
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 70 
    } 
  }
};

const CaseStudiesSection = () => {
  return (
    <section id="projects" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-s-primary mb-4"
          >
            Proof of Excellence: Projects Forged
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            See the results of the **Build Engine**—high-quality, focused solutions leveraging the best in modern web development.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: project.delay }}
              className="bg-s-background border border-gray-200 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 transform hover:translate-y-[-5px]"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-s-text mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-s-primary text-s-accent border border-s-accent/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* View Project Button */}
                <a 
                  href={project.link}
                  className="inline-block px-4 py-2 bg-s-accent text-s-primary font-semibold text-sm rounded-lg hover:bg-s-primary hover:text-s-accent border border-s-accent transition duration-300"
                >
                  View Project Case Study &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
