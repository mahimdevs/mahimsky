import { Zap, Clock, DollarSign } from "lucide-react";

const tools = [
  {
    title: "Income Calculator",
    description: "Estimate potential earnings from different online paths",
    icon: DollarSign,
  },
  {
    title: "Time Tracker",
    description: "Track time spent on earning experiments",
    icon: Clock,
  },
  {
    title: "Quick Start Guide",
    description: "Get started earning with zero budget today",
    icon: Zap,
  },
];

const ToolsSection = () => {
  return (
    <section id="tools" className="py-20">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-pixel text-lg md:text-xl text-foreground mb-4">
            FREE TOOLS
          </h2>
          <div className="pixel-divider max-w-xs mx-auto mb-4" />
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-neon-green"></span>
              Free
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-neon-cyan"></span>
              No signup
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-neon-orange"></span>
              Instant use
            </span>
          </div>
        </div>

        {/* Tools list */}
        <div className="max-w-2xl mx-auto space-y-4">
          {tools.map((tool, index) => (
            <div key={tool.title}>
              <div className="pixel-border bg-card p-5 hover-glow transition-all duration-300 flex items-start gap-4">
                {/* Icon */}
                <div className="p-2 bg-secondary shrink-0">
                  <tool.icon className="w-5 h-5 text-neon-cyan" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-pixel text-xs text-foreground mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              </div>

              {/* Pixel divider between items */}
              {index < tools.length - 1 && (
                <div className="pixel-divider my-4 max-w-xs mx-auto opacity-50" />
              )}
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          More tools added over time
        </p>
      </div>
    </section>
  );
};

export default ToolsSection;
