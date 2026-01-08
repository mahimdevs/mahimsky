import { ChevronRight } from "lucide-react";
import { useGuides } from "@/hooks/useFirestoreData";

const GuidesSection = () => {
  const { guides, loading } = useGuides();

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-pixel text-lg md:text-xl text-foreground mb-4">
            EARN GUIDES
          </h2>
          <div className="pixel-divider max-w-xs mx-auto" />
        </div>

        {/* Guides list */}
        <div className="max-w-2xl mx-auto space-y-3">
          {loading ? (
            <p className="text-center text-muted-foreground text-sm">Loading...</p>
          ) : guides.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm">No guides yet</p>
          ) : (
            guides.map((guide) => (
              <div
                key={guide.id}
                className="pixel-border bg-card p-4 hover-glow transition-all duration-300 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Category tag */}
                  <span className="font-pixel text-[10px] text-neon-green bg-neon-green/10 px-2 py-1">
                    {guide.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm text-foreground">
                    {guide.title}
                  </h3>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-neon-green transition-colors" />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;
