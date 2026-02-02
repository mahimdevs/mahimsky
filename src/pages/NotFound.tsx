import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Home, Coins, FlaskConical, TrendingUp, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const quickLinks = [
    { name: "Home", path: "/", icon: Home, description: "Back to homepage" },
    { name: "Earn", path: "/earn", icon: Coins, description: "Earning opportunities" },
    { name: "Experiments", path: "/experiments", icon: FlaskConical, description: "Digital experiments" },
    { name: "Investments", path: "/investments", icon: TrendingUp, description: "Portfolio tracker" },
    { name: "Owner", path: "/owner", icon: User, description: "About Mahimsky" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Page Not Found - 404"
        description="The page you're looking for doesn't exist. Navigate back to Mahimsky's main pages."
        canonicalPath="/404"
      />
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Display */}
          <div className="mb-8">
            <h1 className="font-pixel text-6xl md:text-8xl text-primary mb-4 animate-pulse">
              404
            </h1>
            <p className="font-pixel text-lg md:text-xl text-foreground mb-2">
              Page Not Found
            </p>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
          </div>

          {/* Back Button */}
          <div className="mb-8">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="gap-2 font-pixel text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className="pixel-border bg-card/80 p-6 rounded-lg">
            <h2 className="font-pixel text-sm text-foreground mb-4">
              Quick Navigation
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-pixel text-[10px] text-foreground">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <p className="mt-6 text-xs text-muted-foreground">
            If you believe this is an error, please{" "}
            <Link to="/owner" className="text-primary hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;