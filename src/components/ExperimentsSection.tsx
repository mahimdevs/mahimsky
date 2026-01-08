import { useExperiments } from "@/hooks/useFirestoreData";

const statusStyles = {
  live: { label: "Live", className: "badge-live" },
  testing: { label: "Testing", className: "badge-testing" },
  coming: { label: "Coming Soon", className: "badge-coming" },
};

const ExperimentsSection = () => {
  const { experiments, loading } = useExperiments();

  return (
    <section id="experiments" className="py-20 bg-secondary/30">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-pixel text-lg md:text-xl text-foreground mb-4">
            WEB EXPERIMENTS
          </h2>
          <div className="pixel-divider max-w-xs mx-auto" />
        </div>

        {/* Experiments grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {loading ? (
            <p className="text-center text-muted-foreground text-sm col-span-full">Loading...</p>
          ) : experiments.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm col-span-full">No experiments yet</p>
          ) : (
            experiments.map((experiment) => (
              <div
                key={experiment.id}
                className="pixel-border bg-card p-6 hover-glow transition-all duration-300 group"
              >
                {/* Status badge */}
                <span className={`font-pixel text-[10px] px-3 py-1 inline-block mb-4 ${statusStyles[experiment.status]?.className || 'badge-coming'}`}>
                  {statusStyles[experiment.status]?.label || 'Coming Soon'}
                </span>

                {/* Title */}
                <h3 className="font-pixel text-xs text-foreground mb-3 leading-relaxed">
                  {experiment.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {experiment.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperimentsSection;
