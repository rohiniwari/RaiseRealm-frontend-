import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Use authorization code flow: Google returns a `code` in query string
      const urlParams = new URLSearchParams(window.location.search);
      const errorParam = urlParams.get('error');
      if (errorParam) {
        setError(urlParams.get('error_description') || 'Authentication failed');
        return;
      }

      const code = urlParams.get('code');

      if (code) {
        try {
          // Send authorization code to backend to exchange for tokens and create/get user
          const redirectUri = window.location.origin + '/auth/callback';
          const backendResponse = await api.post('/auth/google-auth', { code, redirectUri });

          if (backendResponse.data?.token) {
            localStorage.setItem('token', backendResponse.data.token);
            localStorage.setItem('user', JSON.stringify(backendResponse.data.user));
            navigate('/dashboard');
            return;
          }

          setError('Authentication failed: no token returned from backend');
        } catch (err) {
          console.error('Error exchanging code:', err);
          setError(err.response?.data?.error || err.message || 'Authentication failed');
        }
      } else {
        setError('No authorization code received');
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Failed</h1>
          <p className="text-slate-600 mb-4">{error}</p>
          <a href="/login" className="text-primary-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Completing authentication...</p>
      </div>
    </div>
  );
}
