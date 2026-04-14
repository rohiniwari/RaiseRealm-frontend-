import { useState, useEffect } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { projectService } from '../../services/projectService';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { RichCommentEditor } from '../ui/RichCommentEditor';

const CampaignUpdates = ({ projectId }) => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newUpdate, setNewUpdate] = useState('');

  useEffect(() => {
    fetchUpdates();
  }, [projectId]);

  const fetchUpdates = async () => {
    try {
      // Mock updates - replace with actual API call
      const mockUpdates = [
        {
          id: 1,
          content: "Great progress on our prototype! We've completed the initial design phase.",
          createdAt: new Date(Date.now() - 86400000),
          author: "Project Creator"
        },
        {
          id: 2,
          content: "Thanks to all our supporters! We've reached 75% of our funding goal.",
          createdAt: new Date(Date.now() - 172800000),
          author: "Project Creator"
        }
      ];
      setUpdates(mockUpdates);
    } catch (error) {
      console.error('Failed to fetch updates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!newUpdate.trim()) return;

    try {
      // Mock API call - replace with actual service
      const update = {
        id: Date.now(),
        content: newUpdate,
        createdAt: new Date(),
        author: "Project Creator"
      };

      setUpdates(prev => [update, ...prev]);
      setNewUpdate('');
      setShowForm(false);

      // Notify supporters
      const { addNotification } = useNotifications();
      addNotification('New campaign update posted!', 'success', `/project/${projectId}`);
    } catch (error) {
      console.error('Failed to post update:', error);
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Campaign Updates
        </h2>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Campaign Updates
        </h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Post Update'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmitUpdate} className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <RichCommentEditor
            value={newUpdate}
            onChange={setNewUpdate}
            onSubmit={handleSubmitUpdate}
            placeholder="Share an update with your supporters, milestones achieved, or progress reports..."
          />
          <div className="flex justify-end space-x-2 mt-3">
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Post Update
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {updates.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-center py-8">
            No updates yet. Check back soon!
          </p>
        ) : (
          updates.map((update) => (
            <div key={update.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {update.author}
                </span>
                <span className="text-sm text-gray-500">
                  {update.createdAt.toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {update.content}
              </p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default CampaignUpdates;