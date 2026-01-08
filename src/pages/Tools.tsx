import Header from "@/components/Header";
import { Wrench, Calculator, Map, Sword } from "lucide-react";

const Tools = () => {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="pixel-border p-6 hover-glow">
            <Calculator className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-pixel text-sm mb-2">Calculators</h3>
            <p className="text-sm text-muted-foreground">
              Stat calculators, damage estimators, and more.
            </p>
          </div>

          <div className="pixel-border p-6 hover-glow">
            <Map className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-pixel text-sm mb-2">Maps</h3>
            <p className="text-sm text-muted-foreground">
              Interactive maps and location guides.
            </p>
          </div>

          <div className="pixel-border p-6 hover-glow">
            <Sword className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-pixel text-sm mb-2">Builds</h3>
            <p className="text-sm text-muted-foreground">
              Character builds, loadouts, and optimization guides.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tools;
