import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { projectService } from '../services/projectService';
import { useAuth } from '../context/AuthContext';
import { categories } from '../utils/helpers';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'technology',
    goal_amount: '',
    image_url: '',
    end_date: '',
    rewards: [],
    milestones: []
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadProject();
  }, [id, user]);

  const loadProject = async () => {
    try {
      const project = await projectService.getProjectById(id);
      
      // Check if user is the project owner
      if (project.creator_id !== user.id) {
        alert('You can only edit your own projects');
        navigate(`/project/${id}`);
        return;
      }

      setFormData({
        title: project.title || '',
        description: project.description || '',
        category: project.category || 'technology',
        goal_amount: project.goal_amount || '',
        image_url: project.image_url || '',
        end_date: project.end_date ? project.end_date.split('T')[0] : '',
        rewards: project.rewards || [],
        milestones: project.milestones || []
      });
    } catch (err) {
      setError('Failed to load project');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRewardChange = (index, field, value) => {
    const newRewards = [...formData.rewards];
    newRewards[index] = { ...newRewards[index], [field]: value };
    setFormData(prev => ({ ...prev, rewards: newRewards }));
  };

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index] = { ...newMilestones[index], [field]: value };
    setFormData(prev => ({ ...prev, milestones: newMilestones }));
  };

  const addReward = () => {
    setFormData(prev => ({
      ...prev,
      rewards: [...prev.rewards, { title: '', description: '', min_amount: '' }]
    }));
  };

  const removeReward = (index) => {
    setFormData(prev => ({
      ...prev,
      rewards: prev.rewards.filter((_, i) => i !== index)
    }));
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { title: '', description: '', amount_required: '', target_date: '' }]
    }));
  };

  const removeMilestone = (index) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const projectData = {
        ...formData,
        goal_amount: parseFloat(formData.goal_amount),
        rewards: formData.rewards.map(r => ({
          ...r,
          min_amount: parseFloat(r.min_amount) || 0
        })),
        milestones: formData.milestones.map(m => ({
          ...m,
          amount_required: parseFloat(m.amount_required) || 0
        }))
      };

      await projectService.updateProject(id, projectData);
      navigate(`/project/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update project');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            Loading project...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to={`/project/${id}`}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to project
            </Link>
            <h1 className="text-4xl font-bold text-slate-900">Edit Project</h1>
            <p className="mt-2 text-slate-600">Update your project details and milestones</p>
          </div>

          {error && (
            <Card className="border-red-200 bg-red-50 mb-6">
              <CardContent className="p-4">
                <p className="text-red-600">{error}</p>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your project's basic details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter project title"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your project in detail"
                    required
                    rows={6}
                    className="mt-2"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="goal_amount">Funding Goal (₹) *</Label>
                    <Input
                      id="goal_amount"
                      name="goal_amount"
                      type="number"
                      min="1000"
                      step="1000"
                      value={formData.goal_amount}
                      onChange={handleChange}
                      placeholder="Enter funding goal"
                      required
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      name="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="end_date">End Date *</Label>
                    <Input
                      id="end_date"
                      name="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rewards */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Rewards</CardTitle>
                    <CardDescription>Create reward tiers for backers</CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addReward}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Reward
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {formData.rewards.map((reward, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-slate-900">Reward {index + 1}</h4>
                        {formData.rewards.length > 0 && (
                          <button
                            type="button"
                            onClick={() => removeReward(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      <div>
                        <Label>Reward Title</Label>
                        <Input
                          value={reward.title || ''}
                          onChange={(e) => handleRewardChange(index, 'title', e.target.value)}
                          placeholder="e.g., Digital Download"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={reward.description || ''}
                          onChange={(e) => handleRewardChange(index, 'description', e.target.value)}
                          placeholder="What's included in this reward?"
                          rows={3}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label>Minimum Amount (₹)</Label>
                        <Input
                          type="number"
                          min="1"
                          step="1"
                          value={reward.min_amount || ''}
                          onChange={(e) => handleRewardChange(index, 'min_amount', e.target.value)}
                          placeholder="1000"
                          className="mt-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Milestones</CardTitle>
                    <CardDescription>Define project milestones and goals</CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMilestone}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Milestone
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {formData.milestones.map((milestone, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-slate-900">Milestone {index + 1}</h4>
                        {formData.milestones.length > 0 && (
                          <button
                            type="button"
                            onClick={() => removeMilestone(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      <div>
                        <Label>Milestone Title</Label>
                        <Input
                          value={milestone.title || ''}
                          onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                          placeholder="e.g., Beta Release"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={milestone.description || ''}
                          onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                          placeholder="What will be delivered at this milestone?"
                          rows={3}
                          className="mt-2"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label>Amount Required (₹)</Label>
                          <Input
                            type="number"
                            min="1"
                            step="1"
                            value={milestone.amount_required || ''}
                            onChange={(e) => handleMilestoneChange(index, 'amount_required', e.target.value)}
                            placeholder="5000"
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label>Target Date</Label>
                          <Input
                            type="date"
                            value={milestone.target_date ? milestone.target_date.split('T')[0] : ''}
                            onChange={(e) => handleMilestoneChange(index, 'target_date', e.target.value)}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/project/${id}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Updating...' : 'Update Project'}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
