import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Steps, Step } from '../components/ui/steps';
import ProjectPreview from '../components/project/ProjectPreview';
import { projectService } from '../services/projectService';
import { categories } from '../utils/helpers';

const roleGuardSchema = z.object({
  role: z.enum(['creator']),
});

const createProjectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 chars'),
  category: z.enum(['technology', 'art', 'film', 'music', 'games']),
  description: z.string().min(10),
  goal_amount: z.number().min(1000, 'Goal min ₹1000'),
  end_date: z.string().refine((date) => new Date(date) > new Date(), 'End date must be future'),
  rewards: z.array(z.object({
    title: z.string(),
    description: z.string(),
    min_amount: z.number()
  })).min(1),
  milestones: z.array(z.object({
    title: z.string(),
    description: z.string(),
    amount_required: z.number(),
    target_date: z.string()
  })).optional()
});

export default function CreateProject() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'creator') {
      navigate('/dashboard');
      return;
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user) return <div>Loading...</div>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    getValues
  } = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: '',
      category: 'technology',
      description: '',
      goal_amount: 10000,
      end_date: '',
      rewards: [{ title: '', description: '', min_amount: 1000 }],
      milestones: []
    }
  });

  const [step, setStep] = useState(0);

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
    media: [], // For drag-drop files
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

  const addReward = () => setFormData((prev) => ({
    ...prev,
    rewards: [...prev.rewards, { title: '', description: '', min_amount: '' }]
  }));

  const removeReward = (index) => setFormData((prev) => ({
    ...prev,
    rewards: prev.rewards.filter((_, i) => i !== index)
  }));

  const addMilestone = () => setFormData((prev) => ({
    ...prev,
    milestones: [...prev.milestones, { title: '', description: '', amount_required: '', target_date: '' }]
  }));

  const removeMilestone = (index) => setFormData((prev) => ({
    ...prev,
    milestones: prev.milestones.filter((_, i) => i !== index)
  }));

  const handleNext = () => {
    // Basic validation
    if (step === 0 && !formData.title) return setError('Title required');
    setStep(step + 1);
    setError('');
  };

  const handlePrev = () => setStep(Math.max(0, step - 1));

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const projectData = {
        ...formData,
        goal_amount: parseFloat(formData.goal_amount) || 0,
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
      setSuccess('Created!');
      setTimeout(() => navigate(`/project/${project.id}`), 1500);
    } catch (err) {
      setError(err.message || 'Failed to create');
    } finally {
      setLoading(false);
    }
  };

  const stepsContent = [
    // Step 0: Basics
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Project Title *</Label>
          <Input
            name="title"
            placeholder="Enter project title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Description *</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Your project story"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Funding Goal (₹)</Label>
          <Input name="goal_amount" type="number" value={formData.goal_amount} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label>Deadline</Label>
          <Input name="end_date" type="date" value={formData.end_date} onChange={handleChange} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Cover Image URL (optional)</Label>
        <Input name="image_url" type="url" value={formData.image_url} onChange={handleChange} />
      </div>
    </div>,

    // Step 1: Media (stub for drag-drop)
    <div>
      <h3>Media Upload (Drag-drop coming)</h3>
      <p>Upload images/videos here (URL fallback).</p>
      <Input name="image_url" type="url" value={formData.image_url} onChange={handleChange} />
    </div>,


    // Step 2: Rewards
    <div className="space-y-4">
      <h3>Rewards</h3>
      {formData.rewards.map((r, i) => (
        <div key={i} className="p-4 border rounded space-y-2">
          <Input placeholder="Title" value={r.title} onChange={e => handleRewardChange(i, 'title', e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <Input type="number" placeholder="Min Amount" value={r.min_amount} onChange={e => handleRewardChange(i, 'min_amount', e.target.value)} />
            <Input type="number" placeholder="Max Backers (opt)" value={r.max_backers || ''} onChange={e => handleRewardChange(i, 'max_backers', e.target.value || null)} />
          </div>
          <Textarea placeholder="Description" value={r.description} onChange={e => handleRewardChange(i, 'description', e.target.value)} />
          <div className="flex gap-2">
            <Input type="date" placeholder="Est Delivery" value={r.delivery_date || ''} onChange={e => handleRewardChange(i, 'delivery_date', e.target.value)} />
            <Button type="button" variant="outline" onClick={() => removeReward(i)}>Remove</Button>
          </div>
        </div>
      ))}
      <Button type="button" onClick={addReward}>+ Add Reward Tier</Button>
    </div>,


    // Step 3: Milestones
    <div className="space-y-4">
      <h3>Milestones</h3>
      {formData.milestones.map((m, i) => (
        <div key={i} className="p-4 border rounded">
          <Input placeholder="Title" value={m.title} onChange={e => handleMilestoneChange(i, 'title', e.target.value)} />
          <Input type="number" placeholder="Amount" value={m.amount_required} onChange={e => handleMilestoneChange(i, 'amount_required', e.target.value)} />
          <Input type="date" value={m.target_date || ''} onChange={e => handleMilestoneChange(i, 'target_date', e.target.value)} />
          <Textarea placeholder="Description" value={m.description} onChange={e => handleMilestoneChange(i, 'description', e.target.value)} />
          <Button type="button" variant="outline" onClick={() => removeMilestone(i)}>Remove</Button>
        </div>
      ))}
      <Button type="button" onClick={addMilestone}>Add Milestone</Button>
    </div>,

    // Step 4: Preview
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div>
        <h3>Review & Preview</h3>
        <Button onClick={handleSubmit} disabled={loading} className="w-full mb-4">
          {loading ? 'Creating...' : 'Launch Project'}
        </Button>
        <Button type="button" variant="outline" onClick={handlePrev} className="w-full">
          Back to Edit
        </Button>
      </div>
      <ProjectPreview formData={formData} />
    </div>
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-12 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
              Create Project Wizard
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Step-by-step guide to launch your campaign</p>
          </div>

          <div className="bg-white/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 max-w-5xl mx-auto">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm">
                {success}
              </div>
            )}

            <Steps value={step} onValueChange={setStep} className="max-w-4xl mx-auto">
              {stepsContent.map((content, index) => (
                <Step key={index}>
                  {content}
                </Step>
              ))}
            </Steps>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
