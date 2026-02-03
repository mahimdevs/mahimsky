import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, LogOut, ExternalLink, ImageIcon, Send, MessageCircle, Twitter, Youtube, Instagram, Music, Facebook, Linkedin, Github, Globe } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface EarnItem {
  id?: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  link?: string;
  slug?: string;
  content?: string;
}

interface Tool {
  id?: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  link?: string;
}

interface Experiment {
  id?: string;
  title: string;
  description: string;
  status: 'live' | 'testing' | 'coming';
  imageUrl?: string;
  link?: string;
  slug?: string;
  content?: string;
}

interface SocialLink {
  id?: string;
  platform: string;
  icon: string;
  url: string;
  enabled: boolean;
  sort_order: number;
}

const ICON_OPTIONS = [
  'Zap', 'Clock', 'DollarSign', 'Star', 'Target', 'Gift', 'Trophy', 'Coins',
  'Calculator', 'Map', 'Sword', 'Wrench', 'Beaker', 'TestTube', 'Atom', 'FlaskConical',
  'Rocket', 'Crown', 'Heart', 'Shield', 'Gem', 'Wallet', 'CreditCard', 'PiggyBank'
];

const SOCIAL_ICON_OPTIONS = [
  { value: 'Send', label: 'Telegram' },
  { value: 'MessageCircle', label: 'WhatsApp' },
  { value: 'Twitter', label: 'X / Twitter' },
  { value: 'Youtube', label: 'YouTube' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Music', label: 'TikTok' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Linkedin', label: 'LinkedIn' },
  { value: 'Github', label: 'GitHub' },
  { value: 'Globe', label: 'Website' },
];

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Send, MessageCircle, Twitter, Youtube, Instagram, Music, Facebook, Linkedin, Github, Globe
};

const AdminDashboard = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [earnItems, setEarnItems] = useState<EarnItem[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [editingEarn, setEditingEarn] = useState<EarnItem | null>(null);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [editingExperiment, setEditingExperiment] = useState<Experiment | null>(null);
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);

  const [earnForm, setEarnForm] = useState<EarnItem>({ title: '', description: '', icon: 'Coins', imageUrl: '', link: '', slug: '', content: '' });
  const [toolForm, setToolForm] = useState<Tool>({ title: '', description: '', icon: 'Wrench', imageUrl: '', link: '' });
  const [experimentForm, setExperimentForm] = useState<Experiment>({ title: '', description: '', status: 'coming', imageUrl: '', link: '', slug: '', content: '' });
  const [socialForm, setSocialForm] = useState<SocialLink>({ platform: '', icon: 'Send', url: '', enabled: true, sort_order: 0 });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [earnRes, toolsRes, experimentsRes, socialRes] = await Promise.all([
        supabase.from('earn').select('*'),
        supabase.from('tools').select('*'),
        supabase.from('experiments').select('*'),
        supabase.from('social_links').select('*').order('sort_order', { ascending: true }),
      ]);

      if (earnRes.error) throw earnRes.error;
      if (toolsRes.error) throw toolsRes.error;
      if (experimentsRes.error) throw experimentsRes.error;
      // Social links might not exist yet, so we handle that gracefully
      
      setEarnItems(earnRes.data || []);
      setTools(toolsRes.data || []);
      setExperiments(experimentsRes.data || []);
      setSocialLinks(socialRes.data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch data', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  // Helper to normalize URLs
  const normalizeUrl = (url: string): string => {
    if (!url) return '';
    url = url.trim();
    if (url && !url.match(/^https?:\/\//i)) {
      return 'https://' + url;
    }
    return url;
  };

  // Earn CRUD
  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const saveEarn = async () => {
    if (!earnForm.title || !earnForm.description) return;
    try {
      const slug = earnForm.slug || generateSlug(earnForm.title);
      const data = { 
        title: earnForm.title, 
        description: earnForm.description, 
        icon: earnForm.icon,
        imageUrl: earnForm.imageUrl || '',
        link: normalizeUrl(earnForm.link || ''),
        slug,
        content: earnForm.content || ''
      };
      if (editingEarn?.id) {
        const { error } = await supabase.from('earn').update(data).eq('id', editingEarn.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Earn item updated' });
      } else {
        const { error } = await supabase.from('earn').insert(data);
        if (error) throw error;
        toast({ title: 'Success', description: 'Earn item created' });
      }
      setEarnForm({ title: '', description: '', icon: 'Coins', imageUrl: '', link: '', slug: '', content: '' });
      setEditingEarn(null);
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save earn item', variant: 'destructive' });
    }
  };

  const deleteEarn = async (id: string) => {
    try {
      const { error } = await supabase.from('earn').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Earn item deleted' });
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete earn item', variant: 'destructive' });
    }
  };

  // Tool CRUD
  const saveTool = async () => {
    if (!toolForm.title || !toolForm.description) return;
    try {
      const data = { 
        title: toolForm.title, 
        description: toolForm.description, 
        icon: toolForm.icon,
        imageUrl: toolForm.imageUrl || '',
        link: normalizeUrl(toolForm.link || '')
      };
      if (editingTool?.id) {
        const { error } = await supabase.from('tools').update(data).eq('id', editingTool.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Tool updated' });
      } else {
        const { error } = await supabase.from('tools').insert(data);
        if (error) throw error;
        toast({ title: 'Success', description: 'Tool created' });
      }
      setToolForm({ title: '', description: '', icon: 'Wrench', imageUrl: '', link: '' });
      setEditingTool(null);
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save tool', variant: 'destructive' });
    }
  };

  const deleteTool = async (id: string) => {
    try {
      const { error } = await supabase.from('tools').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Tool deleted' });
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete tool', variant: 'destructive' });
    }
  };

  // Experiment CRUD
  const saveExperiment = async () => {
    if (!experimentForm.title || !experimentForm.description) return;
    try {
      const slug = experimentForm.slug || generateSlug(experimentForm.title);
      const data = { 
        title: experimentForm.title, 
        description: experimentForm.description, 
        status: experimentForm.status,
        imageUrl: experimentForm.imageUrl || '',
        link: normalizeUrl(experimentForm.link || ''),
        slug,
        content: experimentForm.content || ''
      };
      if (editingExperiment?.id) {
        const { error } = await supabase.from('experiments').update(data).eq('id', editingExperiment.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Experiment updated' });
      } else {
        const { error } = await supabase.from('experiments').insert(data);
        if (error) throw error;
        toast({ title: 'Success', description: 'Experiment created' });
      }
      setExperimentForm({ title: '', description: '', status: 'coming', imageUrl: '', link: '', slug: '', content: '' });
      setEditingExperiment(null);
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save experiment', variant: 'destructive' });
    }
  };

  const deleteExperiment = async (id: string) => {
    try {
      const { error } = await supabase.from('experiments').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Experiment deleted' });
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete experiment', variant: 'destructive' });
    }
  };

  // Social Links CRUD
  const saveSocialLink = async () => {
    if (!socialForm.platform || !socialForm.icon) return;
    try {
      const data = { 
        platform: socialForm.platform, 
        icon: socialForm.icon,
        url: normalizeUrl(socialForm.url || ''),
        enabled: socialForm.enabled,
        sort_order: socialForm.sort_order
      };
      if (editingSocial?.id) {
        const { error } = await supabase.from('social_links').update(data).eq('id', editingSocial.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Social link updated' });
      } else {
        const { error } = await supabase.from('social_links').insert(data);
        if (error) throw error;
        toast({ title: 'Success', description: 'Social link created' });
      }
      setSocialForm({ platform: '', icon: 'Send', url: '', enabled: true, sort_order: 0 });
      setEditingSocial(null);
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save social link', variant: 'destructive' });
    }
  };

  const deleteSocialLink = async (id: string) => {
    try {
      const { error } = await supabase.from('social_links').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Social link deleted' });
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete social link', variant: 'destructive' });
    }
  };

  const toggleSocialEnabled = async (link: SocialLink) => {
    try {
      const { error } = await supabase.from('social_links').update({ enabled: !link.enabled }).eq('id', link.id);
      if (error) throw error;
      toast({ title: 'Success', description: `${link.platform} ${!link.enabled ? 'enabled' : 'disabled'}` });
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update social link', variant: 'destructive' });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-pixel text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-pixel text-lg text-primary">ADMIN PANEL</h1>
          <Button variant="outline" onClick={handleLogout} className="font-pixel text-xs gap-2">
            <LogOut className="w-4 h-4" />
            LOGOUT
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="earn" className="space-y-8">
          <TabsList className="font-pixel text-xs grid w-full grid-cols-4 h-12">
            <TabsTrigger value="earn" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              EARN
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              TOOLS
            </TabsTrigger>
            <TabsTrigger value="experiments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              EXPERIMENTS
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              SOCIAL
            </TabsTrigger>
          </TabsList>

          {/* Earn Tab */}
          <TabsContent value="earn" className="space-y-6">
            <div className="pixel-border bg-card p-6">
              <h2 className="font-pixel text-sm mb-6 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {editingEarn ? 'EDIT EARN ITEM' : 'ADD EARN ITEM'}
              </h2>
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs">Title</Label>
                    <Input
                      value={earnForm.title}
                      onChange={(e) => setEarnForm({ ...earnForm, title: e.target.value })}
                      placeholder="Daily Rewards"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs">Icon</Label>
                    <Select value={earnForm.icon} onValueChange={(v) => setEarnForm({ ...earnForm, icon: v })}>
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ICON_OPTIONS.map(icon => (
                          <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-pixel text-xs">Description</Label>
                  <Textarea
                    value={earnForm.description}
                    onChange={(e) => setEarnForm({ ...earnForm, description: e.target.value })}
                    placeholder="Log in daily to claim free rewards..."
                    className="bg-background min-h-[80px]"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs">Image (optional)</Label>
                    <ImageUpload
                      value={earnForm.imageUrl}
                      onChange={(url) => setEarnForm({ ...earnForm, imageUrl: url })}
                      folder="earn"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs flex items-center gap-2">
                      <ExternalLink className="w-3 h-3" /> Link URL (optional)
                    </Label>
                    <Input
                      value={earnForm.link}
                      onChange={(e) => setEarnForm({ ...earnForm, link: e.target.value })}
                      placeholder="https://example.com"
                      className="bg-background"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs">Slug (auto-generated if empty)</Label>
                    <Input
                      value={earnForm.slug}
                      onChange={(e) => setEarnForm({ ...earnForm, slug: e.target.value })}
                      placeholder="my-earn-post"
                      className="bg-background"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-pixel text-xs">Content (HTML supported)</Label>
                  <Textarea
                    value={earnForm.content}
                    onChange={(e) => setEarnForm({ ...earnForm, content: e.target.value })}
                    placeholder="<p>Detailed content for the post page...</p>"
                    className="bg-background min-h-[120px]"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={saveEarn} className="font-pixel text-xs gap-2">
                  <Plus className="w-4 h-4" />
                  {editingEarn ? 'UPDATE' : 'ADD'}
                </Button>
                {editingEarn && (
                  <Button variant="outline" onClick={() => { setEditingEarn(null); setEarnForm({ title: '', description: '', icon: 'Coins', imageUrl: '', link: '', slug: '', content: '' }); }} className="font-pixel text-xs">
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-pixel text-xs text-muted-foreground">EARN ITEMS ({earnItems.length})</h3>
              {earnItems.map((item) => (
                <div key={item.id} className="pixel-border bg-card p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-pixel text-xs text-primary">{item.icon}</span>
                      <h3 className="font-pixel text-xs truncate">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    {(item.imageUrl || item.link) && (
                      <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                        {item.imageUrl && <span className="flex items-center gap-1"><ImageIcon className="w-3 h-3" /> Has image</span>}
                        {item.link && <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Has link</span>}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => { setEditingEarn(item); setEarnForm(item); }}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => item.id && deleteEarn(item.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              {earnItems.length === 0 && (
                <div className="pixel-border bg-card/50 p-8 text-center">
                  <p className="text-muted-foreground text-sm">No earn items yet. Add your first one above!</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="pixel-border bg-card p-6">
              <h2 className="font-pixel text-sm mb-6 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {editingTool ? 'EDIT TOOL' : 'ADD TOOL'}
              </h2>
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs">Title</Label>
                    <Input
                      value={toolForm.title}
                      onChange={(e) => setToolForm({ ...toolForm, title: e.target.value })}
                      placeholder="Calculator"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs">Icon</Label>
                    <Select value={toolForm.icon} onValueChange={(v) => setToolForm({ ...toolForm, icon: v })}>
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ICON_OPTIONS.map(icon => (
                          <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-pixel text-xs">Description</Label>
                  <Textarea
                    value={toolForm.description}
                    onChange={(e) => setToolForm({ ...toolForm, description: e.target.value })}
                    placeholder="Stat calculators, damage estimators..."
                    className="bg-background min-h-[80px]"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs">Image (optional)</Label>
                    <ImageUpload
                      value={toolForm.imageUrl}
                      onChange={(url) => setToolForm({ ...toolForm, imageUrl: url })}
                      folder="tools"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs flex items-center gap-2">
                      <ExternalLink className="w-3 h-3" /> Link URL (optional)
                    </Label>
                    <Input
                      value={toolForm.link}
                      onChange={(e) => setToolForm({ ...toolForm, link: e.target.value })}
                      placeholder="https://example.com"
                      className="bg-background"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={saveTool} className="font-pixel text-xs gap-2">
                  <Plus className="w-4 h-4" />
                  {editingTool ? 'UPDATE' : 'ADD'}
                </Button>
                {editingTool && (
                  <Button variant="outline" onClick={() => { setEditingTool(null); setToolForm({ title: '', description: '', icon: 'Wrench', imageUrl: '', link: '' }); }} className="font-pixel text-xs">
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-pixel text-xs text-muted-foreground">TOOLS ({tools.length})</h3>
              {tools.map((tool) => (
                <div key={tool.id} className="pixel-border bg-card p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-pixel text-xs text-primary">{tool.icon}</span>
                      <h3 className="font-pixel text-xs truncate">{tool.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                    {(tool.imageUrl || tool.link) && (
                      <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                        {tool.imageUrl && <span className="flex items-center gap-1"><ImageIcon className="w-3 h-3" /> Has image</span>}
                        {tool.link && <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Has link</span>}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => { setEditingTool(tool); setToolForm(tool); }}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => tool.id && deleteTool(tool.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              {tools.length === 0 && (
                <div className="pixel-border bg-card/50 p-8 text-center">
                  <p className="text-muted-foreground text-sm">No tools yet. Add your first one above!</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Experiments Tab */}
          <TabsContent value="experiments" className="space-y-6">
            <div className="pixel-border bg-card p-6">
              <h2 className="font-pixel text-sm mb-6 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {editingExperiment ? 'EDIT EXPERIMENT' : 'ADD EXPERIMENT'}
              </h2>
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs">Title</Label>
                    <Input
                      value={experimentForm.title}
                      onChange={(e) => setExperimentForm({ ...experimentForm, title: e.target.value })}
                      placeholder="Beta Feature"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs">Status</Label>
                    <Select value={experimentForm.status} onValueChange={(v: 'live' | 'testing' | 'coming') => setExperimentForm({ ...experimentForm, status: v })}>
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="live">🟢 Live</SelectItem>
                        <SelectItem value="testing">🟡 Testing</SelectItem>
                        <SelectItem value="coming">🔵 Coming Soon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-pixel text-xs">Description</Label>
                  <Textarea
                    value={experimentForm.description}
                    onChange={(e) => setExperimentForm({ ...experimentForm, description: e.target.value })}
                    placeholder="Try out experimental features..."
                    className="bg-background min-h-[80px]"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs">Image (optional)</Label>
                    <ImageUpload
                      value={experimentForm.imageUrl}
                      onChange={(url) => setExperimentForm({ ...experimentForm, imageUrl: url })}
                      folder="experiments"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs flex items-center gap-2">
                      <ExternalLink className="w-3 h-3" /> Link URL (optional)
                    </Label>
                    <Input
                      value={experimentForm.link}
                      onChange={(e) => setExperimentForm({ ...experimentForm, link: e.target.value })}
                      placeholder="https://example.com"
                      className="bg-background"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs">Slug (auto-generated if empty)</Label>
                    <Input
                      value={experimentForm.slug}
                      onChange={(e) => setExperimentForm({ ...experimentForm, slug: e.target.value })}
                      placeholder="my-experiment"
                      className="bg-background"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-pixel text-xs">Content (HTML supported)</Label>
                  <Textarea
                    value={experimentForm.content}
                    onChange={(e) => setExperimentForm({ ...experimentForm, content: e.target.value })}
                    placeholder="<p>Detailed content for the experiment page...</p>"
                    className="bg-background min-h-[120px]"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={saveExperiment} className="font-pixel text-xs gap-2">
                  <Plus className="w-4 h-4" />
                  {editingExperiment ? 'UPDATE' : 'ADD'}
                </Button>
                {editingExperiment && (
                  <Button variant="outline" onClick={() => { setEditingExperiment(null); setExperimentForm({ title: '', description: '', status: 'coming', imageUrl: '', link: '', slug: '', content: '' }); }} className="font-pixel text-xs">
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-pixel text-xs text-muted-foreground">EXPERIMENTS ({experiments.length})</h3>
              {experiments.map((exp) => (
                <div key={exp.id} className="pixel-border bg-card p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-pixel text-[10px] px-2 py-0.5 rounded ${
                        exp.status === 'live' ? 'bg-green-500/20 text-green-400' : 
                        exp.status === 'testing' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {exp.status.toUpperCase()}
                      </span>
                      <h3 className="font-pixel text-xs truncate">{exp.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{exp.description}</p>
                    {(exp.imageUrl || exp.link) && (
                      <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                        {exp.imageUrl && <span className="flex items-center gap-1"><ImageIcon className="w-3 h-3" /> Has image</span>}
                        {exp.link && <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Has link</span>}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => { setEditingExperiment(exp); setExperimentForm(exp); }}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => exp.id && deleteExperiment(exp.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              {experiments.length === 0 && (
                <div className="pixel-border bg-card/50 p-8 text-center">
                  <p className="text-muted-foreground text-sm">No experiments yet. Add your first one above!</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Social Links Tab */}
          <TabsContent value="social" className="space-y-6">
            <div className="pixel-border bg-card p-6">
              <h2 className="font-pixel text-sm mb-6 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {editingSocial ? 'EDIT SOCIAL LINK' : 'ADD SOCIAL LINK'}
              </h2>
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs">Platform Name</Label>
                    <Input
                      value={socialForm.platform}
                      onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
                      placeholder="Telegram"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs">Icon</Label>
                    <Select value={socialForm.icon} onValueChange={(v) => setSocialForm({ ...socialForm, icon: v })}>
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SOCIAL_ICON_OPTIONS.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>
                            <div className="flex items-center gap-2">
                              {(() => { const Icon = socialIconMap[opt.value]; return Icon ? <Icon className="w-4 h-4" /> : null; })()}
                              {opt.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs flex items-center gap-2">
                      <ExternalLink className="w-3 h-3" /> Link URL
                    </Label>
                    <Input
                      value={socialForm.url}
                      onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
                      placeholder="https://t.me/yourgroup"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-pixel text-xs">Sort Order</Label>
                    <Input
                      type="number"
                      value={socialForm.sort_order}
                      onChange={(e) => setSocialForm({ ...socialForm, sort_order: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                      className="bg-background"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={saveSocialLink} className="font-pixel text-xs gap-2">
                  <Plus className="w-4 h-4" />
                  {editingSocial ? 'UPDATE' : 'ADD'}
                </Button>
                {editingSocial && (
                  <Button variant="outline" onClick={() => { setEditingSocial(null); setSocialForm({ platform: '', icon: 'Send', url: '', enabled: true, sort_order: 0 }); }} className="font-pixel text-xs">
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-pixel text-xs text-muted-foreground">SOCIAL LINKS ({socialLinks.length})</h3>
              {socialLinks.map((link) => {
                const IconComponent = socialIconMap[link.icon] || Globe;
                return (
                  <div key={link.id} className="pixel-border bg-card p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${link.enabled ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-pixel text-xs truncate">{link.platform}</h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded ${link.enabled ? 'bg-green-500/20 text-green-400' : 'bg-muted text-muted-foreground'}`}>
                            {link.enabled ? 'ON' : 'OFF'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{link.url || 'No URL set'}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="icon" 
                        variant={link.enabled ? "default" : "outline"} 
                        className="h-8 w-8" 
                        onClick={() => link.id && toggleSocialEnabled(link)}
                        title={link.enabled ? 'Disable' : 'Enable'}
                      >
                        {link.enabled ? '✓' : '○'}
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => { setEditingSocial(link); setSocialForm(link); }}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => link.id && deleteSocialLink(link.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                );
              })}
              {socialLinks.length === 0 && (
                <div className="pixel-border bg-card/50 p-8 text-center">
                  <p className="text-muted-foreground text-sm">No social links yet. Add your first one above!</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
