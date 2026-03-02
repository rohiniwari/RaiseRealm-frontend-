import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import api from '../../services/api';

let stripePromise = null;

export default function StripeProvider({ children }) {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const initStripe = async () => {
      try {
        const response = await api.get('/payments/config');
        const key = response?.data?.publishableKey;
        if (!key) {
          console.error('Stripe publishable key not found in /payments/config');
          return;
        }
        stripePromise = loadStripe(key);
        setStripe(stripePromise);
      } catch (error) {
        console.error('Error loading Stripe:', error);
      }
    };

    if (!stripePromise) {
      initStripe();
    } else {
      setStripe(stripePromise);
    }
  }, []);

  if (!stripe) {
    return <div>Loading payment system...</div>;
  }

  return <Elements stripe={stripe}>{children}</Elements>;
}
