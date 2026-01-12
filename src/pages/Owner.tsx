import { motion } from "framer-motion";
import { Globe, Code, Lightbulb, TrendingUp, Target, Sparkles } from "lucide-react";
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
      
      <main className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative py-16 md:py-24">
          {/* Hero Section with Photo */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-16"
          >
            {/* Photo with decorative ring */}
            <div className="relative mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                {/* Glowing ring effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-md opacity-50 animate-pulse" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-75" />
                
                {/* Photo */}
                <img 
                  src={mahimPhoto}
                  alt="Mahim Sky"
                  className="relative w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-background shadow-2xl"
                />
                
                {/* Decorative badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </div>

            {/* Name & Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-4"
            >
              Mahim Sky
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground font-medium mb-6"
            >
              Independent Web Creator & Digital Experimenter
            </motion.p>

            {/* Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full border border-border/50"
            >
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Building sustainable online income streams</span>
            </motion.div>
          </motion.div>

          {/* Bio Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto mb-20"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-10 shadow-xl">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I design, launch, and iterate on websites, tools, and web-based projects with the goal of understanding user needs, testing monetization models, and creating reliable income streams through the internet.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  My work combines <span className="text-foreground font-medium">practical experimentation</span> with <span className="text-foreground font-medium">continuous learning</span>—analyzing what works, optimizing what doesn't, and improving each project over time.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  This website serves as a platform for sharing web experiments, free tools, and digital resources, while also documenting the process of building income-generating online products.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Monetization methods may include advertising, affiliate partnerships, premium features, or digital services—always implemented with <span className="text-primary font-medium">transparency</span> and <span className="text-primary font-medium">user value</span> as the priority.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Highlight Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">What I Focus On</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Philosophy Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-primary/20 font-serif">"</div>
              <blockquote className="text-xl md:text-2xl font-medium text-foreground/90 italic pt-6">
                Every project is built with scalability, sustainability, and real-world usefulness in mind.
              </blockquote>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Owner;
