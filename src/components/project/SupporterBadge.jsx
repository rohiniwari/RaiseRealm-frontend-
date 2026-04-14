import { useState, useEffect } from 'react';
import { contributionService } from '../../services/contributionService';
import { Button } from '../ui/button';

const SupporterBadge = ({ contributions = [], projectId, userId }) => {
  const getTier = (totalDonated) => {
    if (totalDonated >= 25000) return 'platinum';
    if (totalDonated >= 5000) return 'gold';
    if (totalDonated >= 1000) return 'silver';
    if (totalDonated >= 1000) return 'bronze';
    return null;
  };

  const tierConfig = {
    bronze: { emoji: '🥉', color: 'bg-amber-100 text-amber-800', label: 'Bronze Supporter' },
    silver: { emoji: '🥈', color: 'bg-slate-100 text-slate-800', label: 'Silver Supporter' },
    gold: { emoji: '🥇', color: 'bg-yellow-100 text-yellow-800', label: 'Gold Supporter' },
    platinum: { emoji: '💎', color: 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800', label: 'Platinum Supporter' }
  };

  // Mock current user contribs
  const userContributions = contributions.filter(c => c.userId === userId);
  const totalDonated = userContributions.reduce((sum, c) => sum + c.amount, 0);
  const tier = getTier(totalDonated);

  if (!tier) return null;

  const config = tierConfig[tier];

  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border transition-all" style={{background: config.color}}>
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </div>
  );

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