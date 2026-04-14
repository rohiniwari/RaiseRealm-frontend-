import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Users, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { formatCurrency, calculateDaysLeft, calculateProgress } from '../../utils/helpers';

const StatsOverview = ({ project, contributions = [], period = 'daily' }) => {
  const [statsPeriod, setStatsPeriod] = useState(period);
  const [recentDonations, setRecentDonations] = useState([]);

  const raised = project.current_amount || project.raised || 0;
  const goal = project.goal_amount || project.goal || 0;
  const progress = calculateProgress(raised, goal);
  const daysLeft = calculateDaysLeft(project.end_date || project.deadline);
  const numBackers = new Set(contributions.map(c => c.user_id || c.donor_id)).size;
  const avgDonation = contributions.length > 0 ? raised / contributions.length : 0;

  useEffect(() => {
    // Mock time-series data (daily/weekly/monthly)
    const mockData = {
      daily: [50, 120, 80, 200, 150],
      weekly: [300, 450, 600, 800, 1100],
      monthly: [1000, 2500, 4500, 7000, raised]
    };
    setRecentDonations(mockData[statsPeriod] || mockData.daily);
  }, [statsPeriod, raised]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Raised */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
          <DollarSign className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(raised)}</div>
          <Progress value={progress} className="mt-2" />
          <p className="text-xs text-slate-500">{progress}% of {formatCurrency(goal)}</p>
        </CardContent>
      </Card>

      {/* Number of Backers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium"># Backers</CardTitle>
          <Users className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{numBackers}</div>
          <p className="text-xs text-slate-500">{numBackers} supporters</p>
        </CardContent>
      </Card>

      {/* Average Donation */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Donation</CardTitle>
          <TrendingUp className="h-5 w-5 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(avgDonation)}</div>
          <p className="text-xs text-slate-500">Average per backer</p>
        </CardContent>
      </Card>

      {/* Time Left */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Time Left</CardTitle>
          <Clock className="h-5 w-5 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{daysLeft}d</div>
          <p className="text-xs text-slate-500">Campaign ends</p>
        </CardContent>
      </Card>

      {/* Donation Activity View */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle>Recent Activity ({statsPeriod})</CardTitle>
          <div className="ml-auto flex gap-2">
            <button onClick={() => setStatsPeriod('daily')} className={`px-3 py-1 rounded-full text-xs ${statsPeriod === 'daily' ? 'bg-primary text-primary-foreground' : 'text-slate-500'}`}>Daily</button>
            <button onClick={() => setStatsPeriod('weekly')} className={`px-3 py-1 rounded-full text-xs ${statsPeriod === 'weekly' ? 'bg-primary text-primary-foreground' : 'text-slate-500'}`}>Weekly</button>
            <button onClick={() => setStatsPeriod('monthly')} className={`px-3 py-1 rounded-full text-xs ${statsPeriod === 'monthly' ? 'bg-primary text-primary-foreground' : 'text-slate-500'}`}>Monthly</button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {recentDonations.map((amount, idx) => (
              <div key={idx} className="min-w-[60px] flex flex-col items-center">
                <Progress value={100} className="w-12 h-2 mb-1" />
                <div className="text-xs font-mono">{formatCurrency(amount)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;

