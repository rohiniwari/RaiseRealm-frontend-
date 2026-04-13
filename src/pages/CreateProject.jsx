import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { projectService } from '../services/projectService';
import { categories } from '../utils/helpers';

export default function CreateProject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRewardChange = (index, field, value) => {
    const updated = [...formData.rewards];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, rewards: updated }));
  };

  const handleMilestoneChange = (index, field, value) => {
    const updated = [...formData.milestones];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, milestones: updated }));
  };

  const addReward = () => {
    setFormData((prev) => ({
      ...prev,
      rewards: [...prev.rewards, { title: '', description: '', min_amount: '' }]
    }));
  };

  const removeReward = (index) => {
    setFormData((prev) => ({
      ...prev,
      rewards: prev.rewards.filter((_, i) => i !== index)
    }));
  };

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { title: '', description: '', amount_required: '', target_date: '' }]
    }));
  };

  const removeMilestone = (index) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const projectData = {
        ...formData,
        goal_amount: parseFloat(formData.goal_amount) || 0,
        rewards: formData.rewards
          .filter((reward) => reward.title && reward.min_amount)
          .map((reward) => ({
            ...reward,
            min_amount: parseFloat(reward.min_amount)
          })),
        milestones: formData.milestones
          .filter((milestone) => milestone.title && milestone.amount_required)
          .map((milestone) => ({
            ...milestone,
            amount_required: parseFloat(milestone.amount_required)
          }))
      };

      const project = await projectService.createProject(projectData);
      setSuccess('Project created successfully! Redirecting...');
      setTimeout(() => navigate(`/project/${project.id}`), 800);
    } catch (err) {
      setError(err?.message || 'Failed to create project. Please try again.');
      console.error('Create project error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="border border-slate-200/80 bg-white shadow-sm rounded-3xl">
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900">Create a New Project</h1>
                <p className="mt-2 text-slate-500">Launch your campaign and connect with backers.</p>
              </div>

              {error && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <Card className="border border-slate-200">
                  <CardHeader>
                    <CardTitle>Project Basics</CardTitle>
                    <CardDescription>Tell your backers what makes your project special.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Enter your project title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
                          required
                        >
                          {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Share your story and explain your mission"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        required
                      />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="goal_amount">Funding Goal</Label>
                        <Input
                          id="goal_amount"
                          name="goal_amount"
                          type="number"
                          placeholder="10000"
                          value={formData.goal_amount}
                          onChange={handleChange}
                          min="1"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end_date">Deadline</Label>
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

                    <div className="space-y-2">
                      <Label htmlFor="image_url">Cover Image URL</Label>
                      <Input
                        id="image_url"
                        name="image_url"
                        type="url"
                        placeholder="https://example.com/cover.jpg"
                        value={formData.image_url}
                        onChange={handleChange}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-slate-200">
                  <CardHeader>
                    <CardTitle>Rewards</CardTitle>
                    <CardDescription>Offer backers incentives for their support.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.rewards.map((reward, index) => (
                      <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor={`reward-title-${index}`}>Reward Title</Label>
                            <Input
                              id={`reward-title-${index}`}
                              value={reward.title}
                              onChange={(e) => handleRewardChange(index, 'title', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`reward-min-${index}`}>Minimum Amount</Label>
                            <Input
                              id={`reward-min-${index}`}
                              type="number"
                              value={reward.min_amount}
                              onChange={(e) => handleRewardChange(index, 'min_amount', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <Label htmlFor={`reward-desc-${index}`}>Description</Label>
                          <Textarea
                            id={`reward-desc-${index}`}
                            value={reward.description}
                            onChange={(e) => handleRewardChange(index, 'description', e.target.value)}
                            rows={3}
                          />
                        </div>
                        <Button type="button" variant="outline" onClick={() => removeReward(index)}>
                          Remove reward
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="secondary" onClick={addReward}>
                      Add reward tier
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-slate-200">
                  <CardHeader>
                    <CardTitle>Milestones</CardTitle>
                    <CardDescription>Show backers how you plan to deliver results.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.milestones.map((milestone, index) => (
                      <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor={`milestone-title-${index}`}>Milestone Title</Label>
                            <Input
                              id={`milestone-title-${index}`}
                              value={milestone.title}
                              onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`milestone-amount-${index}`}>Amount Required</Label>
                            <Input
                              id={`milestone-amount-${index}`}
                              type="number"
                              value={milestone.amount_required}
                              onChange={(e) => handleMilestoneChange(index, 'amount_required', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <Label htmlFor={`milestone-date-${index}`}>Target Date</Label>
                          <Input
                            id={`milestone-date-${index}`}
                            type="date"
                            value={milestone.target_date}
                            onChange={(e) => handleMilestoneChange(index, 'target_date')}
                          />
                        </div>
                        <Textarea
                          value={milestone.description}
                          onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                          rows={3}
                          placeholder="Milestone details"
                        />
                        <Button type="button" variant="outline" onClick={() => removeMilestone(index)}>
                          Remove milestone
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="secondary" onClick={addMilestone}>
                      Add milestone
                    </Button>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Launch project'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
