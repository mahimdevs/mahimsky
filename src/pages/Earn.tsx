import Header from "@/components/Header";
import { Coins, Gift, Trophy, Zap } from "lucide-react";

const Earn = () => {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="pixel-border p-6 hover-glow">
            <Gift className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-pixel text-sm mb-2">Daily Rewards</h3>
            <p className="text-sm text-muted-foreground">
              Log in daily to claim free rewards and bonus items.
            </p>
          </div>

          <div className="pixel-border p-6 hover-glow">
            <Trophy className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-pixel text-sm mb-2">Achievements</h3>
            <p className="text-sm text-muted-foreground">
              Complete challenges and unlock special achievements.
            </p>
          </div>

          <div className="pixel-border p-6 hover-glow">
            <Zap className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-pixel text-sm mb-2">Events</h3>
            <p className="text-sm text-muted-foreground">
              Participate in limited-time events for exclusive prizes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Earn;
