import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
}

const SEO = ({
  title,
  description,
  keywords = 'mahimsky, crypto, gaming, blockchain, web3',
  canonicalPath = '/',
  ogImage = 'https://mahimsky.online/lovable-uploads/8ba2b6ae-51fe-4869-af49-8e01459836f3.png',
  ogType = 'website',
  structuredData
}: SEOProps) => {
  const baseUrl = 'https://mahimsky.online';
  const fullUrl = `${baseUrl}${canonicalPath}`;
  const fullTitle = title.includes('Mahimsky') ? title : `${title} | Mahimsky`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Helper to update or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Update meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    
    // Open Graph
    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', fullUrl, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:site_name', 'Mahimsky', true);
    
    // Twitter
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);
    
    // Canonical URL
    setLinkTag('canonical', fullUrl);

    // Structured Data
    if (structuredData) {
      let script = document.querySelector('#structured-data') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = 'structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup on unmount
    return () => {
      // Reset to default title when component unmounts
      document.title = 'Mahimsky - Where Opportunities Begin';
    };
  }, [fullTitle, description, keywords, fullUrl, ogImage, ogType, structuredData]);

  return null;
};

export default SEO;
