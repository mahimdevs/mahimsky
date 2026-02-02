import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from '@/lib/supabase';
import { ArrowLeft, ExternalLink, FlaskConical, Beaker, TestTube, Atom, Coins, Gift, Trophy, Zap, Clock, DollarSign, Star, Target, Calculator, Map, Sword, Wrench, Rocket, Crown, Heart, Shield, Gem, Wallet, CreditCard, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExperimentPost {
  id: string;
  title: string;
  description: string;
  content?: string;
  status: 'live' | 'testing' | 'coming';
  imageUrl?: string;
  link?: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical, Beaker, TestTube, Atom, Coins, Gift, Trophy, Zap, Clock, DollarSign, Star, Target, Calculator, Map, Sword, Wrench, Rocket, Crown, Heart, Shield, Gem, Wallet, CreditCard, PiggyBank
};

const statusStyles = {
  live: 'bg-green-500/20 text-green-600 border-green-500/30',
  testing: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
  coming: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
};

const statusLabels = {
  live: 'LIVE',
  testing: 'TESTING',
  coming: 'COMING SOON',
};

const ExperimentPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<ExperimentPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        const { data, error } = await supabase
          .from('experiments')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        if (error) throw error;
        setPost(data);
      } catch (err) {
        console.error('Failed to fetch experiment post:', err);
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
          title="Experiment Not Found"
          description="The experiment you're looking for doesn't exist."
          canonicalPath={`/experiments/${slug}`}
        />
        <Header />
        <main className="container py-8 md:py-12 px-3 md:px-4 flex-1">
          <div className="text-center py-12">
            <h1 className="font-pixel text-xl md:text-2xl text-foreground mb-4">Experiment Not Found</h1>
            <p className="text-muted-foreground mb-6">The experiment you're looking for doesn't exist.</p>
            <Link to="/experiments">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Experiments
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Article structured data for Google ranking
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": post.imageUrl || "https://mahimsky.lovable.app/lovable-uploads/8ba2b6ae-51fe-4869-af49-8e01459836f3.png",
    "author": {
      "@type": "Person",
      "name": "Mahimsky"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mahimsky",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mahimsky.lovable.app/lovable-uploads/8ba2b6ae-51fe-4869-af49-8e01459836f3.png"
      }
    },
    "datePublished": post.created_at || new Date().toISOString(),
    "dateModified": post.updated_at || post.created_at || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mahimsky.lovable.app/experiments/${post.slug}`
    },
    "url": `https://mahimsky.lovable.app/experiments/${post.slug}`
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={`${post.title} - Experiments`}
        description={post.description}
        keywords={`mahimsky, experiment, ${post.title.toLowerCase()}, crypto, web3, beta`}
        canonicalPath={`/experiments/${post.slug}`}
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
              <Link to="/experiments" className="hover:text-foreground transition-colors">Experiments</Link>
            </li>
            <li>/</li>
            <li className="text-foreground">{post.title}</li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8 md:mb-12">
            <div className="flex items-start gap-4 mb-6">
              {post.imageUrl ? (
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                />
              ) : (
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <FlaskConical className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-pixel text-lg md:text-2xl lg:text-3xl text-foreground">
                    {post.title}
                  </h1>
                  <span className={`font-pixel text-[10px] md:text-xs px-2 py-1 rounded border ${statusStyles[post.status]}`}>
                    {statusLabels[post.status]}
                  </span>
                </div>
                <p className="text-sm md:text-base text-muted-foreground">
                  {post.description}
                </p>
              </div>
            </div>

            {post.link && (
              <a 
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Try Experiment
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <div className="pixel-border p-6 md:p-8 bg-card">
                <p className="text-muted-foreground">
                  {post.description}
                </p>
              </div>
            )}
          </div>

          {/* Back link */}
          <div className="mt-8 md:mt-12 pt-6 border-t border-border">
            <Link to="/experiments" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Back to all Experiments
            </Link>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExperimentPostPage;
