import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { formatCurrency, calculateDaysLeft, calculateProgress } from '../../utils/helpers';
import { Heart, Share2, Copy, Twitter, Facebook, Linkedin } from 'lucide-react';

export default function ProjectCard({ project }) {
  const progress = calculateProgress(project.current_amount, project.goal_amount);
  const daysLeft = calculateDaysLeft(project.end_date);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const projectUrl = `${window.location.origin}/project/${project.id}`;
  const shareText = `Check out this project: ${project.title}`;

  const shareOptions = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(projectUrl)}`,
      color: 'hover:bg-blue-400',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectUrl)}`,
      color: 'hover:bg-blue-600',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}`,
      color: 'hover:bg-blue-700',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(projectUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareMenu(!showShareMenu);
  };

  const handleShareOptionClick = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  return (
    <Link to={`/project/${project.id}`}>
      <Card className="group overflow-hidden hover:shadow-lift transition-all">
        <div className="relative">
          <img
            src={project.image_url || 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80'}
            alt={project.title}
            className="w-full h-32 sm:h-40 md:h-44 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/0 to-slate-900/0" />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-900 capitalize">
              {project.category}
            </span>
            {project.status === 'funded' && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">
                Funded
              </span>
            )}
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">
            {project.description}
          </p>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{formatCurrency(project.current_amount)} raised</span>
              <span>Goal {formatCurrency(project.goal_amount)}</span>
            </div>
            <div className="mt-2 w-full bg-slate-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-secondary-400 h-2 rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}
              </span>
              <div className="flex items-center gap-2 relative">
                <button 
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <Heart className="h-4 w-4 text-slate-500" />
                </button>
                <div className="relative">
                  <button 
                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    onClick={handleShareClick}
                  >
                    <Share2 className="h-4 w-4 text-slate-500" />
                  </button>
                  
                  {showShareMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <span className="text-xs font-semibold text-slate-600">Share this project</span>
                      </div>
                      {shareOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={(e) => handleShareOptionClick(e, option.url)}
                          className={`w-full px-3 py-2 flex items-center gap-3 text-sm text-slate-700 hover:text-white transition-colors ${option.color}`}
                        >
                          <option.icon className="h-4 w-4" />
                          {option.name}
                        </button>
                      ))}
                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            copyToClipboard();
                            setShowShareMenu(false);
                          }}
                          className="w-full px-3 py-2 flex items-center gap-3 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                          Copy Link
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
