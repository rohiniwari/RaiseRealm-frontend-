import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Skeleton from '../ui/Skeleton';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuccessStories();
  }, []);

  const fetchSuccessStories = async () => {
    try {
      // Mock success stories - replace with actual API call
      const mockStories = [
        {
          id: 1,
          title: "Community Garden Project",
          description: "Raised $15,000 to create a sustainable community garden that now feeds 200 families weekly.",
          raised: 15000,
          goal: 12000,
          image: "/api/placeholder/400/300",
          category: "Community"
        },
        {
          id: 2,
          title: "Indie Game Development",
          description: "A small team raised $50,000 to develop their dream game, now with 100k+ downloads.",
          raised: 50000,
          goal: 30000,
          image: "/api/placeholder/400/300",
          category: "Gaming"
        },
        {
          id: 3,
          title: "Educational App for Kids",
          description: "Parents and teachers came together to fund an educational app that's now used in 50 schools.",
          raised: 25000,
          goal: 20000,
          image: "/api/placeholder/400/300",
          category: "Education"
        }
      ];

      setStories(mockStories);
    } catch (error) {
      console.error('Failed to fetch success stories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Success Stories
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          See how RaiseRealm has helped creators and communities bring their ideas to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
              {story.image && (
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                Success!
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {story.category}
                </span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {Math.round((story.raised / story.goal) * 100)}% funded
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {story.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {story.description}
              </p>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Raised ${story.raised.toLocaleString()} of ${story.goal.toLocaleString()}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;