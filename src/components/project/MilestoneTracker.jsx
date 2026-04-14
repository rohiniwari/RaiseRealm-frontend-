import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Milestone, Target, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formatCurrency, calculateMilestoneProgress } from '../../utils/helpers';

const MilestoneTracker = ({ milestones = [], currentRaised = 0, isOwner = false })
  const totalMilestones = milestones.length;

  const getMilestoneProgress = (milestoneAmount) => {
    if (milestoneAmount <= 0) return 0;
    return Math.min(100, Math.round((currentRaised / milestoneAmount) * 100));
  };

  const getStatus = (index, progress) => {
    if (progress >= 100) return 'complete';
    if (currentRaised > 0) return 'active';
    return 'pending';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Milestone className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl">Milestone Progress</CardTitle>
        </div>
        <p className="text-sm text-slate-600">Track funding milestones and project delivery</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {totalMilestones === 0 ? (
          <p className="text-center text-slate-500 py-8">No milestones defined</p>
        ) : (
          <div className="space-y-6">
            {milestones.map((milestone, index) => {
              const progress = getMilestoneProgress(milestone.amount_required || 0);
              const status = getStatus(index, progress);
              const isLast = index === totalMilestones - 1;

              return (
                <div key={milestone.id || index} className="space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br p-px">
                        <div className={cn(
                          "w-full h-full rounded-full flex items-center justify-center text-sm font-bold",
                          status === 'complete' ? "bg-emerald-500 text-white" :
                          status === 'active' ? "bg-blue-500 text-white" :
                          "bg-slate-200 text-slate-500 dark:bg-slate-700"
                        )}>
                          {progress}%
                        </div>
                      </div>
                      <div className="w-2 h-12 bg-slate-200 mx-1 mt-1" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-900">{milestone.title}</h4>
                        <Badge variant={status === 'complete' ? 'default' : status === 'active' ? 'secondary' : 'outline'}>
                          {status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{milestone.description}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Target className="h-3 w-3" />
                        ₹{formatCurrency(milestone.amount_required || 0)} • 
                        {milestone.target_date && new Date(milestone.target_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
<Progress value={parseInt(progress)} size="md" showPercentage={false} className="h-3" />
                  {!isLast && (
                    <div className="h-px bg-gradient-to-r from-slate-200 to-slate-100 mx-16" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MilestoneTracker;

