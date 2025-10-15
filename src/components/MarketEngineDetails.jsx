import { motion } from 'framer-motion';
import SiteHeader from './SiteHeader.jsx'; 
import { DollarSign, Rocket, Target, Users } from 'lucide-react';

const MarketEngineDetails = ({ onReturnToLanding, onViewEngine }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-s-background flex flex-col">
        {/* SiteHeader for universal navigation */}
        <SiteHeader 
            onLaunchTool={() => onViewEngine('strategy-tool')} 
            onViewEngine={onViewEngine} 
        />
        
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center pt-32">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center w-full max-w-5xl"
            >
                <div className="p-12 rounded-2xl bg-s-primary border border-s-accent/30 shadow-2xl">
                    <Rocket className="w-16 h-16 text-s-accent mx-auto mb-6" />
                    <h1 className="text-5xl font-black text-s-background mb-4">
                        🚀 Market Engine (Phase 3)
                    </h1>
                    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        The Market Engine reviews your completed, live project and acts as your **Professional Digital Marketer**, creating a launch and growth strategy tailored to your target audience.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-s-accent font-bold mb-2 flex items-center justify-center space-x-2"><Target className='w-4 h-4' /> Focus</h3>
                            <p className="text-gray-300 text-sm">Review project goals, identify key value propositions, and analyze competition.</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-s-accent font-bold mb-2 flex items-center justify-center space-x-2"><Users className='w-4 h-4' /> Channels</h3>
                            <p className="text-gray-300 text-sm">Recommends the best social media, content, and paid advertising channels.</p>
                        </div>
                         <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-s-accent font-bold mb-2 flex items-center justify-center space-x-2"><DollarSign className='w-4 h-4' /> Output</h3>
                            <p className="text-gray-300 text-sm">A full, actionable Launch Plan, including suggested budget allocation and KPI tracking.</p>
                        </div>
                    </div>

                    <button
                        onClick={onReturnToLanding}
                        className="mt-4 px-8 py-3 bg-gray-700 text-gray-300 font-bold rounded-lg shadow-xl hover:bg-gray-600 transition duration-300 transform hover:scale-[1.03]"
                    >
                        ← Return to Landing Page
                    </button>
                </div>
            </motion.div>
        </main>
    </div>
  );
};

export default MarketEngineDetails;
