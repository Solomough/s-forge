import SiteHeader from './SiteHeader.jsx'; 
import HeroSection from './HeroSection.jsx'; 
import WorkflowSection from './WorkflowSection.jsx'; 
import CaseStudiesSection from './CaseStudiesSection.jsx'; 
import CallToActionSection from './CallToActionSection.jsx'; 
import SiteFooter from './SiteFooter.jsx'; 

const LandingPage = ({ onLaunchTool }) => {
  return (
    <>
      <SiteHeader onLaunchTool={onLaunchTool} />
      <main className="flex-grow">
        {/* We need to update the Hero CTA to use the onLaunchTool prop */}
        <HeroSection onLaunchTool={onLaunchTool} /> 
        <WorkflowSection /> 
        <CaseStudiesSection /> 
        <CallToActionSection /> 
      </main>
      <SiteFooter />
    </>
  );
};

export default LandingPage;
