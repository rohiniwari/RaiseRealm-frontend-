import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { projectService } from '../services/projectService';
import { categories } from '../utils/helpers';
import { Plus, Trash2, Upload } from 'lucide-react';

export default function CreateProject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'technology',
    goal_amount: '',
    image_url: '',
    end_date: '',
    rewards: [{ title: '', description: '', min_amount: '' }],
    milestones: [{ title: '', description: '', amount_required: '', target_date: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Auto-suggest image when user types a title and no custom image provided
      if (name === 'title' && !prev.image_url && value && value.length > 2) {
        const keyword = value.split(' ').slice(0,4).join(',');
        updated.image_url = `https://source.unsplash.com/1200x800/?${encodeURIComponent(keyword)}`;
      }
      return updated;
    });
  };

  const handleRewardChange = (index, field, value) => {
    const newRewards = [...formData.rewards];
    newRewards[index][field] = value;
    setFormData(prev => ({ ...prev, rewards: newRewards }));
  };

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index][field] = value;
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
    setLoading(true);

    try {
      const projectData = {
        ...formData,
        goal_amount: parseFloat(formData.goal_amount),
        rewards: formData.rewards.filter(r => r.title && r.min_amount).map(r => ({
          ...r,
          min_amount: parseFloat(r.min_amount)
        })),
        milestones: formData.milestones.filter(m => m.title && m.amount_required).map(m => ({
          ...m,
          amount_required: parseFloat(m.amount_required)
        }))
      };

      const project = await projectService.createProject(projectData);
      navigate(`/project/${project.id}`);
    } catch (err) {
      setError(err.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const suggestImage = () => {
    const keyword = (formData.title || formData.description || formData.category || 'project').split(' ').slice(0,4).join(',');
    const url = `https://source.unsplash.com/1200x800/?${encodeURIComponent(keyword)}`;
    setFormData(prev => ({ ...prev, image_url: url }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="font-heading font-extrabold text-3xl">Start a New Project</h1>
            <p className="mt-2 text-slate-600">Share your idea with the world</p>
          </div>

          {error && (
            <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>Basic information about your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Your amazing project name"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Tell your story..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goal_amount">Funding Goal ($)</Label>
                    <Input
                      id="goal_amount"
                      name="goal_amount"
                      type="number"
                      min="1"
                      placeholder="10000"
                      value={formData.goal_amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image_url">Project Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="image_url"
                        name="image_url"
                        type="url"
                        placeholder="https://..."
                        value={formData.image_url}
                        onChange={handleChange}
                      />
                      <Button type="button" variant="ghost" onClick={suggestImage} title="Suggest image based on title">
                        Suggest
                      </Button>
                    </div>
                    {formData.image_url && (
                      <div className="mt-2">
                        <img src={formData.image_url} alt="suggested" className="w-full h-32 object-cover rounded-md" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      name="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Reward Tiers</CardTitle>
                  <CardDescription>Incentives for your backers</CardDescription>
                </div>
                <Button type="button" variant="outline" onClick={addReward}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reward
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.rewards.map((reward, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-medium">Reward {index + 1}</span>
                      {formData.rewards.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeReward(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-3 space-y-2">
                        <Label>Title</Label>
                        <Input
                          placeholder="Reward title"
                          value={reward.title}
                          onChange={(e) => handleRewardChange(index, 'title', e.target.value)}
                        />
                      </div>
                      <div className="sm:col-span-3 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="What backers will receive..."
                          value={reward.description}
                          onChange={(e) => handleRewardChange(index, 'description', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Minimum Amount ($)</Label>
                        <Input
                          type="number"
                          min="1"
                          placeholder="25"
                          value={reward.min_amount}
                          onChange={(e) => handleRewardChange(index, 'min_amount', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Milestones</CardTitle>
                  <CardDescription>Track your progress and release funds</CardDescription>
                </div>
                <Button type="button" variant="outline" onClick={addMilestone}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Milestone
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.milestones.map((milestone, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-medium">Milestone {index + 1}</span>
                      {formData.milestones.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMilestone(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2 space-y-2">
                        <Label>Title</Label>
                        <Input
                          placeholder="Milestone title"
                          value={milestone.title}
                          onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="What needs to be achieved..."
                          value={milestone.description}
                          onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Required Amount ($)</Label>
                        <Input
                          type="number"
                          min="1"
                          placeholder="5000"
                          value={milestone.amount_required}
                          onChange={(e) => handleMilestoneChange(index, 'amount_required', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Target Date</Label>
                        <Input
                          type="date"
                          value={milestone.target_date}
                          onChange={(e) => handleMilestoneChange(index, 'target_date', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? 'Creating...' : 'Create Project'}
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
