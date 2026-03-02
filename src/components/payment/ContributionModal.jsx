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
  const [linkLoading, setLinkLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');
  const [linkError, setLinkError] = useState('');

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

  const createPaymentLink = async () => {
    setLinkError('');
    setPaymentLink('');
    setLinkLoading(true);
    try {
      const res = await api.post('/payments/create-link', {
        amount,
        project_id: projectId,
        reward_id: rewardId,
      });
      if (res.data?.url) {
        setPaymentLink(res.data.url);
      } else {
        setLinkError('No link returned from server');
      }
    } catch (err) {
      // Fallback: generate a simple shareable link that pre-fills amount on project page
      const fallback = `${window.location.origin}/project/${projectId}?amount=${encodeURIComponent(amount)}`;
      setPaymentLink(fallback);
      setLinkError('Server did not return a payment link; showing fallback link');
      console.error('createPaymentLink error:', err);
    } finally {
      setLinkLoading(false);
    }
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
          <>
            <StripeProvider clientSecret={clientSecret}>
              <PaymentForm
                amount={amount}
                projectId={projectId}
                onSuccess={handleSuccess}
                onCancel={onClose}
              />
            </StripeProvider>
            <div className="mt-4">
            <div className="flex items-center justify-between gap-3">
              <button
                className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-md text-sm"
                onClick={createPaymentLink}
                disabled={linkLoading}
              >
                {linkLoading ? 'Generating link...' : 'Get payment link / QR'}
              </button>
              {paymentLink && (
                <div className="flex items-center gap-3">
                  <a href={paymentLink} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">Open link</a>
                  <button
                    className="px-2 py-1 border rounded text-sm"
                    onClick={() => navigator.clipboard.writeText(paymentLink)}
                  >Copy</button>
                </div>
              )}
            </div>
              {paymentLink && (
                <div className="mt-3">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(paymentLink)}`} alt="payment-qr" />
                  {linkError && <p className="text-sm text-yellow-500 mt-2">{linkError}</p>}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-red-600">
            Failed to initialize payment. Please try again.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
