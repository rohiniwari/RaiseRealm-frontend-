import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/button';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-slate-200 dark:bg-slate-900/70 dark:border-slate-700">
      <nav className="max-w-screen-xl mx-auto px-6 lg:px-8 py-4" aria-label="Primary">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="RaiseRealm Logo" className="h-10 w-10 object-contain rounded-xl" />
            <div className="leading-tight">
              <div className="font-heading font-extrabold tracking-tight text-lg">RaiseRealm</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Fuel your vision, fund your future</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/projects" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Featured projects</Link>
            <Link to="/how-it-works" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">How it works</Link>
            <Link to="/trust" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Trust & milestones</Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <img 
                    src={user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} 
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium dark:text-white">{user.name}</span>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 dark:bg-slate-800 dark:border-slate-700 py-2">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/my-projects" 
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Projects
                    </Link>
                    <Link 
                      to="/backed-projects" 
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Backed Projects
                    </Link>
                    <Link 
                      to="/impact-dashboard" 
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Impact Dashboard
                    </Link>
                    <hr className="my-2 border-slate-200 dark:border-slate-700" />

                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors dark:text-slate-300 dark:hover:text-white">
                  Log in
                </Link>
                <Link to="/register" className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-soft transition-all">
                  Start a project
                </Link>
              </>
            )}
            <button 
              data-collapse-toggle="mobile-menu" 
              type="button" 
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-2 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col gap-2">
              <Link to="/projects" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">Featured projects</Link>
              <Link to="/how-it-works" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">How it works</Link>
              <Link to="/trust" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">Trust & milestones</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
