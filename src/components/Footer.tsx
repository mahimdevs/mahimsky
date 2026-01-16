import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "Experiments", path: "/experiments" },
    { name: "Earn", path: "/earn" },
    { name: "Investments", path: "/investments" },
    { name: "Owner", path: "/owner" },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container px-3 md:px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="text-base md:text-lg font-bold text-foreground mb-2 md:mb-3">Mahim Sky</h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Building sustainable online assets, free tools, and digital resources for the web.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
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
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
            <h4 className="text-xs md:text-sm font-semibold text-foreground mb-2 md:mb-3">Connect</h4>
            <p className="text-xs md:text-sm text-muted-foreground mb-2">
              Have questions or want to collaborate?
            </p>
            <Link 
              to="/owner" 
              className="text-xs md:text-sm text-primary hover:underline"
            >
              Learn more about me →
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 md:mt-10 pt-4 md:pt-6 border-t border-border">
          <p className="text-center text-[10px] md:text-xs text-muted-foreground">
            © {currentYear} Mahim Sky. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;