import SiteHeader from './SiteHeader.jsx'; 
import HeroSection from './HeroSection.jsx'; 
import WorkflowSection from './WorkflowSection.jsx'; 
import CaseStudiesSection from './CaseStudiesSection.jsx'; 
import CallToActionSection from './CallToActionSection.jsx'; 
import SiteFooter from './SiteFooter.jsx'; 

// Accepts both navigation handlers
const LandingPage = ({ onLaunchTool, onViewEngine }) => {
  return (
    <>
      {/* Pass both navigation props to the header */}
      <SiteHeader 
        onLaunchTool={onLaunchTool} 
        onViewEngine={onViewEngine} 
      />
      <main className="flex-grow pt-20"> {/* Added pt-20 to push content below the fixed header */}
        <HeroSection onLaunchTool={onLaunchTool} /> 
        {/* Pass onViewEngine down so WorkflowSection CTAs can navigate */}
        <WorkflowSection onViewEngine={onViewEngine} /> 
        <CaseStudiesSection /> 
        <CallToActionSection /> 
      </main>
      <SiteFooter />
    </>
  );
};

export default LandingPage;
