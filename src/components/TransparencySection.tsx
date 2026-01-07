const TransparencySection = () => {
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto">
          <div className="pixel-border bg-card p-8 relative overflow-hidden">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-neon-green/40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-neon-green/40" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-neon-green/40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-neon-green/40" />

            {/* Content */}
            <div className="text-center space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                "This site is built in public.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I share what works, what fails, and what I'm still testing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                No scams. No unrealistic income claims."
              </p>
            </div>

            {/* Decorative pixel dots */}
            <div className="flex justify-center gap-2 mt-6">
              <span className="w-1 h-1 bg-neon-green/40"></span>
              <span className="w-1 h-1 bg-neon-green/60"></span>
              <span className="w-1 h-1 bg-neon-green/40"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;
