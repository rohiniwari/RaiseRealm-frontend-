import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProjectCard from '../components/project/ProjectCard';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { contributionService } from '../services/contributionService';
import { projectService } from '../services/projectService';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/helpers';
import { Users, DollarSign, Heart, Award, MessageCircle, Search, Compass } from 'lucide-react';

export default function BackerDashboard() {
  const { user } = useAuth();
  const [contributions, setContributions] = useState([]);
  const [backedProjects, setBackedProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadBackerData();
    loadAllProjects();
  }, []);

  const loadBackerData = async () => {
    try {
      const contribs = await contributionService.getUserContributions().catch(() => []);
      const projects = await projectService.getBackedProjects().catch(() => []);
      setContributions(contribs);
      setBackedProjects(projects);
    } catch (error) {
      console.error('Error loading backer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllProjects = async () => {
    setProjectsLoading(true);
    try {
      const params = { sort: 'newest' };
      if (search) params.search = search;
      
      const data = await projectService.getProjects(params);
      // Filter out projects the user has already backed
      const backedProjectIds = new Set(backedProjects.map(p => p.id));
      const availableProjects = data.filter(project => !backedProjectIds.has(project.id));
      setAllProjects(availableProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setProjectsLoading(false);
    }
  };

  useEffect(() => {
    if (backedProjects.length > 0) {
      loadAllProjects();
    }
  }, [backedProjects, search]);

  const totalBacked = contributions.reduce((sum, c) => sum + (c.amount || 0), 0);
  const uniqueProjects = new Set(contributions.map(c => c.project_id)).size;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-screen-xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Backer Dashboard</h1>
            <p className="text-slate-600 mt-1">Your portfolio, {user.name}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Backed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(totalBacked)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Projects Supported</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{uniqueProjects}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{contributions.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{backedProjects.filter(p => p.is_active).length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Backed Projects */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Your Supported Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              {backedProjects.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {backedProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-500 mb-4">No backed projects yet</p>
                  <Link to="/projects">
                    <Button>Find Projects to Back</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Contributions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Recent Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {contributions.length ? (
                <div className="space-y-4">
                  {contributions.slice(0, 5).map(contribution => (
                    <div key={contribution.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img 
                        src={contribution.project?.image_url || '/placeholder.jpg'} 
                        alt="" 
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <Link to={`/project/${contribution.project_id}`} className="font-medium hover:text-primary-600 truncate block">
                          {contribution.project?.title}
                        </Link>
                        <p className="text-sm text-slate-500">{new Date(contribution.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{formatCurrency(contribution.amount)}</p>
                        {contribution.reward && (
                          <p className="text-xs text-slate-500">{contribution.reward.title}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-500">No contributions yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Discover Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Compass className="h-5 w-5" />
                  Discover Projects
                </CardTitle>
                <Link to="/projects">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {projectsLoading ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center gap-2 text-slate-500">
                    <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                    Loading projects...
                  </div>
                </div>
              ) : allProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allProjects.slice(0, 6).map(project => (
                    <div key={project.id} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={project.image_url || 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80'}
                        alt={project.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white line-clamp-1">{project.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mt-1">{project.description}</p>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="text-slate-500">{formatCurrency(project.current_amount)} raised</span>
                          <span className="text-slate-500">{formatCurrency(project.goal_amount)} goal</span>
                        </div>
                        <Link to={`/project/${project.id}`} className="mt-3 block">
                          <Button className="w-full" size="sm">
                            Contribute
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-500 mb-4">No projects available</p>
                  <Link to="/projects">
                    <Button>Browse All Projects</Button>
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
