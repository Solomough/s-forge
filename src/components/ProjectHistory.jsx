import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getFirestore, collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { Briefcase, Clock, FileText, Code, BarChart, Loader2, Zap } from 'lucide-react';
import SiteHeader from './SiteHeader.jsx';
import { User } from 'firebase/auth';

const iconMap = {
    'Blueprint Ready': FileText,
    'Code Generated': Code,
    'Strategy Complete': FileText,
    'Marketing Strategy Ready': BarChart,
};

// Component to display a single project card
const ProjectCard = ({ project, onViewEngine, setActiveProjectId }) => {
    const Icon = iconMap[project.status] || Briefcase;
    const date = project.createdAt?.toDate ? project.createdAt.toDate().toLocaleDateString() : 'N/A';
    
    // Determine the next logical step for the CTA button
    const getNextAction = (status) => {
        switch(status) {
            case 'Blueprint Ready':
            case 'Strategy Complete':
                return { label: 'Start Build Engine →', target: 'build-details' };
            case 'Code Generated':
                return { label: 'Start Market Engine →', target: 'market-details' };
            case 'Marketing Strategy Ready':
                return { label: 'Review Project', target: 'market-details' };
            default:
                return { label: 'Review Details', target: 'build-details' };
        }
    };

    const action = getNextAction(project.status);

    const handleView = () => {
        // Set the active project ID in the App state
        setActiveProjectId(project.id); 
        // Navigate to the correct engine
        onViewEngine(action.target);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-s-accent transition duration-300 shadow-lg flex flex-col justify-between"
        >
            <div>
                <div className="flex items-center space-x-3 mb-3">
                    <Icon className="w-5 h-5 text-s-accent" />
                    <h3 className="text-xl font-bold text-s-background line-clamp-1">{project.title || `Project ID: ${project.id.substring(0, 8)}...`}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.answers?.[1] || 'No core purpose defined.'}</p>
            </div>
            
            <div>
                <div className="flex justify-between items-center text-xs text-gray-500 mb-4 pt-4 border-t border-gray-700/50">
                    <span className="flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>{project.status}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{date}</span>
                    </span>
                </div>
                
                <button
                    onClick={handleView}
                    className="w-full px-4 py-2 bg-s-accent text-s-primary font-medium rounded-lg hover:bg-opacity-90 transition duration-200 text-sm"
                >
                    {action.label}
                </button>
            </div>
        </motion.div>
    );
};

const ProjectsHistory = ({ onViewEngine, db, currentUser, appId, setActiveProjectId }) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = currentUser?.uid;

    useEffect(() => {
        if (!db || !userId) {
            setIsLoading(false);
            if (!userId) {
                setError("Authentication required to view projects.");
            }
            return;
        }

        const projectPath = `artifacts/${appId}/users/${userId}/projects`;
        const q = query(
            collection(db, projectPath),
            orderBy('createdAt', 'desc')
        );

        // Real-time listener for projects
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const projectsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProjects(projectsList);
            setIsLoading(false);
            setError(null);
        }, (err) => {
            console.error("Firestore Projects Fetch Error:", err);
            setError("Failed to load projects. Check database connection.");
            setIsLoading(false);
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, [db, userId, appId]);


    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="text-center py-16">
                    <Loader2 className="animate-spin h-10 w-10 text-s-accent mx-auto mb-4" />
                    <p className="text-xl text-gray-400">Loading your project artifacts...</p>
                </div>
            );
        }

        if (error) {
             return (
                <div className="text-center py-16 text-red-400 bg-gray-700 p-8 rounded-xl">
                    <p className="text-lg font-medium">Error: {error}</p>
                    <p className="text-sm mt-2">Please ensure you are signed in and Firebase is configured correctly.</p>
                </div>
            );
        }

        if (projects.length === 0) {
            return (
                <div className="text-center py-16">
                    <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-s-background mb-2">No Projects Found</h2>
                    <p className="text-gray-400">Start a new project with the Strategy Engine to see your history.</p>
                    <button
                        onClick={() => onViewEngine('strategy-tool')}
                        className="mt-6 px-6 py-3 bg-s-accent text-s-primary font-bold rounded-lg shadow-md hover:bg-opacity-90 transition duration-300"
                    >
                        Start New Project →
                    </button>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        onViewEngine={onViewEngine}
                        setActiveProjectId={setActiveProjectId} 
                    />
                ))}
            </div>
        );
    };


    return (
        <div className="min-h-screen bg-gray-900 text-s-background flex flex-col">
            <SiteHeader onViewEngine={onViewEngine} currentUser={currentUser} />
            
            <main className="flex-grow container mx-auto px-4 py-12 pt-32"> 
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <h1 className="text-4xl font-extrabold text-white mb-2">
                        Project History
                    </h1>
                    <p className="text-xl text-s-accent/80 mb-10">
                        Artifacts forged by S-Forge, saved to your private cloud.
                    </p>
                    
                    {renderContent()}
                </motion.div>
            </main>
        </div>
    );
};

export default ProjectsHistory;
