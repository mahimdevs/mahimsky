import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from '@/lib/supabase';
import { FlaskConical, Beaker, TestTube, Atom, Coins, Gift, Trophy, Zap, Clock, DollarSign, Star, Target, Calculator, Map, Sword, Wrench, Rocket, Crown, Heart, Shield, Gem, Wallet, CreditCard, PiggyBank, ArrowRight } from "lucide-react";

interface Experiment {
  id?: string;
  title: string;
  description: string;
  status: 'live' | 'testing' | 'coming';
  imageUrl?: string;
  link?: string;
  slug?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical, Beaker, TestTube, Atom, Coins, Gift, Trophy, Zap, Clock, DollarSign, Star, Target, Calculator, Map, Sword, Wrench, Rocket, Crown, Heart, Shield, Gem, Wallet, CreditCard, PiggyBank
};

const statusStyles = {
  live: 'bg-green-500/20 text-green-600 border-green-500/30',
  testing: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
  coming: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
};

const statusLabels = {
  live: 'LIVE',
  testing: 'TESTING',
  coming: 'SOON',
};

const Experiments = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const { data, error } = await supabase.from('experiments').select('*');
        if (error) throw error;
        setExperiments(data || []);
      } catch (error) {
        console.error('Failed to fetch experiments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiments();
  }, []);

  const renderCard = (exp: Experiment) => {
    const cardContent = (
      <div className="overflow-hidden">
        <div className="flex items-start justify-between mb-3 md:mb-4 gap-2">
          {exp.imageUrl ? (
            <img 
              src={exp.imageUrl} 
              alt={exp.title} 
              className="w-10 h-10 md:w-12 md:h-12 object-cover rounded flex-shrink-0" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <FlaskConical className={`w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0 ${exp.imageUrl ? 'hidden' : ''}`} />
          <span className={`font-pixel text-[8px] md:text-[10px] px-1.5 md:px-2 py-0.5 md:py-1 rounded border flex-shrink-0 ${statusStyles[exp.status]}`}>
            {statusLabels[exp.status]}
          </span>
        </div>
        <h3 className="font-pixel text-[10px] md:text-sm break-words overflow-hidden mb-2">{exp.title}</h3>
        <p className="text-xs md:text-sm text-muted-foreground break-words overflow-hidden line-clamp-3">{exp.description}</p>
        
        {/* Footer */}
        <div className="mt-3 md:mt-4 pt-2 md:pt-3 border-t border-border/50">
          <span className="text-[10px] md:text-xs text-primary font-medium flex items-center gap-1">
            Read more
            <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3" />
          </span>
        </div>
      </div>
    );

    const cardClasses = "group pixel-border p-4 md:p-6 hover-glow block transition-transform hover:scale-[1.02] overflow-hidden";

    // If has slug, link to individual post page
    if (exp.slug) {
      return (
        <Link 
          key={exp.id} 
          to={`/experiments/${exp.slug}`}
          className={cardClasses}
        >
          {cardContent}
        </Link>
      );
    }

    return (
      <div key={exp.id} className={cardClasses}>
        {cardContent}
      </div>
    );
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Experiments - Mahimsky",
    "description": "Explore beta features, test new mechanics, and help shape the future of Mahimsky.",
    "url": "https://mahimsky.lovable.app/experiments",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Mahimsky",
      "url": "https://mahimsky.lovable.app"
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Experiments - Beta Features & Testing"
        description="Explore Mahimsky's experimental features and beta projects. Test new mechanics and help shape the future of our platform."
        keywords="mahimsky experiments, beta features, crypto testing, web3 experiments, blockchain beta"
        canonicalPath="/experiments"
        structuredData={structuredData}
      />
      <Header />
      <main className="container py-8 md:py-12 px-3 md:px-4 flex-1">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <FlaskConical className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            <h1 className="font-pixel text-lg md:text-2xl lg:text-3xl text-foreground">EXPERIMENTS</h1>
          </div>
          <p className="text-xs md:text-base text-muted-foreground max-w-xs md:max-w-xl mx-auto px-2">
            Explore beta features, test new mechanics, and help shape the future of the platform.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : experiments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">No experiments available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {experiments.map(renderCard)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Experiments;