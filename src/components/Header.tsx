import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Coins, FlaskConical, User, TrendingUp, Home } from "lucide-react";

const navLinks = [{
  label: "Earn",
  href: "/earn",
  slot: 1,
  Icon: Coins
}, {
  label: "Experiments",
  href: "/experiments",
  slot: 2,
  Icon: FlaskConical
}, {
  label: "Investments",
  href: "/investments",
  slot: 3,
  Icon: TrendingUp
}, {
  label: "Owner",
  href: "/owner",
  slot: 4,
  Icon: User
}];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 minecraft-header">
      <div className="container flex h-14 md:h-16 items-center justify-between px-3 md:px-4">
        {/* Left side - Home button or Logo */}
        <div className="flex items-center gap-2">
          {!isHomePage && (
            <Link 
              to="/" 
              className="inventory-slot-mobile flex items-center justify-center mr-2"
              aria-label="Go to home page"
            >
              <Home className="w-4 h-4" />
            </Link>
          )}
          
          {/* Logo with explicit dimensions and lazy loading */}
          <Link to="/" className="header-logo-link group">
            <img 
              alt="MahimSky" 
              className="header-logo-img h-8 md:h-10" 
              src="/lovable-uploads/8ba2b6ae-51fe-4869-af49-8e01459836f3.png"
              width="60"
              height="40"
              loading="eager"
              decoding="async"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map(link => (
            <Link 
              key={link.label} 
              to={link.href} 
              className="inventory-slot group"
            >
              <span className="slot-number">{link.slot}</span>
              <link.Icon className="slot-icon" />
              <span className="font-pixel text-[8px] lg:text-[10px] text-foreground/80 group-hover:text-foreground transition-colors">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden inventory-slot-mobile" 
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mobile-inventory-panel">
          <div className="container py-3 px-3">
            <div className="grid grid-cols-3 gap-2">
              {navLinks.map(link => (
                <Link 
                  key={link.label} 
                  to={link.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="inventory-slot-mobile-item group"
                >
                  <span className="slot-number">{link.slot}</span>
                  <link.Icon className="slot-icon w-5 h-5" />
                  <span className="font-pixel text-[7px] text-foreground/80 mt-1">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom border styled as hotbar edge */}
      <div className="hotbar-edge" />
    </header>
  );
};

export default Header;