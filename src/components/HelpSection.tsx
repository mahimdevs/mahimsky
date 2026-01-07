import { BookOpen, Wrench, FlaskConical } from "lucide-react";

const helpBlocks = [
  {
    icon: BookOpen,
    title: "Learn",
    description: "Learn earning paths for beginners with low or zero budget",
    color: "neon-green",
  },
  {
    icon: Wrench,
    title: "Tools",
    description: "Use free tools that save time or support income generation",
    color: "neon-cyan",
  },
  {
    icon: FlaskConical,
    title: "Experiments",
    description: "Explore real web experiments with transparent outcomes",
    color: "neon-orange",
  },
];

const HelpSection = () => {
  return (
    <section id="earn" className="py-20">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-pixel text-lg md:text-xl text-foreground mb-4">
            HOW THIS SITE HELPS YOU EARN
          </h2>
          <div className="pixel-divider max-w-xs mx-auto" />
        </div>

        {/* Help blocks grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {helpBlocks.map((block) => (
            <div
              key={block.title}
              className="pixel-border bg-card p-6 hover-glow transition-all duration-300 group"
            >
              {/* Icon */}
              <div className={`mb-4 inline-flex p-3 bg-secondary`}>
                <block.icon 
                  className={`w-6 h-6 ${
                    block.color === 'neon-green' ? 'text-neon-green' :
                    block.color === 'neon-cyan' ? 'text-neon-cyan' :
                    'text-neon-orange'
                  }`} 
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h3 className="font-pixel text-xs text-foreground mb-3">
                {block.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {block.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
