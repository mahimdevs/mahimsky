import { useState, useEffect } from 'react';
import Header from "@/components/Header";
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
            className="w-12 h-12 object-cover rounded mb-4 flex-shrink-0" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <IconComponent className={`w-8 h-8 text-primary mb-4 flex-shrink-0 ${tool.imageUrl ? 'hidden' : ''}`} />
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-pixel text-sm break-words overflow-hidden">{tool.title}</h3>
          {tool.link && <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />}
        </div>
        <p className="text-sm text-muted-foreground break-words overflow-hidden">{tool.description}</p>
      </div>
    );

    if (tool.link) {
      return (
        <a 
          key={tool.id} 
          href={tool.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="pixel-border p-6 hover-glow block transition-transform hover:scale-[1.02] overflow-hidden"
        >
          {cardContent}
        </a>
      );
    }

    return (
      <div key={tool.id} className="pixel-border p-6 hover-glow overflow-hidden">
        {cardContent}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Wrench className="w-10 h-10 text-primary" />
            <h1 className="font-pixel text-2xl md:text-3xl text-foreground">TOOLS</h1>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Useful utilities, calculators, and resources to enhance your experience.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tools available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(renderCard)}
          </div>
        )}
      </main>
    </div>
  );
};

export default Tools;
