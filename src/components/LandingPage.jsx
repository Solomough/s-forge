import SiteHeader from './SiteHeader.jsx'; 
import HeroSection from './HeroSection.jsx'; 
import WorkflowSection from './WorkflowSection.jsx'; 
import CaseStudiesSection from './CaseStudiesSection.jsx'; 
import CallToActionSection from './CallToActionSection.jsx'; 
import SiteFooter from './SiteFooter.jsx'; 

// CRITICAL: Now correctly accepts all necessary props from App.jsx
const LandingPage = ({ onLaunchTool, onViewEngine, currentUser, onSignOut, onOpenAuthModal }) => {
  return (
    <>
      {/* 1. Pass all props needed for Auth/Navigation to the SiteHeader */}
      <SiteHeader 
        onLaunchTool={onLaunchTool} 
        onViewEngine={onViewEngine} 
        currentUser={currentUser}
        onSignOut={onSignOut}
        onOpenAuthModal={onOpenAuthModal}
      />
      <main className="flex-grow pt-20"> 
        <HeroSection onLaunchTool={onLaunchTool} /> 
        <WorkflowSection onViewEngine={onViewEngine} /> 
        <CaseStudiesSection /> 
        {/* 2. CRITICAL: Pass the onOpenAuthModal prop to the CallToActionSection */}
        <CallToActionSection onOpenAuthModal={onOpenAuthModal} /> 
      </main>
      <SiteFooter />
    </>
  );
};

export default LandingPage;
