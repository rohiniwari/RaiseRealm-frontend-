import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Chrome } from 'lucide-react';
import api from '../services/api';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      
      if (!clientId) {
        setError('Google Client ID not configured');
        setLoading(false);
        return;
      }

      // Redirect to Google OAuth - this is the proper way to handle OAuth
      const redirectUri = window.location.origin + '/auth/callback';
      // Use authorization code flow (response_type=code) and request offline access
      const authUrl =
        'https://accounts.google.com/o/oauth2/v2/auth?' +
        'client_id=' + encodeURIComponent(clientId) +
        '&redirect_uri=' + encodeURIComponent(redirectUri) +
        '&response_type=code' +
        '&scope=' + encodeURIComponent('openid email profile') +
        '&access_type=offline' +
        '&prompt=consent';
      
      // Store loading state before redirect
      sessionStorage.setItem('googleAuthLoading', 'true');
      window.location.href = authUrl;
      
    } catch (err) {
      setError(err.response?.data?.error || 'Google login failed. Please try again.');
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M4 16.5V7.8c0-.6.3-1.1.8-1.4L11 2.9c.6-.3 1.3-.3 1.9 0l6.2 3.5c.5.3.8.8.8 1.4v8.7c0 .6-.3 1.1-.8 1.4l-6.2 3.5c-.6.3-1.3.3-1.9 0l-6.2-3.5c-.5-.3-.8-.8-.8-1.4Z" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M8 12.2 10.8 15 16.2 9.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>
            
            {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
              <Button 
                type="button" 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <Chrome className="h-5 w-5" />
                Sign in with Google
              </Button>
            ) : (
              <div className="text-center text-sm text-slate-500">Google sign-in not configured (set VITE_GOOGLE_CLIENT_ID)</div>
            )}

            
            <p className="text-sm text-center text-slate-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
