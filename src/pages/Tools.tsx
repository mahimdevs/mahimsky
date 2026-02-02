import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from '@/lib/supabase';
import { Wrench, Calculator, Map, Sword, Coins, Gift, Trophy, Zap, Clock, DollarSign, Star, Target, Beaker, TestTube, Atom, FlaskConical, Rocket, Crown, Heart, Shield, Gem, Wallet, CreditCard, PiggyBank, ExternalLink } from "lucide-react";

interface Tool {
  id?: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  link?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench, Calculator, Map, Sword, Coins, Gift, Trophy, Zap, Clock, DollarSign, Star, Target, Beaker, TestTube, Atom, FlaskConical, Rocket, Crown, Heart, Shield, Gem, Wallet, CreditCard, PiggyBank
};

const Tools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const { data, error } = await supabase.from('tools').select('*');
        if (error) throw error;
        setTools(data || []);
      } catch (error) {
        console.error('Failed to fetch tools:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  const renderCard = (tool: Tool) => {
    const IconComponent = iconMap[tool.icon] || Wrench;
    
    const cardContent = (
      <div className="overflow-hidden">
        {tool.imageUrl ? (
          <img 
            src={tool.imageUrl} 
            alt={tool.title} 
            className="w-10 h-10 md:w-12 md:h-12 object-cover rounded mb-3 md:mb-4 flex-shrink-0" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <IconComponent className={`w-6 h-6 md:w-8 md:h-8 text-primary mb-3 md:mb-4 flex-shrink-0 ${tool.imageUrl ? 'hidden' : ''}`} />
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-pixel text-[10px] md:text-sm break-words overflow-hidden">{tool.title}</h3>
          {tool.link && <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3 text-muted-foreground flex-shrink-0" />}
        </div>
        <p className="text-xs md:text-sm text-muted-foreground break-words overflow-hidden line-clamp-3">{tool.description}</p>
      </div>
    );

    if (tool.link) {
      return (
        <a 
          key={tool.id} 
          href={tool.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="pixel-border p-4 md:p-6 hover-glow block transition-transform hover:scale-[1.02] overflow-hidden"
        >
          {cardContent}
        </a>
      );
    }

    return (
      <div key={tool.id} className="pixel-border p-4 md:p-6 hover-glow overflow-hidden">
        {cardContent}
      </div>
    );
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Tools - Mahimsky",
    "description": "Useful utilities, calculators, and resources for crypto gaming and Web3.",
    "url": "https://mahimsky.lovable.app/tools",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Mahimsky",
      "url": "https://mahimsky.lovable.app"
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Tools - Calculators & Utilities"
        description="Explore Mahimsky's collection of useful tools, calculators, and utilities for crypto gaming and Web3. Enhance your experience with our free resources."
        keywords="mahimsky tools, crypto calculator, gaming utilities, web3 tools, blockchain resources"
        canonicalPath="/tools"
        structuredData={structuredData}
      />
      <Header />
      <main className="container py-8 md:py-12 px-3 md:px-4 flex-1">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <Wrench className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            <h1 className="font-pixel text-lg md:text-2xl lg:text-3xl text-foreground">TOOLS</h1>
          </div>
          <p className="text-xs md:text-base text-muted-foreground max-w-xs md:max-w-xl mx-auto px-2">
            Useful utilities, calculators, and resources to enhance your experience.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">No tools available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {tools.map(renderCard)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Tools;