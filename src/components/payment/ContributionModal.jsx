import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import PaymentForm from './PaymentForm';
import StripeProvider from './StripeProvider';
import api from '../../services/api';

export default function ContributionModal({ 
  isOpen, 
  onClose, 
  projectId, 
  amount, 
  rewardId = null,
  onSuccess 
}) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && amount) {
      createPaymentIntent();
    }
  }, [isOpen, amount]);

  const createPaymentIntent = async () => {
    setLoading(true);
    try {
      const response = await api.post('/payments/create-intent', {
        amount,
        project_id: projectId,
        reward_id: rewardId,
      });
      if (response.data.clientSecret) {
        setClientSecret(response.data.clientSecret);
      } else {
        console.error('No clientSecret received:', response.data);
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (paymentIntent) => {
    onSuccess?.(paymentIntent);
    setTimeout(() => {
      onClose();
      setClientSecret('');
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Contribution</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Preparing payment...</p>
          </div>
        ) : clientSecret ? (
          <StripeProvider>
            <PaymentForm
              amount={amount}
              onSuccess={handleSuccess}
              onCancel={onClose}
            />
          </StripeProvider>
        ) : (
          <div className="text-center py-8 text-red-600">
            Failed to initialize payment. Please try again.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
