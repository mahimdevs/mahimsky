import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from '@/lib/supabase';
import { ArrowLeft, ExternalLink, Coins, Gift, Trophy, Zap, Clock, DollarSign, Star, Target, Calculator, Map, Sword, Wrench, Beaker, TestTube, Atom, FlaskConical, Rocket, Crown, Heart, Shield, Gem, Wallet, CreditCard, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EarnPost {
  id: string;
  title: string;
  description: string;
  content?: string;
  icon: string;
  imageUrl?: string;
  link?: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Coins, Gift, Trophy, Zap, Clock, DollarSign, Star, Target, Calculator, Map, Sword, Wrench, Beaker, TestTube, Atom, FlaskConical, Rocket, Crown, Heart, Shield, Gem, Wallet, CreditCard, PiggyBank
};

const EarnPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<EarnPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      // Decode the URL-encoded slug for matching
      const decodedSlug = decodeURIComponent(slug);
      
      try {
        // First try exact match with the slug
        let { data, error } = await supabase
          .from('earn')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        // If not found, try with decoded slug (in case slug contains special chars)
        if (!data && !error) {
          const result = await supabase
            .from('earn')
            .select('*')
            .eq('slug', decodedSlug)
            .maybeSingle();
          data = result.data;
          error = result.error;
        }
        
        // Also try matching by title if slug doesn't work (legacy support)
        if (!data && !error) {
          const result = await supabase
            .from('earn')
            .select('*')
            .eq('title', decodedSlug)
            .maybeSingle();
          data = result.data;
          error = result.error;
        }
        
        if (error) throw error;
        setPost(data);
      } catch (err) {
        console.error('Failed to fetch earn post:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container py-8 md:py-12 px-3 md:px-4 flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SEO
          title="Post Not Found"
          description="The earn post you're looking for doesn't exist."
          canonicalPath={`/earn/${slug}`}
        />
        <Header />
        <main className="container py-8 md:py-12 px-3 md:px-4 flex-1">
          <div className="text-center py-12">
            <h1 className="font-pixel text-xl md:text-2xl text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The earn post you're looking for doesn't exist.</p>
            <Link to="/earn">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Earn
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = iconMap[post.icon] || Coins;
  
  // Article structured data for Google ranking
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": post.imageUrl || "https://mahimsky.online/lovable-uploads/8ba2b6ae-51fe-4869-af49-8e01459836f3.png",
    "author": {
      "@type": "Person",
      "name": "Mahimsky"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mahimsky",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mahimsky.online/lovable-uploads/8ba2b6ae-51fe-4869-af49-8e01459836f3.png"
      }
    },
    "datePublished": post.created_at || new Date().toISOString(),
    "dateModified": post.updated_at || post.created_at || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mahimsky.online/earn/${post.slug}`
    },
    "url": `https://mahimsky.online/earn/${post.slug}`
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={`${post.title} - Earn`}
        description={post.description}
        keywords={`mahimsky, earn, ${post.title.toLowerCase()}, crypto, passive income`}
        canonicalPath={`/earn/${post.slug}`}
        ogImage={post.imageUrl}
        ogType="article"
        structuredData={structuredData}
      />
      <Header />
      
      <main className="container py-8 md:py-12 px-3 md:px-4 flex-1">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/earn" className="hover:text-foreground transition-colors">Earn</Link>
            </li>
            <li>/</li>
            <li className="text-foreground">{post.title}</li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto">
          {/* Hero Section - Enhanced */}
          <header className="relative overflow-hidden pixel-border bg-gradient-to-br from-card via-card to-primary/5 mb-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_1px,transparent_1px)] bg-[length:20px_20px]" />
            </div>
            
            {/* Main Content */}
            <div className="relative p-5 md:p-8">
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  <IconComponent className="w-3 h-3" />
                  Earn Opportunity
                </span>
              </div>
              
              {/* Image - Full Width on Mobile, Centered */}
              {post.imageUrl ? (
                <div className="w-full aspect-video md:aspect-[21/9] rounded-lg overflow-hidden mb-6 ring-1 ring-border/50">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="w-full aspect-video md:aspect-[21/9] rounded-lg bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 flex items-center justify-center mb-6 ring-1 ring-border/50">
                  <IconComponent className="w-16 h-16 md:w-20 md:h-20 text-primary/60" />
                </div>
              )}
              
              {/* Title */}
              <h1 className="font-pixel text-base md:text-xl lg:text-2xl text-foreground mb-3 leading-relaxed">
                {post.title}
              </h1>
              
              {/* Description */}
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                {post.description}
              </p>
              
              {/* CTA Button */}
              {post.link && (
                <a 
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 font-medium"
                >
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  Visit Link
                </a>
              )}
            </div>
          </header>

          {/* Content Section - Only show if there's actual content different from description */}
          {post.content && post.content.trim() !== post.description.trim() && (
            <div className="pixel-border bg-card p-6 md:p-8 mb-8">
              <h2 className="font-pixel text-sm md:text-base text-foreground mb-4">Details</h2>
              <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert text-muted-foreground">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="pt-6 border-t border-border">
            <Link to="/earn" className="inline-flex items-center gap-2 text-primary hover:underline transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to all Earn opportunities
            </Link>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default EarnPostPage;
