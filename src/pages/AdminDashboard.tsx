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
import { Pencil, Trash2, Plus, LogOut } from 'lucide-react';

interface Guide {
  id?: string;
  title: string;
  category: string;
}

interface Tool {
  id?: string;
  title: string;
  description: string;
  icon: string;
}

interface Experiment {
  id?: string;
  title: string;
  description: string;
  status: 'live' | 'testing' | 'coming';
}

const AdminDashboard = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [guides, setGuides] = useState<Guide[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [editingExperiment, setEditingExperiment] = useState<Experiment | null>(null);

  const [guideForm, setGuideForm] = useState<Guide>({ title: '', category: '' });
  const [toolForm, setToolForm] = useState<Tool>({ title: '', description: '', icon: 'Zap' });
  const [experimentForm, setExperimentForm] = useState<Experiment>({ title: '', description: '', status: 'coming' });

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
      const [guidesSnap, toolsSnap, experimentsSnap] = await Promise.all([
        getDocs(collection(db, 'guides')),
        getDocs(collection(db, 'tools')),
        getDocs(collection(db, 'experiments')),
      ]);

      setGuides(guidesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Guide)));
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

  // Guide CRUD
  const saveGuide = async () => {
    if (!guideForm.title || !guideForm.category) return;
    try {
      if (editingGuide?.id) {
        await updateDoc(doc(db, 'guides', editingGuide.id), { title: guideForm.title, category: guideForm.category });
        toast({ title: 'Success', description: 'Guide updated' });
      } else {
        await addDoc(collection(db, 'guides'), { title: guideForm.title, category: guideForm.category });
        toast({ title: 'Success', description: 'Guide created' });
      }
      setGuideForm({ title: '', category: '' });
      setEditingGuide(null);
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save guide', variant: 'destructive' });
    }
  };

  const deleteGuide = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'guides', id));
      toast({ title: 'Success', description: 'Guide deleted' });
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete guide', variant: 'destructive' });
    }
  };

  // Tool CRUD
  const saveTool = async () => {
    if (!toolForm.title || !toolForm.description) return;
    try {
      if (editingTool?.id) {
        await updateDoc(doc(db, 'tools', editingTool.id), { title: toolForm.title, description: toolForm.description, icon: toolForm.icon });
        toast({ title: 'Success', description: 'Tool updated' });
      } else {
        await addDoc(collection(db, 'tools'), { title: toolForm.title, description: toolForm.description, icon: toolForm.icon });
        toast({ title: 'Success', description: 'Tool created' });
      }
      setToolForm({ title: '', description: '', icon: 'Zap' });
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
      if (editingExperiment?.id) {
        await updateDoc(doc(db, 'experiments', editingExperiment.id), { title: experimentForm.title, description: experimentForm.description, status: experimentForm.status });
        toast({ title: 'Success', description: 'Experiment updated' });
      } else {
        await addDoc(collection(db, 'experiments'), { title: experimentForm.title, description: experimentForm.description, status: experimentForm.status });
        toast({ title: 'Success', description: 'Experiment created' });
      }
      setExperimentForm({ title: '', description: '', status: 'coming' });
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-pixel text-sm">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-pixel text-lg text-foreground">ADMIN DASHBOARD</h1>
          <Button variant="outline" onClick={handleLogout} className="font-pixel text-xs">
            <LogOut className="w-4 h-4 mr-2" />
            LOGOUT
          </Button>
        </div>

        <Tabs defaultValue="guides" className="space-y-6">
          <TabsList className="font-pixel text-xs">
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="experiments">Experiments</TabsTrigger>
          </TabsList>

          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="pixel-border bg-card p-6">
              <h2 className="font-pixel text-sm mb-4">{editingGuide ? 'EDIT GUIDE' : 'ADD GUIDE'}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={guideForm.title}
                    onChange={(e) => setGuideForm({ ...guideForm, title: e.target.value })}
                    placeholder="Guide title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={guideForm.category}
                    onChange={(e) => setGuideForm({ ...guideForm, category: e.target.value })}
                    placeholder="Beginner, Education, etc."
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={saveGuide} className="font-pixel text-xs">
                  <Plus className="w-4 h-4 mr-2" />
                  {editingGuide ? 'UPDATE' : 'ADD'}
                </Button>
                {editingGuide && (
                  <Button variant="outline" onClick={() => { setEditingGuide(null); setGuideForm({ title: '', category: '' }); }}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {guides.map((guide) => (
                <div key={guide.id} className="pixel-border bg-card p-4 flex items-center justify-between">
                  <div>
                    <span className="font-pixel text-[10px] text-neon-green bg-neon-green/10 px-2 py-1 mr-3">
                      {guide.category}
                    </span>
                    <span className="text-sm">{guide.title}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => { setEditingGuide(guide); setGuideForm(guide); }}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => guide.id && deleteGuide(guide.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              {guides.length === 0 && <p className="text-muted-foreground text-sm text-center py-8">No guides yet</p>}
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="pixel-border bg-card p-6">
              <h2 className="font-pixel text-sm mb-4">{editingTool ? 'EDIT TOOL' : 'ADD TOOL'}</h2>
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={toolForm.title}
                      onChange={(e) => setToolForm({ ...toolForm, title: e.target.value })}
                      placeholder="Tool title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <Select value={toolForm.icon} onValueChange={(v) => setToolForm({ ...toolForm, icon: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Zap">Zap</SelectItem>
                        <SelectItem value="Clock">Clock</SelectItem>
                        <SelectItem value="DollarSign">DollarSign</SelectItem>
                        <SelectItem value="Star">Star</SelectItem>
                        <SelectItem value="Target">Target</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={toolForm.description}
                    onChange={(e) => setToolForm({ ...toolForm, description: e.target.value })}
                    placeholder="Tool description"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={saveTool} className="font-pixel text-xs">
                  <Plus className="w-4 h-4 mr-2" />
                  {editingTool ? 'UPDATE' : 'ADD'}
                </Button>
                {editingTool && (
                  <Button variant="outline" onClick={() => { setEditingTool(null); setToolForm({ title: '', description: '', icon: 'Zap' }); }}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {tools.map((tool) => (
                <div key={tool.id} className="pixel-border bg-card p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-pixel text-xs mb-1">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => { setEditingTool(tool); setToolForm(tool); }}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => tool.id && deleteTool(tool.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              {tools.length === 0 && <p className="text-muted-foreground text-sm text-center py-8">No tools yet</p>}
            </div>
          </TabsContent>

          {/* Experiments Tab */}
          <TabsContent value="experiments" className="space-y-6">
            <div className="pixel-border bg-card p-6">
              <h2 className="font-pixel text-sm mb-4">{editingExperiment ? 'EDIT EXPERIMENT' : 'ADD EXPERIMENT'}</h2>
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={experimentForm.title}
                      onChange={(e) => setExperimentForm({ ...experimentForm, title: e.target.value })}
                      placeholder="Experiment title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={experimentForm.status} onValueChange={(v: 'live' | 'testing' | 'coming') => setExperimentForm({ ...experimentForm, status: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="live">Live</SelectItem>
                        <SelectItem value="testing">Testing</SelectItem>
                        <SelectItem value="coming">Coming Soon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={experimentForm.description}
                    onChange={(e) => setExperimentForm({ ...experimentForm, description: e.target.value })}
                    placeholder="Experiment description"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={saveExperiment} className="font-pixel text-xs">
                  <Plus className="w-4 h-4 mr-2" />
                  {editingExperiment ? 'UPDATE' : 'ADD'}
                </Button>
                {editingExperiment && (
                  <Button variant="outline" onClick={() => { setEditingExperiment(null); setExperimentForm({ title: '', description: '', status: 'coming' }); }}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {experiments.map((exp) => (
                <div key={exp.id} className="pixel-border bg-card p-4 flex items-center justify-between">
                  <div>
                    <span className={`font-pixel text-[10px] px-2 py-1 mr-3 ${
                      exp.status === 'live' ? 'badge-live' : 
                      exp.status === 'testing' ? 'badge-testing' : 'badge-coming'
                    }`}>
                      {exp.status.toUpperCase()}
                    </span>
                    <h3 className="font-pixel text-xs inline">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => { setEditingExperiment(exp); setExperimentForm(exp); }}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => exp.id && deleteExperiment(exp.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              {experiments.length === 0 && <p className="text-muted-foreground text-sm text-center py-8">No experiments yet</p>}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
