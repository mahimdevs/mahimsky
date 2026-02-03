import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, MessageCircle, Twitter, Youtube, Instagram, Music, Facebook, Linkedin, Github, Globe, X } from 'lucide-react';

interface SocialLink {
  id: string;
  platform: string;
  icon: string;
  url: string;
  enabled: boolean;
  sort_order: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Send,
  MessageCircle,
  Twitter,
  Youtube,
  Instagram,
  Music,
  Facebook,
  Linkedin,
  Github,
  Globe,
  X
};

const SocialSidebar = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const { data, error } = await supabase
          .from('social_links')
          .select('*')
          .eq('enabled', true)
          .order('sort_order', { ascending: true });
        
        if (error) throw error;
        // Only show links that have a URL set
        setLinks((data || []).filter(link => link.url && link.url.trim() !== ''));
      } catch (error) {
        console.error('Failed to fetch social links:', error);
      }
    };

    fetchLinks();
  }, []);

  // Don't render if no links are available
  if (links.length === 0) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
        aria-label="Toggle social links"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar - Desktop: always visible, Mobile: toggle */}
      <div
        className={`fixed z-40 transition-all duration-300 ${
          // Desktop
          'md:right-4 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:opacity-100' +
          // Mobile
          ` ${isOpen ? 'bottom-20 right-4 opacity-100 translate-x-0' : 'bottom-20 right-4 opacity-0 translate-x-full pointer-events-none'} md:pointer-events-auto`
        }`}
      >
        <div className="flex flex-col gap-2 p-2 bg-card/90 backdrop-blur-sm rounded-lg border border-border shadow-xl">
          {/* Header */}
          <div className="hidden md:block px-2 py-1">
            <span className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">Join Us</span>
          </div>
          
          {/* Social Icons */}
          {links.map((link) => {
            const IconComponent = iconMap[link.icon] || Globe;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-10 h-10 rounded-lg bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                aria-label={`Follow us on ${link.platform}`}
              >
                <IconComponent className="w-5 h-5" />
                {/* Tooltip - Desktop only */}
                <span className="hidden md:block absolute right-full mr-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {link.platform}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SocialSidebar;
