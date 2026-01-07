import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HelpSection from "@/components/HelpSection";
import ExperimentsSection from "@/components/ExperimentsSection";
import ToolsSection from "@/components/ToolsSection";
import GuidesSection from "@/components/GuidesSection";
import TransparencySection from "@/components/TransparencySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HelpSection />
        <ExperimentsSection />
        <ToolsSection />
        <GuidesSection />
        <TransparencySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
