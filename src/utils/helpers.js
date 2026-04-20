// Import utilities - using ES module imports
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
}

export function calculateDaysLeft(endDate) {
  const now = new Date();
  const end = new Date(endDate);
  const diffInMs = end - now;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays > 0 ? diffInDays : 0;
}

export function calculateProgress(current, goal) {
  if (goal <= 0) return 0;
  const progress = (current / goal) * 100;
  return Math.min(progress, 100).toFixed(0);
}

export function calculateMilestoneProgress(currentRaised, milestoneAmount) {
  if (milestoneAmount <= 0) return 0;
  const progress = (currentRaised / milestoneAmount) * 100;
  return Math.min(progress, 100).toFixed(0);
}


export const categories = [
  { value: 'technology', label: 'Technology' },
  { value: 'art', label: 'Art' },
  { value: 'film', label: 'Film' },
  { value: 'music', label: 'Music' },
  { value: 'games', label: 'Games' },
  { value: 'design', label: 'Design' },
  { value: 'food', label: 'Food' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'photography', label: 'Photography' },
  { value: 'publishing', label: 'Publishing' },
  { value: 'community', label: 'Community' },
];
