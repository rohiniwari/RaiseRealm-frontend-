import { useState, useEffect } from 'react';
import { Lightbulb, X, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { aiSuggestionService } from '../../services/aiSuggestionService';
import { useNavigate } from 'react-router-dom';

export default function AISuggestions({ projects = [], refreshKey = 0 }) {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    loadSuggestions();
  }, [projects, refreshKey]);

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      // Get dashboard-level suggestions
      const dashboardSuggestions = await aiSuggestionService.getDashboardSuggestions(projects);
      
      // Get project-specific suggestions for active projects
      const activeProjects = projects.filter(p => p.status === 'active');
      const projectSuggestions = await Promise.all(
        activeProjects.slice(0, 2).map(async (project) => {
          const projectSuggestions = await aiSuggestionService.getProjectSuggestions(project);
          return projectSuggestions.map(s => ({ ...s, projectId: project.id, projectTitle: project.title }));
        })
      );

      // Get content suggestions
      const contentSuggestions = await Promise.all(
        activeProjects.slice(0, 2).map(async (project) => {
          const content = await aiSuggestionService.getContentSuggestions(project);
          return content.map(s => ({ ...s, projectId: project.id, projectTitle: project.title }));
        })
      );

      // Combine and sort by priority
      const allSuggestions = [
        ...dashboardSuggestions,
        ...projectSuggestions.flat(),
        ...contentSuggestions.flat()
      ].sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      // Take top 5 suggestions
      setSuggestions(allSuggestions.slice(0, 5));
    } catch (error) {
      console.error('Error loading AI suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (suggestion) => {
    if (suggestion.link) {
      navigate(suggestion.link);
    } else if (suggestion.action === 'Create Project') {
      navigate('/create-project');
    } else if (suggestion.action === 'Share Now' || suggestion.action === 'Share Project') {
      // Open share modal - handled by parent
    } else if (suggestion.action === 'Add Reward' || suggestion.action === 'Add Milestone' || suggestion.action === 'Add Image' || suggestion.action === 'Add Video') {
      navigate(`/project/${suggestion.projectId}/edit`);
    } else if (suggestion.action === 'Update Project' || suggestion.action === 'Post Update') {
      navigate(`/project/${suggestion.projectId}`);
    } else if (suggestion.action === 'View Projects') {
      navigate('/dashboard');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getTypeIcon = (type) => {
    return <Sparkles className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">AI Suggestions</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 text-primary-500 animate-spin" />
          <span className="ml-2 text-slate-500">Analyzing your projects...</span>
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">AI Suggestions</h3>
        </div>
        <div className="text-center py-6">
          <p className="text-slate-500">No suggestions at this time. Your projects are looking great!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">AI Suggestions</h3>
            <p className="text-xs text-slate-500">Personalized tips to improve your projects</p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ChevronRight className={`h-5 w-5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {expanded && (
        <div className="p-4 space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getPriorityColor(suggestion.priority)}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getTypeIcon(suggestion.type)}
                    <span className="font-semibold text-sm">{suggestion.title}</span>
                  </div>
                  <p className="text-sm opacity-80 mb-2">{suggestion.description}</p>
                  {suggestion.projectTitle && (
                    <p className="text-xs opacity-60">For: {suggestion.projectTitle}</p>
                  )}
                </div>
                {suggestion.action && (
                  <button
                    onClick={() => handleAction(suggestion)}
                    className="px-3 py-1.5 bg-white/80 hover:bg-white text-xs font-medium rounded-full transition-colors whitespace-nowrap"
                  >
                    {suggestion.action}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="px-4 pb-4">
        <button
          onClick={loadSuggestions}
          className="text-xs text-slate-500 hover:text-primary-600 flex items-center gap-1"
        >
          <Sparkles className="h-3 w-3" />
          Refresh suggestions
        </button>
      </div>
    </div>
  );
}
