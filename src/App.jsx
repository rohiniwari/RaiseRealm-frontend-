import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthCallback from './pages/AuthCallback';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import EditProject from './pages/EditProject';
import ProjectDetail from './pages/ProjectDetail';
import Dashboard from './pages/Dashboard';
import HowItWorks from './pages/HowItWorks';
import Trust from './pages/Trust';
import ImpactDashboard from './pages/ImpactDashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import NotFound from './pages/NotFound';
import { ToastContainer } from './components/ui/ToastContainer';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/create-project" element={<CreateProject />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="/project/:id/edit" element={<EditProject />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-projects" element={<Dashboard />} />
                <Route path="/backed-projects" element={<Dashboard />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/trust" element={<Trust />} />
                <Route path="/impact-dashboard" element={<ImpactDashboard />} />
                <Route path="/impact-reports/:projectId" element={<ImpactDashboard />} />
                <Route path="/analytics" element={<AnalyticsDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
      <ToastContainer />
    </ErrorBoundary>
  );
}

export default App;
