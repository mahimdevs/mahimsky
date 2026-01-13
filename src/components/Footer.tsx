import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "Experiments", path: "/experiments" },
    { name: "Earn", path: "/earn" },
    { name: "Owner", path: "/owner" },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-3">Mahim Sky</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building sustainable online assets, free tools, and digital resources for the web.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Connect</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Have questions or want to collaborate?
            </p>
            <Link 
              to="/owner" 
              className="text-sm text-primary hover:underline"
            >
              Learn more about me →
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-center text-xs text-muted-foreground">
            © {currentYear} Mahim Sky. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
