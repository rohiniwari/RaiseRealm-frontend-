import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthCallback from './pages/AuthCallback';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import ProjectDetail from './pages/ProjectDetail';
import Dashboard from './pages/Dashboard';
import HowItWorks from './pages/HowItWorks';
import Trust from './pages/Trust';
import ImpactDashboard from './pages/ImpactDashboard';
import AIChatbot from './components/chatbot/AIChatbot';

function App() {
  return (
    <ThemeProvider>
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-projects" element={<Dashboard />} />
            <Route path="/backed-projects" element={<Dashboard />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/trust" element={<Trust />} />
            <Route path="/impact-dashboard" element={<ImpactDashboard />} />
          </Routes>
          
          {/* AI Chatbot - Available on all pages */}
          <AIChatbot />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
