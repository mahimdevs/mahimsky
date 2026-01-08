import Header from "@/components/Header";
import { FlaskConical, Beaker, TestTube, Atom } from "lucide-react";

const Experiments = () => {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="pixel-border p-6 hover-glow">
            <Beaker className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-pixel text-sm mb-2">Beta Features</h3>
            <p className="text-sm text-muted-foreground">
              Try out experimental features before they go live.
            </p>
          </div>

          <div className="pixel-border p-6 hover-glow">
            <TestTube className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-pixel text-sm mb-2">Test Labs</h3>
            <p className="text-sm text-muted-foreground">
              Access exclusive testing environments and sandboxes.
            </p>
          </div>

          <div className="pixel-border p-6 hover-glow">
            <Atom className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-pixel text-sm mb-2">Research</h3>
            <p className="text-sm text-muted-foreground">
              Participate in research studies and provide feedback.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Experiments;
