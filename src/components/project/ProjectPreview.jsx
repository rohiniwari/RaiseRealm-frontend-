import React from 'react';
import { formatCurrency } from '../../utils/helpers';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge'; // Assume shadcn Badge

const ProjectPreview = ({ formData }) => {
  const mockProgress = 0;
  const mockDaysLeft = formData.end_date ? new Date(formData.end_date) - new Date() > 0 ? '30' : 'Ended' : '30';

  const mockRewards = formData.rewards.filter(r => r.title).slice(0,3);
  const mockMilestones = formData.milestones.filter(m => m.title).slice(0,3);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl overflow-hidden p-8 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center mb-4">
            <img 
              src={formData.image_url || '/logo.png'} 
              alt="Campaign Hero" 
              className="w-full h-full object-cover rounded-xl" 
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">{formData.title || 'Your Campaign'}</h1>
          <p className="text-blue-100 mb-6 max-w-2xl leading-relaxed">{formData.description?.substring(0,200) || 'Project description...'}</p>
          <Badge variant="secondary" className="uppercase">{formData.category || 'Technology'}</Badge>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-xl bg-slate-50">
          <div className="text-2xl font-bold text-slate-900">₹0</div>
          <div className="text-sm text-slate-500 uppercase tracking-wide">Raised</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-slate-50">
          <div className="text-2xl font-bold text-slate-900">₹{formData.goal_amount || 0}</div>
          <div className="text-sm text-slate-500 uppercase tracking-wide">Goal</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-slate-50">
          <div className="text-2xl font-bold text-slate-900">{mockDaysLeft}</div>
          <div className="text-sm text-slate-500 uppercase tracking-wide">Days Left</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-sm font-medium mb-2">
          <span>0% funded</span>
          <span>₹0 / ₹{formData.goal_amount || 0}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all" 
            style={{width: `${mockProgress}%`}}
          />
        </div>
      </div>

      {/* Rewards Preview */}
<RewardTiers rewards={formData.rewards.filter(r => r.title)} currentRaised={0} />

      {/* Milestones Preview */}
      {mockMilestones.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Milestones</h3>
          <div className="space-y-3">
            {mockMilestones.map((m, i) => (
              <div key={i} className="p-4 border rounded-xl bg-slate-50">
                <div className="flex justify-between">
                  <span className="font-medium">{m.title}</span>
                  <span>₹{m.amount_required || 0}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <Card>
        <CardContent className="p-6 text-center">
          <Button size="lg" className="w-full mb-2">
            Back This Project
          </Button>
          <Button variant="outline" className="w-full">Share</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectPreview;
