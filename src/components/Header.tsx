import { Link } from "react-router-dom";

const navLinks = [
  { label: "Earn", href: "#earn" },
  { label: "Web Experiments", href: "#experiments" },
  { label: "Free Tools", href: "#tools" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-pixel text-sm text-foreground tracking-wider hover:text-glow-green transition-all duration-300">
          MAHIM SKY
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-pixel text-xs text-muted-foreground pixel-underline hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile nav indicator */}
        <div className="md:hidden flex gap-1">
          <span className="w-1 h-1 bg-neon-green"></span>
          <span className="w-1 h-1 bg-neon-green"></span>
          <span className="w-1 h-1 bg-neon-green"></span>
        </div>
      </div>

      {/* Pixel divider */}
      <div className="pixel-divider" />
    </header>
  );
};

export default Header;
