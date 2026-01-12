import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Coins, FlaskConical, Wrench, User } from "lucide-react";
import mahimskyLogo from "@/assets/mahimsky-logo.png";
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
  label: "Tools",
  href: "/tools",
  slot: 3,
  Icon: Wrench
}, {
  label: "Owner",
  href: "/owner",
  slot: 4,
  Icon: User
}];
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return <header className="sticky top-0 z-50 minecraft-header">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="header-logo-link group">
          <img alt="MahimSky" className="header-logo-img" src="/lovable-uploads/8ba2b6ae-51fe-4869-af49-8e01459836f3.png" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map(link => <Link key={link.label} to={link.href} className="inventory-slot group">
              <span className="slot-number">{link.slot}</span>
              <link.Icon className="slot-icon" />
              <span className="font-pixel text-[10px] text-foreground/80 group-hover:text-foreground transition-colors">
                {link.label}
              </span>
            </Link>)}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden inventory-slot-mobile" aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && <div className="md:hidden mobile-inventory-panel">
          <div className="container py-4">
            <div className="grid grid-cols-3 gap-2">
              {navLinks.map(link => <Link key={link.label} to={link.href} onClick={() => setMobileMenuOpen(false)} className="inventory-slot-mobile-item group">
                  <span className="slot-number">{link.slot}</span>
                  <link.Icon className="slot-icon" />
                  <span className="font-pixel text-[8px] text-foreground/80">
                    {link.label}
                  </span>
                </Link>)}
            </div>
          </div>
        </div>}

      {/* Bottom border styled as hotbar edge */}
      <div className="hotbar-edge" />
    </header>;
};
export default Header;