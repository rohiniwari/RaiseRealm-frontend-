import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { projectService } from '../services/projectService';
import { contributionService } from '../services/contributionService';
import { commentService } from '../services/commentService';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, calculateDaysLeft, calculateProgress, formatDate } from '../utils/helpers';
import { Heart, Share2, Check, Clock, Users, MessageCircle, Edit2, Trash2 } from 'lucide-react';
import ContributionModal from '../components/payment/ContributionModal';


export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contributing, setContributing] = useState(false);
  const [contributionAmount, setContributionAmount] = useState('');
  const [selectedReward, setSelectedReward] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);


  useEffect(() => {
    loadProject();
    loadComments();
  }, [id]);

  const loadProject = async () => {
    try {
      const data = await projectService.getProjectById(id);
      setProject(data);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const data = await commentService.getProjectComments(id);
      setComments(data);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleContribution = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!contributionAmount || parseFloat(contributionAmount) < 1) {
      alert('Please enter a valid amount');
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    loadProject();
    setContributionAmount('');
    setSelectedReward(null);
    setShowPaymentModal(false);
  };


  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await commentService.createComment({
        project_id: id,
        content: comment
      });
      setComment('');
      loadComments();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDeleteProject = async () => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;
    
    try {
      await projectService.deleteProject(id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const shareProject = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 text-slate-500">
            <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            Loading...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">Project not found</h2>
            <Link to="/projects">
              <Button className="mt-4">Browse Projects</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const progress = calculateProgress(project.current_amount, project.goal_amount);
  const daysLeft = calculateDaysLeft(project.end_date);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-slate-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-12">
          {/* Project Header */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 capitalize">
                  {project.category}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
                  {project.title}
                </h1>
                {user && project.creator_id === user.id && (
                  <div className="flex gap-2">
                    <Link 
                      to={`/project/${id}/edit`}
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      title="Edit project"
                    >
                      <Edit2 className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={handleDeleteProject}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-4 text-slate-600">{project.description}</p>
              
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={project.creator?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${project.creator?.name}`}
                  alt={project.creator?.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">by {project.creator?.name}</p>
                  <p className="text-xs text-slate-500">Project Creator</p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 rounded-2xl overflow-hidden border border-slate-200">
                <img
                  src={project.image_url || 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80'}
                  alt={project.title}
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                />
              </div>
            </div>

            {/* Funding Card */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="text-3xl font-heading font-bold text-slate-900">
                      {formatCurrency(project.current_amount)}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      raised of {formatCurrency(project.goal_amount)} goal
                    </p>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-3 mb-4">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-secondary-400 h-3 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-1 text-slate-500 text-sm">
                        <Users className="h-4 w-4" />
                        <span>Backers</span>
                      </div>
                      <div className="font-bold text-slate-900">{project.backer_count || 0}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-slate-500 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>Days left</span>
                      </div>
                      <div className="font-bold text-slate-900">{daysLeft}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-slate-500 text-sm">
                        <MessageCircle className="h-4 w-4" />
                        <span>Comments</span>
                      </div>
                      <div className="font-bold text-slate-900">{project.comment_count || 0}</div>
                    </div>
                  </div>

                  <form onSubmit={handleContribution} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Back this project</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <Input
                          type="number"
                          min="1"
                          placeholder="Enter amount"
                          value={contributionAmount}
                          onChange={(e) => setContributionAmount(e.target.value)}
                          className="pl-8"
                          required
                        />
                      </div>
                    </div>

                    {project.rewards && project.rewards.length > 0 && (
                      <div className="space-y-2">
                        <Label>Or select a reward tier</Label>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {project.rewards.map(reward => (
                            <div
                              key={reward.id}
                              onClick={() => {
                                setSelectedReward(reward);
                                setContributionAmount(reward.min_amount.toString());
                              }}
                              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                                selectedReward?.id === reward.id
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="font-medium text-slate-900">{reward.title}</div>
                              <div className="text-sm text-slate-500">${reward.min_amount} minimum</div>
                              {reward.max_backers && reward.current_backers >= reward.max_backers && (
                                <div className="text-xs text-red-500 mt-1">Sold out</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button type="submit" className="w-full" disabled={!contributionAmount}>
                      Proceed to Payment
                    </Button>
                  </form>

                  <ContributionModal
                    isOpen={showPaymentModal}
                    onClose={() => setShowPaymentModal(false)}
                    projectId={id}
                    amount={parseFloat(contributionAmount) || 0}
                    rewardId={selectedReward?.id}
                    onSuccess={handlePaymentSuccess}
                  />


                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1" onClick={shareProject}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Milestones */}
          {project.milestones && project.milestones.length > 0 && (
            <div className="mt-12">
              <h2 className="font-heading font-bold text-2xl mb-6">Milestones</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.milestones.map((milestone, index) => (
                  <Card key={milestone.id} className={milestone.is_completed ? 'border-green-300 bg-green-50' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          milestone.is_completed ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {milestone.is_completed ? <Check className="h-4 w-4" /> : <span className="text-sm font-bold">{index + 1}</span>}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900">{milestone.title}</h3>
                          <p className="text-sm text-slate-500 mt-1">{milestone.description}</p>
                          <div className="mt-2 text-xs text-slate-400">
                            Target: {formatDate(milestone.target_date)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="mt-12">
            <h2 className="font-heading font-bold text-2xl mb-6">Comments ({comments.length})</h2>
            
            {user && (
              <form onSubmit={handleComment} className="mb-8">
                <Textarea
                  placeholder="Ask a question or share your thoughts..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
                <Button type="submit" className="mt-2">Post Comment</Button>
              </form>
            )}

            <div className="space-y-4">
              {comments.map(c => (
                <Card key={c.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={c.user?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${c.user?.name}`}
                        alt={c.user?.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900">{c.user?.name}</span>
                          <span className="text-xs text-slate-400">{formatDate(c.created_at)}</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{c.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {comments.length === 0 && (
                <p className="text-slate-500 text-center py-8">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
