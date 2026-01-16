const HeroSection = () => {
  return (
    <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden scanlines">
      {/* Subtle animated background shimmer */}
      <div className="absolute inset-0 animate-shimmer" />
      
      {/* Decorative pixel corners - hidden on small mobile */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-6 h-6 md:w-8 md:h-8 border-l-2 border-t-2 border-border opacity-60 hidden sm:block" />
      <div className="absolute top-4 right-4 md:top-8 md:right-8 w-6 h-6 md:w-8 md:h-8 border-r-2 border-t-2 border-border opacity-60 hidden sm:block" />
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-6 h-6 md:w-8 md:h-8 border-l-2 border-b-2 border-border opacity-60 hidden sm:block" />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-6 h-6 md:w-8 md:h-8 border-r-2 border-b-2 border-border opacity-60 hidden sm:block" />

      <div className="container relative z-10 text-center px-4 py-8 md:py-0">
        {/* Main Title */}
        <h1 className="font-pixel text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground mb-4 md:mb-8 tracking-wider text-glow-green animate-float leading-relaxed">
          MAHIM SKY
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-xs sm:max-w-md md:max-w-2xl mx-auto mb-4 md:mb-6 leading-relaxed px-2">
          An earner guide sharing real experiments, free tools, and practical paths to earning online.
        </p>

        {/* Supporting line */}
        <p className="text-xs sm:text-sm text-muted-foreground/70 max-w-xs sm:max-w-md md:max-w-xl mx-auto font-medium px-2">
          No hype. No fake promises. Just real building and learning in public.
        </p>

        {/* Decorative pixel elements */}
        <div className="flex justify-center gap-2 mt-8 md:mt-12">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary/60"></span>
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent/60"></span>
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-neon-orange/60"></span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;