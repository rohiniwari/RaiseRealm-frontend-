import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProjectCard from '../components/project/ProjectCard';
import AISuggestions from '../components/dashboard/AISuggestions';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { projectService } from '../services/projectService';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/helpers';
import { Plus, TrendingUp, Users, DollarSign, Edit2, Trash2 } from 'lucide-react';

export default function CreatorDashboard() {
  const { user } = useAuth();
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestionKey, setSuggestionKey] = useState(0);

  useEffect(() => {
    loadCreatorData();
  }, []);

  const loadCreatorData = async () => {
    try {
      const projects = await projectService.getUserProjects().catch(() => []);
      setMyProjects(projects);
    } catch (error) {
      console.error('Error loading creator data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId, e) => {
    e.preventDefault();
    if (!confirm('Delete this project?')) return;
    try {
      await projectService.deleteProject(projectId);
      loadCreatorData();
      setSuggestionKey(k => k + 1);
    } catch (error) {
      alert('Delete failed');
    }
  };

  const totalRaised = myProjects.reduce((sum, p) => sum + (p.current_amount || 0), 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-screen-xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Creator Dashboard</h1>
              <p className="text-slate-600 mt-1">Manage your campaigns, {user.name}</p>
            </div>
            <Link to="/create-project">
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
            </Link>
          </div>

          {/* AI Suggestions */}
          <AISuggestions projects={myProjects} refreshKey={suggestionKey} />

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Total Raised</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary-600">{formatCurrency(totalRaised)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{myProjects.filter(p => p.is_active).length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{myProjects.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Your Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {myProjects.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myProjects.map(project => (
                    <div key={project.id} className="group relative">
                      <Link to={`/project/${project.id}`}>
                        <ProjectCard project={project} />
                      </Link>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all flex gap-1">
                        <Link to={`/project/${project.id}/edit`} className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <button onClick={(e) => handleDeleteProject(project.id, e)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-500 mb-4">No projects yet</p>
                  <Link to="/create-project">
                    <Button>Create Your First</Button>
                  </Link>
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

