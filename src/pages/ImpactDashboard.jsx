import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { impactService } from '../services/impactService';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Plus, 
  Edit2, 
  Trash2, 
  Award
} from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function ImpactDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    metrics: {},
    media_urls: []
  });
  const [metricKey, setMetricKey] = useState('');
  const [metricValue, setMetricValue] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadImpactStats();
  }, [user, navigate]);

  const loadImpactStats = async () => {
    try {
      const data = await impactService.getCreatorImpactStats();
      setStats(data);
      if (data.projects?.length > 0 && !selectedProject) {
        setSelectedProject(data.projects[0]);
      }
    } catch (error) {
      console.error('Error loading impact stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMetric = () => {
    if (metricKey && metricValue) {
      setFormData(prev => ({
        ...prev,
        metrics: {
          ...prev.metrics,
          [metricKey]: parseFloat(metricValue) || metricValue
        }
      }));
      setMetricKey('');
      setMetricValue('');
    }
  };

  const handleRemoveMetric = (key) => {
    setFormData(prev => {
      const newMetrics = { ...prev.metrics };
      delete newMetrics[key];
      return { ...prev, metrics: newMetrics };
    });
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;

    try {
      const data = {
        project_id: selectedProject.id,
        ...formData
      };

      if (editingReport) {
        await impactService.updateImpactReport(editingReport.id, data);
      } else {
        await impactService.createImpactReport(data);
      }

      setShowReportForm(false);
      setEditingReport(null);
      setFormData({ title: '', description: '', metrics: {}, media_urls: [] });
      loadImpactStats();
    } catch (error) {
      console.error('Error saving report:', error);
      alert('Failed to save impact report');
    }
  };

  const handleEditReport = (report) => {
    setEditingReport(report);
    setFormData({
      title: report.title,
      description: report.description,
      metrics: report.metrics || {},
      media_urls: report.media_urls || []
    });
    setShowReportForm(true);
  };

  const handleDeleteReport = async (reportId) => {
    if (!confirm('Are you sure you want to delete this report?')) return;
    
    try {
      await impactService.deleteImpactReport(reportId);
      loadImpactStats();
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Failed to delete report');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Impact Dashboard</h1>
            <p className="text-slate-600 mt-2">Track and report the impact of your funded projects</p>
          </div>

          {stats && (
            <>
              {/* Overview Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Total Projects</p>
                        <p className="text-2xl font-bold text-slate-900">{stats.overview.totalProjects}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Award className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Funded Projects</p>
                        <p className="text-2xl font-bold text-slate-900">{stats.overview.fundedProjects}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <DollarSign className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Total Raised</p>
                        <p className="text-2xl font-bold text-slate-900">
                          {formatCurrency(stats.overview.totalRaised)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <FileText className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Impact Reports</p>
                        <p className="text-2xl font-bold text-slate-900">{stats.overview.totalReports}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Aggregated Metrics */}
              {Object.keys(stats.aggregatedMetrics || {}).length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Total Impact Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {Object.entries(stats.aggregatedMetrics).map(([key, value]) => (
                        <div key={key} className="p-4 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-500 capitalize">{key.replace(/_/g, ' ')}</p>
                          <p className="text-xl font-bold text-slate-900">
                            {typeof value === 'number' ? value.toLocaleString() : value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Project Selection */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Select Project to View/Add Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stats.projects?.map(project => (
                      <div
                        key={project.id}
                        onClick={() => {
                          setSelectedProject(project);
                          setShowReportForm(false);
                          setEditingReport(null);
                        }}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedProject?.id === project.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <h3 className="font-semibold text-slate-900">{project.title}</h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {formatCurrency(project.current_amount)} raised of {formatCurrency(project.goal_amount)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            project.status === 'funded' || project.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {project.status}
                          </span>
                          <span className="text-xs text-slate-500">
                            {project.reports?.length || 0} reports
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Selected Project Reports */}
              {selectedProject && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Impact Reports: {selectedProject.title}</CardTitle>
                    {(selectedProject.status === 'funded' || selectedProject.status === 'completed') && (
                      <Button 
                        onClick={() => {
                          setShowReportForm(true);
                          setEditingReport(null);
                          setFormData({ title: '', description: '', metrics: {}, media_urls: [] });
                        }}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Report
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    {showReportForm ? (
                      <form onSubmit={handleSubmitReport} className="space-y-4">
                        <div>
                          <Label>Report Title</Label>
                          <Input
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="e.g., Q1 2024 Impact Update"
                            required
                          />
                        </div>

                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Describe the impact and progress of your project..."
                            rows={4}
                            required
                          />
                        </div>

                        <div>
                          <Label>Impact Metrics</Label>
                          <div className="flex gap-2 mb-2">
                            <Input
                              placeholder="Metric name (e.g., people_helped)"
                              value={metricKey}
                              onChange={(e) => setMetricKey(e.target.value)}
                              className="flex-1"
                            />
                            <Input
                              type="number"
                              placeholder="Value"
                              value={metricValue}
                              onChange={(e) => setMetricValue(e.target.value)}
                              className="w-32"
                            />
                            <Button type="button" onClick={handleAddMetric} variant="outline">
                              Add
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(formData.metrics).map(([key, value]) => (
                              <span 
                                key={key} 
                                className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full text-sm"
                              >
                                {key}: {value}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveMetric(key)}
                                  className="text-slate-400 hover:text-red-500"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button type="submit" className="flex-1">
                            {editingReport ? 'Update Report' : 'Create Report'}
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setShowReportForm(false);
                              setEditingReport(null);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        {selectedProject.reports?.length === 0 ? (
                          <div className="text-center py-8 text-slate-500">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No impact reports yet for this project.</p>
                            {(selectedProject.status === 'funded' || selectedProject.status === 'completed') && (
                              <Button 
                                onClick={() => setShowReportForm(true)}
                                variant="outline" 
                                className="mt-4"
                              >
                                Create your first report
                              </Button>
                            )}
                          </div>
                        ) : (
                          selectedProject.reports.map(report => (
                            <div key={report.id} className="p-4 border border-slate-200 rounded-lg">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-slate-900">{report.title}</h4>
                                  <p className="text-sm text-slate-500">{formatDate(report.created_at)}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditReport(report)}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteReport(report.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-slate-600 mt-2">{report.description}</p>
                              {report.metrics && Object.keys(report.metrics).length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {Object.entries(report.metrics).map(([key, value]) => (
                                    <span 
                                      key={key} 
                                      className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-sm"
                                    >
                                      {key.replace(/_/g, ' ')}: {value}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
