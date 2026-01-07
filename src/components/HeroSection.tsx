const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden scanlines">
      {/* Subtle animated background shimmer */}
      <div className="absolute inset-0 animate-shimmer" />
      
      {/* Decorative pixel corners */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-border opacity-40" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-border opacity-40" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-border opacity-40" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-border opacity-40" />

      <div className="container relative z-10 text-center px-4">
        {/* Main Title */}
        <h1 className="font-pixel text-3xl md:text-5xl lg:text-6xl text-foreground mb-8 tracking-wider text-glow-green animate-float">
          MAHIM SKY
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
          An earner guide sharing real experiments, free tools, and practical paths to earning online.
        </p>

        {/* Supporting line */}
        <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto font-medium">
          No hype. No fake promises. Just real building and learning in public.
        </p>

        {/* Decorative pixel elements */}
        <div className="flex justify-center gap-2 mt-12">
          <span className="w-2 h-2 bg-neon-green/60"></span>
          <span className="w-2 h-2 bg-neon-cyan/60"></span>
          <span className="w-2 h-2 bg-neon-orange/60"></span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
