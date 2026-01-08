import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, LogOut, ExternalLink, ImageIcon } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface EarnItem {
  id?: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  link?: string;
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
}

const ICON_OPTIONS = [
  'Zap', 'Clock', 'DollarSign', 'Star', 'Target', 'Gift', 'Trophy', 'Coins',
  'Calculator', 'Map', 'Sword', 'Wrench', 'Beaker', 'TestTube', 'Atom', 'FlaskConical',
  'Rocket', 'Crown', 'Heart', 'Shield', 'Gem', 'Wallet', 'CreditCard', 'PiggyBank'
];

const AdminDashboard = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [earnItems, setEarnItems] = useState<EarnItem[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [editingEarn, setEditingEarn] = useState<EarnItem | null>(null);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [editingExperiment, setEditingExperiment] = useState<Experiment | null>(null);

  const [earnForm, setEarnForm] = useState<EarnItem>({ title: '', description: '', icon: 'Coins', imageUrl: '', link: '' });
  const [toolForm, setToolForm] = useState<Tool>({ title: '', description: '', icon: 'Wrench', imageUrl: '', link: '' });
  const [experimentForm, setExperimentForm] = useState<Experiment>({ title: '', description: '', status: 'coming', imageUrl: '', link: '' });

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
      const [earnSnap, toolsSnap, experimentsSnap] = await Promise.all([
        getDocs(collection(db, 'earn')),
        getDocs(collection(db, 'tools')),
        getDocs(collection(db, 'experiments')),
      ]);

      setEarnItems(earnSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as EarnItem)));
      setTools(toolsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tool)));
      setExperiments(experimentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Experiment)));
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

  // Earn CRUD
  const saveEarn = async () => {
    if (!earnForm.title || !earnForm.description) return;
    try {
      const data = { 
        title: earnForm.title, 
        description: earnForm.description, 
        icon: earnForm.icon,
        imageUrl: earnForm.imageUrl || '',
        link: earnForm.link || ''
      };
      if (editingEarn?.id) {
        await updateDoc(doc(db, 'earn', editingEarn.id), data);
        toast({ title: 'Success', description: 'Earn item updated' });
      } else {
        await addDoc(collection(db, 'earn'), data);
        toast({ title: 'Success', description: 'Earn item created' });
      }
      setEarnForm({ title: '', description: '', icon: 'Coins', imageUrl: '', link: '' });
      setEditingEarn(null);
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save earn item', variant: 'destructive' });
    }
  };

  const deleteEarn = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'earn', id));
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
        link: toolForm.link || ''
      };
      if (editingTool?.id) {
        await updateDoc(doc(db, 'tools', editingTool.id), data);
        toast({ title: 'Success', description: 'Tool updated' });
      } else {
        await addDoc(collection(db, 'tools'), data);
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
      await deleteDoc(doc(db, 'tools', id));
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
      const data = { 
        title: experimentForm.title, 
        description: experimentForm.description, 
        status: experimentForm.status,
        imageUrl: experimentForm.imageUrl || '',
        link: experimentForm.link || ''
      };
      if (editingExperiment?.id) {
        await updateDoc(doc(db, 'experiments', editingExperiment.id), data);
        toast({ title: 'Success', description: 'Experiment updated' });
      } else {
        await addDoc(collection(db, 'experiments'), data);
        toast({ title: 'Success', description: 'Experiment created' });
      }
      setExperimentForm({ title: '', description: '', status: 'coming', imageUrl: '', link: '' });
      setEditingExperiment(null);
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save experiment', variant: 'destructive' });
    }
  };

  const deleteExperiment = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'experiments', id));
      toast({ title: 'Success', description: 'Experiment deleted' });
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete experiment', variant: 'destructive' });
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
          <TabsList className="font-pixel text-xs grid w-full grid-cols-3 h-12">
            <TabsTrigger value="earn" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              EARN
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              TOOLS
            </TabsTrigger>
            <TabsTrigger value="experiments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              EXPERIMENTS
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
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={saveEarn} className="font-pixel text-xs gap-2">
                  <Plus className="w-4 h-4" />
                  {editingEarn ? 'UPDATE' : 'ADD'}
                </Button>
                {editingEarn && (
                  <Button variant="outline" onClick={() => { setEditingEarn(null); setEarnForm({ title: '', description: '', icon: 'Coins', imageUrl: '', link: '' }); }} className="font-pixel text-xs">
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
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={saveExperiment} className="font-pixel text-xs gap-2">
                  <Plus className="w-4 h-4" />
                  {editingExperiment ? 'UPDATE' : 'ADD'}
                </Button>
                {editingExperiment && (
                  <Button variant="outline" onClick={() => { setEditingExperiment(null); setExperimentForm({ title: '', description: '', status: 'coming', imageUrl: '', link: '' }); }} className="font-pixel text-xs">
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
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;