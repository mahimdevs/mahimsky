import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FlaskConical, Beaker, TestTube, Atom, Coins, Gift, Trophy, Zap, Clock, DollarSign, Star, Target, Calculator, Map, Sword, Wrench, Rocket, Crown, Heart, Shield, Gem, Wallet, CreditCard, PiggyBank, ExternalLink } from "lucide-react";

interface Experiment {
  id?: string;
  title: string;
  description: string;
  status: 'live' | 'testing' | 'coming';
  imageUrl?: string;
  link?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical, Beaker, TestTube, Atom, Coins, Gift, Trophy, Zap, Clock, DollarSign, Star, Target, Calculator, Map, Sword, Wrench, Rocket, Crown, Heart, Shield, Gem, Wallet, CreditCard, PiggyBank
};

const statusStyles = {
  live: 'bg-green-500/20 text-green-400 border-green-500/30',
  testing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  coming: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const statusLabels = {
  live: 'LIVE',
  testing: 'TESTING',
  coming: 'COMING SOON',
};

const Experiments = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const snap = await getDocs(collection(db, 'experiments'));
        setExperiments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Experiment)));
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
      <>
        <div className="flex items-start justify-between mb-4">
          {exp.imageUrl ? (
            <img src={exp.imageUrl} alt={exp.title} className="w-12 h-12 object-cover rounded" />
          ) : (
            <FlaskConical className="w-8 h-8 text-primary" />
          )}
          <span className={`font-pixel text-[10px] px-2 py-1 rounded border ${statusStyles[exp.status]}`}>
            {statusLabels[exp.status]}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-pixel text-sm">{exp.title}</h3>
          {exp.link && <ExternalLink className="w-3 h-3 text-muted-foreground" />}
        </div>
        <p className="text-sm text-muted-foreground">{exp.description}</p>
      </>
    );

    if (exp.link) {
      return (
        <a 
          key={exp.id} 
          href={exp.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="pixel-border p-6 hover-glow block transition-transform hover:scale-[1.02]"
        >
          {cardContent}
        </a>
      );
    }

    return (
      <div key={exp.id} className="pixel-border p-6 hover-glow">
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
            <FlaskConical className="w-10 h-10 text-primary" />
            <h1 className="font-pixel text-2xl md:text-3xl text-foreground">EXPERIMENTS</h1>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore beta features, test new mechanics, and help shape the future of the platform.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : experiments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No experiments available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map(renderCard)}
          </div>
        )}
      </main>
    </div>
  );
};

export default Experiments;