import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '../ui/button';
import { Loader2, CheckCircle } from 'lucide-react';

export default function PaymentForm({ amount, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('Payment system is not ready. Please refresh the page and try again.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/project/${paymentIntent?.metadata?.project_id || ''}`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setPaymentSuccess(true);
      onSuccess?.(paymentIntent);
    } else {
      setIsLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Payment Successful!</h3>
        <p className="text-slate-600 mb-4">Thank you for your contribution of ${amount}</p>
        <Button onClick={onCancel}>Close</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-50 p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Contribution Amount</span>
          <span className="text-xl font-bold text-slate-900">${amount}</span>
        </div>
      </div>

      <PaymentElement />

      {errorMessage && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="submit"
          className="flex-1"
          disabled={!stripe || !elements || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${amount}`
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
