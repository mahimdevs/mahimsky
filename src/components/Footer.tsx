import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "Experiments", path: "/experiments" },
    { name: "Earn", path: "/earn" },
    { name: "Investments", path: "/investments" },
    { name: "About Mahimsky", path: "/owner" },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border" itemScope itemType="https://schema.org/WPFooter">
      <div className="container px-3 md:px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {/* Brand Identity */}
          <div className="text-center sm:text-left" itemScope itemType="https://schema.org/Organization">
            <h3 className="text-base md:text-lg font-bold text-foreground mb-2 md:mb-3" itemProp="name">Mahimsky</h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed" itemProp="description">
              A digital platform by Mahimsky – building sustainable online assets, free tools, and resources for earning on the web.
            </p>
            <meta itemProp="url" content="https://mahimsky.lovable.app" />
          </div>

          {/* Quick Links */}
          <nav className="text-center sm:text-left" aria-label="Footer Navigation">
            <h4 className="text-xs md:text-sm font-semibold text-foreground mb-2 md:mb-3">Quick Links</h4>
            <ul className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 sm:flex-col sm:space-y-2 sm:gap-0">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact / Connect */}
          <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
            <h4 className="text-xs md:text-sm font-semibold text-foreground mb-2 md:mb-3">Connect with Mahimsky</h4>
            <p className="text-xs md:text-sm text-muted-foreground mb-2">
              Have questions or want to collaborate?
            </p>
            <Link 
              to="/owner" 
              className="text-xs md:text-sm text-primary hover:underline"
            >
              Learn more about Mahimsky →
            </Link>
          </div>
        </div>

        {/* Bottom Bar with brand */}
        <div className="mt-6 md:mt-10 pt-4 md:pt-6 border-t border-border">
          <p className="text-center text-[10px] md:text-xs text-muted-foreground">
            © {currentYear} Mahimsky. All rights reserved. | <Link to="/" className="hover:text-primary">mahimsky.lovable.app</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;