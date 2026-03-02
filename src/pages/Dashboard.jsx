import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProjectCard from '../components/project/ProjectCard';
import AISuggestions from '../components/dashboard/AISuggestions';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { projectService } from '../services/projectService';
import { contributionService } from '../services/contributionService';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/helpers';
import { Plus, TrendingUp, Users, DollarSign, Trash2, Edit2 } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myProjects, setMyProjects] = useState([]);
  const [backedProjects, setBackedProjects] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('my-projects');
  const [suggestionKey, setSuggestionKey] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const [projects, backed, contribs] = await Promise.all([
        projectService.getUserProjects(),
        projectService.getBackedProjects(),
        contributionService.getUserContributions()
      ]);
      setMyProjects(projects);
      setBackedProjects(backed);
      setContributions(contribs);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId, e) => {
    e.preventDefault();
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;
    
    try {
      await projectService.deleteProject(projectId);
      loadDashboardData();
      // Refresh AI suggestions after delete
      setSuggestionKey(prev => prev + 1);
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const totalBacked = contributions.reduce((sum, c) => sum + c.amount, 0);
  const uniqueProjectsBacked = new Set(contributions.map(c => c.project_id)).size;

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-slate-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-12">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading font-extrabold text-3xl">Dashboard</h1>
              <p className="mt-1 text-slate-600">Welcome back, {user.name}!</p>
            </div>
            <Link to="/create-project">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </Link>
          </div>

          {/* AI Suggestions Section */}
          <div className="mb-8">
            <AISuggestions projects={myProjects} refreshKey={suggestionKey} />
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary-50 text-primary-700">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">My Projects</p>
                    <p className="text-2xl font-bold text-slate-900">{myProjects.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-secondary-50 text-secondary-700">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Projects Backed</p>
                    <p className="text-2xl font-bold text-slate-900">{uniqueProjectsBacked}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-50 text-green-700">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Total Backed</p>
                    <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalBacked)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-amber-50 text-amber-700">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Raised (My Projects)</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatCurrency(myProjects.reduce((sum, p) => sum + (p.current_amount || 0), 0))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 mb-6 overflow-x-auto">
            <nav className="flex gap-4 sm:gap-8 min-w-max">
              <button
                onClick={() => setActiveTab('my-projects')}
                className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'my-projects'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                My Projects
              </button>
              <button
                onClick={() => setActiveTab('backed')}
                className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'backed'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Backed Projects
              </button>
              <button
                onClick={() => setActiveTab('contributions')}
                className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'contributions'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Contribution History
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 text-slate-500">
                <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'my-projects' && (
                <div>
                  {myProjects.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {myProjects.map(project => (
                        <div key={project.id} className="relative group">
                          <Link to={`/project/${project.id}`}>
                            <ProjectCard project={project} />
                          </Link>
                          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <Link 
                              to={`/project/${project.id}/edit`}
                              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-110 transition-all"
                              title="Edit project"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={(e) => handleDeleteProject(project.id, e)}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-110 transition-all"
                              title="Delete project"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-slate-500 mb-4">You haven't created any projects yet</p>
                      <Link to="/create-project">
                        <Button>Create Your First Project</Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'backed' && (
                <div>
                  {backedProjects.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {backedProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-slate-500 mb-4">You haven't backed any projects yet</p>
                      <Link to="/projects">
                        <Button>Discover Projects</Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'contributions' && (
                <div>
                  {contributions.length > 0 ? (
                    <div className="space-y-4">
                      {contributions.map(contribution => (
                        <Card key={contribution.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <img
                                  src={contribution.project?.image_url || 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=200&q=80'}
                                  alt={contribution.project?.title}
                                  className="h-16 w-16 rounded-lg object-cover"
                                />
                                <div>
                                  <Link 
                                    to={`/project/${contribution.project_id}`}
                                    className="font-medium text-slate-900 hover:text-primary-600"
                                  >
                                    {contribution.project?.title}
                                  </Link>
                                  <p className="text-sm text-slate-500">
                                    {contribution.reward ? `Reward: ${contribution.reward.title}` : 'General backing'}
                                  </p>
                                  <p className="text-xs text-slate-400">
                                    {new Date(contribution.created_at).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-slate-900">{formatCurrency(contribution.amount)}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-slate-500">No contribution history yet</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
