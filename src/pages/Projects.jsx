import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProjectCard from '../components/project/ProjectCard';
import { projectService } from '../services/projectService';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { categories } from '../utils/helpers';
import { Search, Filter } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    loadProjects();
  }, [category, sort]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const params = { sort };
      if (category !== 'all') params.category = category;
      if (search) params.search = search;
      
      const data = await projectService.getProjects(params);
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadProjects();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl">Discover Projects</h1>
            <p className="mt-2 text-slate-600">Find your next project to back or get inspired</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 mb-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="ending">Ending Soon</option>
              </select>
              <Button type="submit">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </form>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 text-slate-500">
                <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                Loading projects...
              </div>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 mb-4">No projects found</p>
              <Link to="/create-project">
                <Button>Start the first project</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
