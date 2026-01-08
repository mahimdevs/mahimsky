import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Earn", href: "#earn", slot: 1 },
  { label: "Experiments", href: "#experiments", slot: 2 },
  { label: "Tools", href: "#tools", slot: 3 },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 minecraft-header">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="inventory-slot-logo">
          <span className="font-pixel text-xs text-foreground tracking-wider">
            MAHIM SKY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inventory-slot group"
            >
              <span className="slot-number">{link.slot}</span>
              <span className="font-pixel text-[10px] text-foreground/80 group-hover:text-foreground transition-colors">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inventory-slot-mobile"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mobile-inventory-panel">
          <div className="container py-4">
            <div className="grid grid-cols-3 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="inventory-slot-mobile-item"
                >
                  <span className="slot-number">{link.slot}</span>
                  <span className="font-pixel text-[8px] text-foreground/80">
                    {link.label}
                  </span>
                </a>
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
