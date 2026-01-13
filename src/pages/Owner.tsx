import { Globe, Code, Lightbulb, TrendingUp, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import mahimPhoto from "@/assets/mahim-sky-photo.jpg";

const Owner = () => {
  const highlights = [
    {
      icon: Globe,
      title: "Web Creator",
      description: "Building sustainable online assets and digital products"
    },
    {
      icon: Code,
      title: "Digital Experimenter",
      description: "Testing ideas, iterating fast, and learning from every project"
    },
    {
      icon: TrendingUp,
      title: "Data-Driven",
      description: "Analyzing metrics to optimize and scale what works"
    },
    {
      icon: Target,
      title: "Long-Term Vision",
      description: "Focused on scalability, sustainability, and real-world value"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <div className="container py-16 md:py-24">
          {/* Hero Section with Photo */}
          <div className="flex flex-col items-center text-center mb-16">
            {/* Photo */}
            <div className="mb-8">
              <img 
                src={mahimPhoto}
                alt="Mahim Sky"
                className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-border"
              />
            </div>

            {/* Name & Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Mahim Sky
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-medium mb-6">
              Solo Entrepreneur
            </p>

            {/* Tagline */}
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Building sustainable online income streams</span>
            </div>
          </div>

          {/* Bio Section */}
          <div className="max-w-3xl mx-auto mb-20">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  I design, launch, and iterate on websites, tools, and web-based projects with the goal of understanding user needs, testing monetization models, and creating reliable income streams through the internet.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My work combines <span className="text-foreground font-medium">practical experimentation</span> with <span className="text-foreground font-medium">continuous learning</span>—analyzing what works, optimizing what doesn't, and improving each project over time.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This website serves as a platform for sharing web experiments, free tools, and digital resources, while also documenting the process of building income-generating online products.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Monetization methods may include advertising, affiliate partnerships, premium features, or digital services—always implemented with transparency and user value as the priority.
                </p>
              </div>
            </div>
          </div>

          {/* Highlight Cards */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">What I Focus On</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy Quote */}
          <div className="max-w-2xl mx-auto text-center">
            <blockquote className="text-xl md:text-2xl font-medium text-muted-foreground italic">
              "Every project is built with scalability, sustainability, and real-world usefulness in mind."
            </blockquote>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Owner;
