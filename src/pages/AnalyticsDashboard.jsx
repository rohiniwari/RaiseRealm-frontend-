import { useState, useEffect } from 'react';
import { projectService } from '../services/projectService';
import { impactService } from '../services/impactService';
import Card from '../components/ui/card';
import Skeleton from '../components/ui/Skeleton';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [projects, impact] = await Promise.all([
        projectService.getAllProjects(),
        impactService.getImpactData()
      ]);

      // Calculate analytics
      const totalProjects = projects.length;
      const activeProjects = projects.filter(p => new Date(p.deadline) > new Date()).length;
      const totalRaised = projects.reduce((sum, p) => sum + p.raised, 0);
      const averageGoal = projects.reduce((sum, p) => sum + p.goal, 0) / totalProjects || 0;

      setAnalytics({
        totalProjects,
        activeProjects,
        totalRaised,
        averageGoal,
        impact
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Projects
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {analytics.totalProjects}
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Active Projects
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {analytics.activeProjects}
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Raised
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            ${analytics.totalRaised.toLocaleString()}
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Average Goal
          </h3>
          <p className="text-3xl font-bold text-orange-600">
            ${analytics.averageGoal.toLocaleString()}
          </p>
        </Card>
      </div>

      {analytics.impact && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Impact Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {analytics.impact.projectsFunded}
              </p>
              <p className="text-gray-600 dark:text-gray-300">Projects Funded</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {analytics.impact.totalContributors}
              </p>
              <p className="text-gray-600 dark:text-gray-300">Contributors</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {analytics.impact.averageContribution}
              </p>
              <p className="text-gray-600 dark:text-gray-300">Avg Contribution</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsDashboard;