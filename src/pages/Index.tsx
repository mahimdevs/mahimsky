import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LiveStatsWidget from "@/components/LiveStatsWidget";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mahimsky",
    "url": "https://mahimsky.lovable.app",
    "logo": "https://mahimsky.lovable.app/lovable-uploads/8ba2b6ae-51fe-4869-af49-8e01459836f3.png",
    "description": "Mahimsky - Your gateway to crypto gaming, investments, and earning opportunities in the Web3 space.",
    "sameAs": []
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Mahimsky - Where Opportunities Begin"
        description="Mahimsky is your gateway to crypto gaming, investments, tools, and earning opportunities. Discover experiments, track investments, and explore the Web3 ecosystem."
        keywords="mahimsky, crypto, gaming, blockchain, web3, investments, earn, tools, experiments"
        canonicalPath="/"
        structuredData={structuredData}
      />
      <Header />
      <main>
        <HeroSection />
        <LiveStatsWidget />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
