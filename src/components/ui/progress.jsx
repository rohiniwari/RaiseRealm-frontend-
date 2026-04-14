import React from "react"
import { cn } from "../../lib/utils"

const categoryColors = {
  technology: 'from-blue-500 to-indigo-500',
  art: 'from-purple-500 to-pink-500',
  film: 'from-orange-500 to-red-500',
  music: 'from-green-500 to-emerald-500',
  games: 'from-yellow-500 to-amber-500',
  design: 'from-pink-500 to-rose-500',
  default: 'from-blue-500 to-emerald-500'
};

const Progress = ({ 
  value = 0, 
  category = 'default', 
  className, 
  size = "md", 
  showPercentage = true,
  ...props 
}) => {
  const gradient = categoryColors[category] || categoryColors.default;
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }[size] || 'h-3';

  return (
    <div className={cn("relative overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700", sizeClasses, className)} {...props}>
      <div 
        className={cn(
          "h-full bg-gradient-to-r transition-all duration-1000 ease-out flex items-center justify-center overflow-hidden relative",
          gradient
        )}
        style={{ width: `${Math.min(value, 100)}%` }}
      >
        {showPercentage && value > 0 && (
          <span className="absolute left-1/2 transform -translate-x-1/2 text-xs font-bold text-white drop-shadow-md">
            {Math.round(value)}%
          </span>
        )}
      </div>
    </div>
  );
};

export { Progress };

