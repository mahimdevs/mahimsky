import { Link } from "react-router-dom";
import { Coins, Beaker } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden scanlines" aria-label="Mahimsky Hero Section">
      {/* Subtle animated background shimmer */}
      <div className="absolute inset-0 animate-shimmer" />
      
      {/* Decorative pixel corners - hidden on small mobile */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-6 h-6 md:w-8 md:h-8 border-l-2 border-t-2 border-border opacity-60 hidden sm:block" />
      <div className="absolute top-4 right-4 md:top-8 md:right-8 w-6 h-6 md:w-8 md:h-8 border-r-2 border-t-2 border-border opacity-60 hidden sm:block" />
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-6 h-6 md:w-8 md:h-8 border-l-2 border-b-2 border-border opacity-60 hidden sm:block" />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-6 h-6 md:w-8 md:h-8 border-r-2 border-b-2 border-border opacity-60 hidden sm:block" />

      <div className="container relative z-10 text-center px-4 py-8 md:py-0">
        {/* Main Title - Single H1 with brand keyword */}
        <h1 className="font-pixel text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground mb-4 md:mb-8 tracking-wider text-glow-green animate-float leading-relaxed">
          MAHIMSKY
        </h1>

        {/* Subtitle with H2 for SEO hierarchy */}
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-xs sm:max-w-md md:max-w-2xl mx-auto mb-4 md:mb-6 leading-relaxed px-2 font-normal">
          Your Digital Platform for Real Earning Experiments & Investments
        </h2>

        {/* Supporting line with brand context */}
        <p className="text-xs sm:text-sm text-muted-foreground/70 max-w-xs sm:max-w-md md:max-w-xl mx-auto font-medium px-2 mb-8 md:mb-10">
          No hype. No fake promises. Just real building and learning in public with Mahimsky.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 md:mb-12">
          <Link 
            to="/earn" 
            className="pixel-border bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 font-pixel text-xs md:text-sm transition-all hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] flex items-center gap-2"
          >
            <Coins className="w-4 h-4" />
            Start Earning
          </Link>
          <Link 
            to="/experiments" 
            className="pixel-border bg-transparent hover:bg-accent/10 text-foreground px-6 py-3 font-pixel text-xs md:text-sm transition-all hover:scale-105 border-2 border-accent flex items-center gap-2"
          >
            <Beaker className="w-4 h-4" />
            See Experiments
          </Link>
        </div>

        {/* Decorative pixel elements */}
        <div className="flex justify-center gap-2" aria-hidden="true">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary/60"></span>
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent/60"></span>
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-neon-orange/60"></span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;