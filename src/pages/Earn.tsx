import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
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
        const snap = await getDocs(collection(db, 'earn'));
        setItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as EarnItem)));
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
      <>
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} className="w-12 h-12 object-cover rounded mb-4" />
        ) : (
          <IconComponent className="w-8 h-8 text-primary mb-4" />
        )}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-pixel text-sm">{item.title}</h3>
          {item.link && <ExternalLink className="w-3 h-3 text-muted-foreground" />}
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </>
    );

    if (item.link) {
      return (
        <a 
          key={item.id} 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="pixel-border p-6 hover-glow block transition-transform hover:scale-[1.02]"
        >
          {cardContent}
        </a>
      );
    }

    return (
      <div key={item.id} className="pixel-border p-6 hover-glow">
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
            <Coins className="w-10 h-10 text-primary" />
            <h1 className="font-pixel text-2xl md:text-3xl text-foreground">EARN</h1>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover ways to earn rewards, coins, and exclusive items through various activities and challenges.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No earn methods available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(renderCard)}
          </div>
        )}
      </main>
    </div>
  );
};

export default Earn;