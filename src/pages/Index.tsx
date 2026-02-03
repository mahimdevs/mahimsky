import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LiveStatsWidget from "@/components/LiveStatsWidget";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SocialSidebar from "@/components/SocialSidebar";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mahimsky",
    "url": "https://mahimsky.lovable.app",
    "logo": "https://mahimsky.lovable.app/lovable-uploads/8ba2b6ae-51fe-4869-af49-8e01459836f3.png",
    "description": "Mahimsky - Your digital platform for real earning experiments, investments, and building in public.",
    "sameAs": []
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Mahimsky - Where Opportunities Begin"
        description="Mahimsky is your digital platform for real earning experiments, investment tracking, and building in public. No hype, just real results."
        keywords="mahimsky, crypto, gaming, blockchain, web3, investments, earn, experiments, passive income"
        canonicalPath="/"
        structuredData={structuredData}
      />
      <Header />
      <main>
        <HeroSection />
        <LiveStatsWidget />
      </main>
      <Footer />
      <SocialSidebar />
    </div>
  );
};

export default Index;
