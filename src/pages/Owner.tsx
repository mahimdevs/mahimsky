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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container py-10 md:py-16 lg:py-24 px-3 md:px-4">
          {/* Hero Section with Photo */}
          <div className="flex flex-col items-center text-center mb-10 md:mb-16">
            {/* Photo */}
            <div className="mb-6 md:mb-8">
              <img 
                src={mahimPhoto}
                alt="Mahim Sky"
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full object-cover border-4 border-border"
              />
            </div>

            {/* Name & Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 md:mb-4">
              About Mahimsky
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground font-medium mb-4 md:mb-6">
              Solo Entrepreneur & Creator of Mahimsky Platform
            </p>

            {/* Tagline */}
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-muted rounded-full">
              <Lightbulb className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="text-xs md:text-sm text-muted-foreground">Building sustainable online income streams</span>
            </div>
          </div>

          {/* Bio Section */}
          <div className="max-w-3xl mx-auto mb-12 md:mb-20">
            <div className="bg-card border border-border rounded-xl md:rounded-2xl p-5 md:p-8 lg:p-10">
              <div className="space-y-4 md:space-y-6">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  I design, launch, and iterate on websites, tools, and web-based projects with the goal of understanding user needs, testing monetization models, and creating reliable income streams through the internet.
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  My work combines <span className="text-foreground font-medium">practical experimentation</span> with <span className="text-foreground font-medium">continuous learning</span>—analyzing what works, optimizing what doesn't, and improving each project over time.
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  This website serves as a platform for sharing web experiments, free tools, and digital resources, while also documenting the process of building income-generating online products.
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Monetization methods may include advertising, affiliate partnerships, premium features, or digital services—always implemented with transparency and user value as the priority.
                </p>
              </div>
            </div>
          </div>

          {/* Highlight Cards */}
          <div className="max-w-4xl mx-auto mb-10 md:mb-16">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 md:mb-10">What I Focus On</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="bg-card border border-border rounded-lg md:rounded-xl p-4 md:p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-muted rounded-lg">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy Quote */}
          <div className="max-w-2xl mx-auto text-center px-4">
            <blockquote className="text-base md:text-xl lg:text-2xl font-medium text-muted-foreground italic">
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