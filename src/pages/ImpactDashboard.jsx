import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { projectService } from '../services/projectService';
import { formatCurrency, formatDate } from '../utils/helpers';
import { Plus, Image, Video, BarChart3 } from 'lucide-react';

export default function ImpactDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState({ title: '', description: '', media: [] });
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (user) loadProjects();
  }, [user]);

  const loadProjects = async () => {
    try {
      const myProjects = await projectService.getUserProjects();
      setProjects(myProjects);
      if (myProjects.length > 0) {
        setSelectedProject(myProjects[0]);
        loadUpdates(myProjects[0].id);
      }
    } catch (error) {
      console.error('Load projects error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUpdates = async (projectId) => {
    try {
      // Assume impactService or projectService.getProjectUpdates(projectId)
      const updates = await projectService.getProjectUpdates(projectId); // TODO: add service
      setUpdates(updates);
    } catch (error) {
      console.error('Load updates error:', error);
    }
  };

  const handlePostUpdate = async () => {
    setPosting(true);
    try {
      const updateData = {
        project_id: selectedProject.id,
        title: newUpdate.title,
        description: newUpdate.description,
        milestone_id: null // Link to milestone if needed
      };
      // await impactService.createUpdate(updateData);
      setNewUpdate({ title: '', description: '', media: [] });
      loadUpdates(selectedProject.id);
    } catch (error) {
      console.error('Post update error:', error);
    } finally {
      setPosting(false);
    }
  };

  const stats = [
    { label: 'Total Raised', value: formatCurrency(selectedProject?.current_amount || 0) },
    { label: 'Funds Used', value: formatCurrency(selectedProject?.current_amount * 0.7 || 0) }, // Mock
    { label: 'Updates Posted', value: updates.length },
    { label: 'Engagement', value: '2.1k views' } // Mock
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1 py-12 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Impact Dashboard
            </h1>
            <p className="text-xl text-slate-600 mt-2">Share your progress and maintain transparency</p>
          </div>

          {/* Project Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Select Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {projects.map(project => (
                  <Button
                    key={project.id}
                    variant={selectedProject?.id === project.id ? 'default' : 'outline'}
                    onClick={() => {
                      setSelectedProject(project);
                      loadUpdates(project.id);
                    }}
                    className="flex-1 min-w-[200px] whitespace-nowrap"
                  >
                    {project.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>


          {/* Analytics */}
          {selectedProject && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* New Update Form */}
          {selectedProject && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  New Impact Update
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Update title e.g. 'Prototype Completed'"
                  value={newUpdate.title}
                  onChange={e => setNewUpdate({...newUpdate, title: e.target.value})}
                />
                <Textarea
                  placeholder="Describe your progress, challenges overcome, next steps..."
                  value={newUpdate.description}
                  onChange={e => setNewUpdate({...newUpdate, description: e.target.value})}
                  rows={4}
                />
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <Button type="button" variant="ghost" size="sm">
                    <Image className="h-4 w-4 mr-1" />
                    Add Photo
                  </Button>
                  <Button type="button" variant="ghost" size="sm">
                    <Video className="h-4 w-4 mr-1" />
                    Add Video
                  </Button>
                  <div className="flex-1 border rounded-lg p-2 bg-slate-50">
                    {newUpdate.media.length > 0 ? `${newUpdate.media.length} files` : 'No media'}
                  </div>
                </div>
                <Button onClick={handlePostUpdate} disabled={posting || !newUpdate.title || !newUpdate.description}>
                  {posting ? 'Posting...' : 'Publish Update'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Updates Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Project Updates Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {updates.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <p>No updates yet. Share your first progress update!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {updates.map(update => (
                    <div key={update.id} className="flex gap-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-4 -ml-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="font-semibold text-slate-900">{update.title}</div>
                          <span className="text-xs text-slate-500">{formatDate(update.created_at)}</span>
                        </div>
                        <p className="text-slate-700 mb-4">{update.description}</p>
                        {update.media && update.media.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                            {update.media.map((media, i) => (
                              <img key={i} src={media.url} alt="" className="rounded-lg w-full h-32 object-cover" />
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span>12 likes • 3 comments</span>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

