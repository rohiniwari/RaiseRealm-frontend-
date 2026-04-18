import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import api from '../../services/api';

let stripePromise = null;

export default function StripeProvider({ children, clientSecret }) {
  const [stripe, setStripe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initStripe = async () => {
      try {
        const response = await api.get('/payments/config');
        const key = response?.data?.publishableKey;
        if (!key) {
          console.warn('API not available, using mock Stripe key');
          // Use the test key from .env for development
          stripePromise = loadStripe('pk_test_51T5h79EWfmRjkeFuu1wLtvuEQIuR6CHDdgyNbVYkQIKIlAGIZ0apbo9L6GCs3GUbep9UMcwfsDPSCPwpXzb9TPvt00sv4alg92');
          setStripe(stripePromise);
          return;
        }
        stripePromise = loadStripe(key);
        setStripe(stripePromise);
      } catch (err) {
        console.warn('API not available, using mock Stripe key');
        // Fallback to test key
        stripePromise = loadStripe('pk_test_51T5h79EWfmRjkeFuu1wLtvuEQIuR6CHDdgyNbVYkQIKIlAGIZ0apbo9L6GCs3GUbep9UMcwfsDPSCPwpXzb9TPvt00sv4alg92');
        setStripe(stripePromise);
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

  // pass clientSecret (if available) as an option to Elements
  const options = clientSecret ? { clientSecret } : {};

  return (
    <Elements stripe={stripe} options={options}>
      {children}
    </Elements>
  );
}
