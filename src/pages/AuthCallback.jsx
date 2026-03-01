import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Get the hash fragment from URL (contains access token for implicit flow)
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      
      const accessToken = params.get('access_token');
      const idToken = params.get('id_token');
      const expiresIn = params.get('expires_in');
      const scope = params.get('scope');
      const state = params.get('state');
      
      // Check for error in URL
      const urlParams = new URLSearchParams(window.location.search);
      const errorParam = urlParams.get('error');
      
      if (errorParam) {
        setError(urlParams.get('error_description') || 'Authentication failed');
        return;
      }

      if (accessToken) {
        // For Google OAuth, we need to get user info from Google
        try {
          // Decode the ID token to get user info
          const response = await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
          );
          
          if (response.ok) {
            const profile = await response.json();
            
            // Send to backend
            const backendResponse = await api.post('/auth/google-auth', {
              email: profile.email,
              name: profile.name,
              googleId: profile.sub,
              avatar_url: profile.picture
            });

            if (backendResponse.data.token) {
              localStorage.setItem('token', backendResponse.data.token);
              localStorage.setItem('user', JSON.stringify(backendResponse.data.user));
              navigate('/dashboard');
            }
          } else {
            setError('Failed to get user info from Google');
          }
        } catch (err) {
          setError(err.message || 'Authentication failed');
        }
      } else {
        // No access token - check if there's any error
        setError('No access token received');
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Completing authentication...</p>
      </div>
    </div>
  );
}
