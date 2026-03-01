import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 16.5V7.8c0-.6.3-1.1.8-1.4L11 2.9c.6-.3 1.3-.3 1.9 0l6.2 3.5c.5.3.8.8.8 1.4v8.7c0 .6-.3 1.1-.8 1.4l-6.2 3.5c-.6.3-1.3.3-1.9 0l-6.2-3.5c-.5-.3-.8-.8-.8-1.4Z" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M8 12.2 10.8 15 16.2 9.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div>
                <div className="font-heading font-extrabold text-lg">RaiseRealm</div>
                <div className="text-sm text-slate-300">Crowdfunding with transparency-first design.</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-slate-300 max-w-md">
              RaiseRealm connects creators and backers through clear goals, transparent milestones, and a community that funds what it believes in.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Platform</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li><Link to="/projects" className="hover:text-white">Discover</Link></li>
                  <li><Link to="/create-project" className="hover:text-white">Start a project</Link></li>
                  <li><Link to="/trust" className="hover:text-white">Milestones</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Creators</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li><Link to="/how-it-works" className="hover:text-white">How it works</Link></li>
                  <li><Link to="/rewards" className="hover:text-white">Rewards</Link></li>
                  <li><Link to="/impact" className="hover:text-white">Impact reporting</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Community</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li><Link to="/success-stories" className="hover:text-white">Success stories</Link></li>
                  <li><Link to="/support" className="hover:text-white">Support</Link></li>
                  <li><Link to="/safety" className="hover:text-white">Safety</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-400">© {new Date().getFullYear()} RaiseRealm. All rights reserved.</div>
          <div className="text-xs text-slate-400">Built to feel premium, fast, and trustworthy.</div>
        </div>
      </div>
    </footer>
  );
}
