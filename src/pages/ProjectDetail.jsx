import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { projectService } from '../services/projectService';
import { contributionService } from '../services/contributionService';
import { commentService } from '../services/commentService';
import { formatCurrency, calculateDaysLeft, calculateProgress, formatDate } from '../utils/helpers';
import SocialShare from '../components/project/SocialShare';
import CampaignUpdates from '../components/project/CampaignUpdates';
import SupporterBadge from '../components/project/SupporterBadge';
import Skeleton from '../components/ui/Skeleton';
import ContributionModal from '../components/payment/ContributionModal';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [commentValue, setCommentValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showContributionModal, setShowContributionModal] = useState(false);

  useEffect(() => {
    loadProject();
    loadComments();
    loadContributions();
  }, [id]);

  const loadProject = async () => {
    try {
      const data = await projectService.getProjectById(id);
      setProject(data);
    } catch (err) {
      console.error('Unable to load project:', err);
      setError('Unable to load project details.');
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const data = await commentService.getProjectComments(id);
      setComments(data);
    } catch (err) {
      console.error('Unable to load comments:', err);
    }
  };

  const loadContributions = async () => {
    try {
      const data = await contributionService.getProjectContributions(id);
      setContributions(data);
    } catch (err) {
      console.error('Unable to load contributions:', err);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!commentValue.trim()) return;

    try {
      await commentService.createComment({ project_id: id, content: commentValue });
      setCommentValue('');
      loadComments();
    } catch (err) {
      console.error('Unable to post comment:', err);
      setError('Unable to post comment at this time.');
    }
  };

  const handleContribution = async (amount) => {
    try {
      await contributionService.createContribution({ project_id: id, amount });
      loadProject();
      loadContributions();
      setShowContributionModal(false);
    } catch (err) {
      console.error('Contribution failed:', err);
      setError('Contribution failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-1/3 mb-6" />
          <Skeleton className="h-96 w-full mb-6" />
          <div className="grid gap-6 lg:grid-cols-3">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Project not found</h1>
            <p className="mt-2 text-slate-600">The project you are looking for does not exist or has been removed.</p>
            <Button className="mt-6" onClick={() => navigate('/projects')}>
              Back to Projects
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const progressValue = calculateProgress(project.current_amount || project.raised || 0, project.goal_amount || project.goal);
  const daysLeft = calculateDaysLeft(project.end_date || project.deadline);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <Card className="p-6">
            <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
              <div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">{project.title}</h1>
                    <p className="mt-2 text-sm text-slate-500">by {project.creator?.name || 'Anonymous'}</p>
                  </div>
                  <SocialShare project={project} />
                </div>

                <p className="mt-6 text-slate-700">{project.description}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4">
                    <p className="text-sm uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Raised</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{formatCurrency(project.current_amount || project.raised || 0)}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4">
                    <p className="text-sm uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Goal</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{formatCurrency(project.goal_amount || project.goal)}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4">
                    <p className="text-sm uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Time left</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{daysLeft} days</p>
                  </div>
                </div>

                <div className="mt-6 rounded-full bg-slate-200 h-3 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all" style={{ width: `${progressValue}%` }} />
                </div>
                <p className="mt-3 text-sm text-slate-500">{progressValue}% funded</p>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-700 p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Support this project</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{formatCurrency(project.minimum_contribution || 0)} minimum</p>
                    </div>
                  </div>
                  <Button className="mt-6 w-full" onClick={() => setShowContributionModal(true)}>
                    Contribute Now
                  </Button>
                </div>

                <SupporterBadge contributions={contributions} />
              </div>
            </div>
          </Card>

          <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Comments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleCommentSubmit} className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="comment">Leave a comment</Label>
                      <Textarea
                        id="comment"
                        value={commentValue}
                        onChange={(e) => setCommentValue(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <Button type="submit">Post Comment</Button>
                  </form>

                  <div className="space-y-4">
                    {comments.length === 0 ? (
                      <p className="text-sm text-slate-500 dark:text-slate-400">No comments yet. Be the first to share your thoughts.</p>
                    ) : (
                      comments.map((comment) => (
                        <div key={comment.id} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{comment.user?.name || 'Anonymous'}</p>
                          <p className="mt-2 text-slate-700 dark:text-slate-300">{comment.content}</p>
                          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{formatDate(comment.createdAt || comment.created_at)}</p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <CampaignUpdates projectId={id} />
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>About this project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  <p><strong>Category:</strong> {project.category}</p>
                  <p><strong>Created:</strong> {formatDate(project.created_at || project.createdAt)}</p>
                  <p><strong>Status:</strong> {project.is_active ? 'Active' : 'Completed'}</p>
                  <p><strong>Deadline:</strong> {formatDate(project.end_date || project.deadline)}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {showContributionModal && (
            <ContributionModal
              project={project}
              onClose={() => setShowContributionModal(false)}
              onContribute={handleContribution}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
