import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Clock, Gift, Crown } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { useState, useEffect } from 'react';

const RewardTiers = ({ rewards = [], currentRaised = 0 }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getCountdown = (endTime) => {
    if (!endTime) return null;
    const end = new Date(endTime).getTime();
    const distance = end - now;
    if (distance < 0) return 'Expired';
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };

  const unlockedRewards = rewards.filter(r => currentRaised >= (r.min_amount || 0));
  const nextReward = rewards.find(r => currentRaised < (r.min_amount || 0));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Rewards & Backer Perks</h2>
        <p className="text-slate-600">Choose your support level and get exclusive rewards!</p>
      </div>

      {/* Unlocked */}
      {unlockedRewards.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <p className="font-semibold text-emerald-600 flex items-center gap-2">
            <Gift className="h-5 w-5" />
            {unlockedRewards.length} rewards unlocked!
          </p>
        </motion.div>
      )}

      {/* Tiers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward, index) => {
          const isUnlocked = currentRaised >= (reward.min_amount || 0);
          const countdown = getCountdown(reward.early_bird_end);

          return (
            <motion.div 
              key={reward.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className={cn(
                "h-full cursor-pointer relative overflow-hidden border-2 group-hover:shadow-xl transition-all duration-300",
                isUnlocked ? "border-emerald-300 ring-2 ring-emerald-200/50" : "border-slate-200 hover:border-slate-300",
                countdown ? "border-orange-300 ring-orange-200/30" : ""
              )}>
                <div className="absolute top-3 right-3">
                  <Badge variant={isUnlocked ? "default" : "outline"} className="text-xs">
                    {isUnlocked ? 'UNLOCKED' : formatCurrency(reward.min_amount || 0)}
                  </Badge>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    {isUnlocked ? <Crown className="h-5 w-5 text-emerald-500" /> : <Gift className="h-5 w-5 text-slate-400" />}
                    <CardTitle className="text-lg">{reward.title}</CardTitle>
                  </div>
                  {countdown && (
                    <div className="flex items-center gap-1 text-orange-600 text-xs font-mono bg-orange-50 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      <span>{countdown}</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Limited spots</span>
                    <Badge variant="secondary" className="group-hover:scale-110">
                      Claim Reward
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {nextReward && (
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="text-center p-8 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border-2 border-dashed border-slate-300 dark:from-slate-900/50"
        >
          <div className="text-4xl mb-4">🎁</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Next Unlock</h3>
          <p className="text-slate-600 mb-4">{nextReward.title} - {formatCurrency(nextReward.min_amount)}</p>
          <Progress value={Math.min(100, (currentRaised / nextReward.min_amount) * 100)} />
        </motion.div>
      )}
    </div>
  );
};

export default RewardTiers;

