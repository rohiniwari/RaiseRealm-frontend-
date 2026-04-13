import { useState, useEffect } from 'react';
import { contributionService } from '../../services/contributionService';
import Button from '../ui/button';

const SupporterBadge = ({ contributions }) => {
  const [isSupporter, setIsSupporter] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    // Check if current user has contributed
    // This is a mock check - replace with actual user context
    const userId = localStorage.getItem('userId');
    if (userId && contributions.some(c => c.userId === userId)) {
      setIsSupporter(true);
    }
  }, [contributions]);

  if (!isSupporter) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowBadge(!showBadge)}
        className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
        aria-label="Supporter badge"
      >
        <span>⭐</span>
        <span>Supporter</span>
      </button>

      {showBadge && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            🎉 You're a Supporter!
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Thank you for supporting this project. Your contribution helps make dreams come true!
          </p>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Badge earned: {new Date().toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupporterBadge;