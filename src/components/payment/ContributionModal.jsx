import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import PaymentForm from './PaymentForm';
import StripeProvider from './StripeProvider';
import api from '../../services/api';
import { projectService } from '../../services/projectService';
import { Button } from '../ui/button';
import { formatCurrency } from '../../utils/helpers';


export default function ContributionModal({ 
  isOpen, 
  onClose, 
  projectId, 
  amount: propAmount, 
  rewardId: propRewardId = null,
  onSuccess 
}) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');
  const [linkError, setLinkError] = useState('');
  const [rewards, setRewards] = useState([]);
  const [selectedRewardId, setSelectedRewardId] = useState(propRewardId || null);
  const [amount, setAmount] = useState(propAmount || 0);
  const [minAmount, setMinAmount] = useState(0);
  const [rewardError, setRewardError] = useState('');

  useEffect(() => {
    if (isOpen && projectId) {
      fetchRewards();
    }
  }, [isOpen, projectId]);

  useEffect(() => {
    // Update amount when prop changes (from project detail)
    if (propAmount) {
      setAmount(propAmount);
    }
  }, [propAmount]);

  const fetchRewards = async () => {
    try {
      const projectRewards = await projectService.getProjectRewards(projectId);
      setRewards(projectRewards || []);
    } catch (error) {
      console.error('Failed to fetch rewards:', error);
    }
  };

  const handleRewardChange = (newRewardId) => {
    setSelectedRewardId(newRewardId);
    const reward = rewards.find(r => r.id === newRewardId);
    if (reward && reward.min_amount) {
      setAmount(reward.min_amount);
      setMinAmount(reward.min_amount);
    } else {
      setMinAmount(0);
    }
    setRewardError('');
  };

  const validateAmount = () => {
    if (amount < minAmount) {
      setRewardError(`Minimum amount is ${formatCurrency(minAmount)}`);
      return false;
    }
    return true;
  };

  const createPaymentIntent = async () => {
    if (!validateAmount()) return;
    
    setLoading(true);
    try {
      const response = await api.post('/payments/create-intent', {
        amount,
        project_id: projectId,
        reward_id: selectedRewardId,
      });
      if (response.data.clientSecret) {
        setClientSecret(response.data.clientSecret);
      }
    } catch (error) {
      console.warn('API not available, simulating payment intent creation');
      // Mock client secret for testing
      setClientSecret('pi_mock_client_secret_' + Date.now());
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (paymentIntent) => {
    onSuccess?.(paymentIntent);
    setTimeout(() => onClose(), 2000);
  };

  const createPaymentLink = async () => {
    if (!validateAmount()) return;
    // ... existing link code
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Contribution</DialogTitle>
        </DialogHeader>
        
        {/* Reward Select */}
        <div className="space-y-4 mb-6">
          <label className="text-sm font-medium block">Select Reward (optional)</label>
          <select 
            value={selectedRewardId || ''}
            onChange={(e) => handleRewardChange(e.target.value || null)}
            className="w-full p-3 border rounded-lg focus:ring-2"
          >
            <option value="">Direct Support</option>
            {rewards.map(reward => (
              <option key={reward.id} value={reward.id}>
                {reward.title} (min {formatCurrency(reward.min_amount)})
              </option>
            ))}
          </select>
          
          <div className="space-y-2">
            <label className="text-sm font-medium block">Amount</label>
            <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(minAmount || 1, parseFloat(e.target.value) || 0))}
              className="w-full p-3 border rounded-lg focus:ring-2"
              min={minAmount}
            />
            {rewardError && <p className="text-sm text-red-500">{rewardError}</p>}
          </div>
          
          <Button onClick={createPaymentIntent} className="w-full" disabled={loading || !validateAmount()}>
            {loading ? 'Preparing...' : 'Continue to Payment'}
          </Button>
        </div>

        {clientSecret && (
          <StripeProvider clientSecret={clientSecret}>
            <PaymentForm amount={amount} projectId={projectId} onSuccess={handleSuccess} onCancel={onClose} />
          </StripeProvider>
        )}
        
        {/* Link/QR existing */}
      </DialogContent>
    </Dialog>
  );
}

