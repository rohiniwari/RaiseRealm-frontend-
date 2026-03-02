import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import api from '../../services/api';

let stripePromise = null;

export default function StripeProvider({ children }) {
  const [stripe, setStripe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initStripe = async () => {
      try {
        const response = await api.get('/payments/config');
        const key = response?.data?.publishableKey;
        if (!key) {
          const msg = 'Stripe publishable key not found in /payments/config';
          console.error(msg);
          setError(msg);
          return;
        }
        stripePromise = loadStripe(key);
        setStripe(stripePromise);
      } catch (err) {
        console.error('Error loading Stripe:', err);
        setError(err.message || 'Failed to load Stripe');
      }
    };

    if (!stripePromise) {
      initStripe();
    } else {
      setStripe(stripePromise);
    }
  }, []);

  if (error) {
    return (
      <div className="text-center p-4 text-red-600">
        {error || 'Unable to initialize payment system.'}
      </div>
    );
  }

  if (!stripe) {
    return <div>Loading payment system...</div>;
  }

  return <Elements stripe={stripe}>{children}</Elements>;
}
