import { motion } from 'framer-motion';

// Data for the three workflow stages
const workflowStages = [
  {
    id: 1,
    title: "Strategy Engine",
    description: "The AI acts as your professional strategist, asking expert questions to define vision, audience, and technical requirements. Output: The Project Blueprint.",
    icon: (
      <svg className="w-10 h-10 text-s-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.023 12.023 0 005.478 20.531c-.346-.073-.68-.198-.992-.375M21 12c0 4.418-3.358 8-7.5 8s-7.5-3.582-7.5-8 3.358-8 7.5-8 7.5 3.582 7.5 8zM15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    ), // Shield/Protection icon for strategic defense
  },
  {
    id: 2,
    title: "Build Engine",
    description: "The AI becomes the master developer, generating pristine, file-by-file code (React/Tailwind/Framer Motion). Focus is on excellence, accuracy, and modularity. Output: Code Canvas.",
    icon: (
      <svg className="w-10 h-10 text-s-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
    ), // Code Brackets icon for development
  },
  {
    id: 3,
    title: "Market Engine",
    description: "The final step integrates professional digital marketing strategy, positioning your product for global reach, audience growth, and commercial success. Output: Launch Plan.",
    icon: (
      <svg className="w-10 h-10 text-s-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l7-7m0 0l7 7m-7-7v18"></path></svg>
    ), // Launch/Growth icon for market penetration
  },
];

// Framer Motion variants for staggered entry of the three steps
const listVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  hidden: {
    opacity: 0,
  }
};

const itemVariants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  hidden: { opacity: 0, y: 50 },
};

const WorkflowSection = () => {
  return (
    <section id="strategy" className="py-24 md:py-32 bg-s-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-s-text mb-4"
          >
            The S-Forge Process: Excellence in Three Stages
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We transform your vision into a professional, market-ready digital asset with unmatched precision.
          </motion.p>
        </div>

        {/* Workflow Steps Container */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-3 gap-10"
        >
          {workflowStages.map((stage) => (
            <motion.div 
              key={stage.id} 
              variants={itemVariants}
              className="relative p-8 bg-white border border-gray-100 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] group"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-s-primary rounded-full mb-6">
                {stage.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-s-text mb-3">
                {stage.id}. {stage.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {stage.description}
              </p>
              
              {/* Futuristic Accent Line between steps on desktop */}
              {stage.id < workflowStages.length && (
                <div className="hidden md:block absolute top-1/2 right-[-20%] w-[40%] h-0.5 bg-s-accent opacity-30 transform -translate-y-1/2"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional CTA below the workflow */}
        <div className="text-center mt-16">
            <motion.a
                href="#demo"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="inline-block px-8 py-3 bg-s-primary text-s-accent font-semibold rounded-lg hover:bg-s-accent hover:text-s-primary border border-s-accent transition duration-300"
            >
                See the Process in Action
            </motion.a>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
                       
