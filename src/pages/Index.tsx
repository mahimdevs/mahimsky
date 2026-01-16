import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LiveStatsWidget from "@/components/LiveStatsWidget";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
