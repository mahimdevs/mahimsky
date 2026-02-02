import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from '@/lib/supabase';
import { Coins, Gift, Trophy, Zap, Clock, DollarSign, Star, Target, Calculator, Map, Sword, Wrench, Beaker, TestTube, Atom, FlaskConical, Rocket, Crown, Heart, Shield, Gem, Wallet, CreditCard, PiggyBank, ExternalLink } from "lucide-react";

interface EarnItem {
  id?: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  link?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Coins, Gift, Trophy, Zap, Clock, DollarSign, Star, Target, Calculator, Map, Sword, Wrench, Beaker, TestTube, Atom, FlaskConical, Rocket, Crown, Heart, Shield, Gem, Wallet, CreditCard, PiggyBank
};

const Earn = () => {
  const [items, setItems] = useState<EarnItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase.from('earn').select('*');
        if (error) throw error;
        setItems(data || []);
      } catch (error) {
        console.error('Failed to fetch earn items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const renderCard = (item: EarnItem) => {
    const IconComponent = iconMap[item.icon] || Coins;
    
    const cardContent = (
      <div className="h-full flex flex-col">
        {/* Image/Icon Header */}
        <div className="relative mb-3 md:mb-4">
          {item.imageUrl ? (
            <div className="w-full h-24 md:h-32 rounded-sm overflow-hidden bg-muted/50">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 flex items-center justify-center bg-muted/30">
                <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-primary/60" />
              </div>
            </div>
          ) : (
            <div className="w-full h-24 md:h-32 rounded-sm bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-pixel text-[10px] md:text-xs leading-relaxed text-foreground line-clamp-2">{item.title}</h3>
            {item.link && (
              <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground flex-shrink-0 transition-colors group-hover:text-primary" />
            )}
          </div>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-3 flex-1">{item.description}</p>
        </div>
        
        {/* Footer accent */}
        <div className="mt-3 md:mt-4 pt-2 md:pt-3 border-t border-border/50">
          <span className="text-[10px] md:text-xs text-primary font-medium flex items-center gap-1">
            {item.link ? 'Learn more' : 'Coming soon'}
            {item.link && <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3" />}
          </span>
        </div>
      </div>
    );

    const cardClasses = "group relative pixel-border p-4 md:p-5 hover-glow bg-card transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden h-full";

    if (item.link) {
      return (
        <a 
          key={item.id} 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className={cardClasses}
        >
          {cardContent}
        </a>
      );
    }

    return (
      <div key={item.id} className={cardClasses}>
        {cardContent}
      </div>
    );
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Earn - Mahimsky",
    "description": "Discover ways to earn rewards, coins, and exclusive items on Mahimsky.",
    "url": "https://mahimsky.lovable.app/earn",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Mahimsky",
      "url": "https://mahimsky.lovable.app"
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Earn - Rewards & Opportunities"
        description="Discover ways to earn rewards, coins, and exclusive items on Mahimsky. Participate in activities and challenges to unlock earnings."
        keywords="mahimsky earn, crypto rewards, earn coins, gaming rewards, web3 earning, passive income crypto"
        canonicalPath="/earn"
        structuredData={structuredData}
      />
      <Header />
      <main className="container py-8 md:py-12 px-3 md:px-4 flex-1">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <Coins className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            <h1 className="font-pixel text-lg md:text-2xl lg:text-3xl text-foreground">EARN</h1>
          </div>
          <p className="text-xs md:text-base text-muted-foreground max-w-xs md:max-w-xl mx-auto px-2">
            Discover ways to earn rewards, coins, and exclusive items through various activities and challenges.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">No earn methods available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {items.map(renderCard)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Earn;