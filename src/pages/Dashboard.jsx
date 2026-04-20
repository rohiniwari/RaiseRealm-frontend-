import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import CreatorDashboard from './CreatorDashboard';
import BackerDashboard from './BackerDashboard';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (user.role === 'creator') {
    return <CreatorDashboard />;
  }

  if (user.role === 'backer') {
    return <BackerDashboard />;
  }

  // Fallback: redirect or show error
  navigate('/login');
  return null;
}

