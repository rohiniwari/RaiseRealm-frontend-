import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const HowItWorks = () => {
  const steps = [
    {
      icon: "🚀",
      title: "Step 1 – Create Your Project",
      description: "Sign up and share your idea with a detailed description, funding goal, rewards, and milestones.",
      subtitle: "Set clear goals. Define rewards. Build trust from day one."
    },
    {
      icon: "💰",
      title: "Step 2 – Get Funded",
      description: "Backers browse projects and support the ones they believe in. Funds are securely held until milestones are completed.",
      subtitle: "Secure payments. Transparent progress tracking."
    },
    {
      icon: "📊",
      title: "Step 3 – Complete Milestones",
      description: "Project creators update progress and complete milestones. Funds are released step-by-step based on achieved goals.",
      subtitle: "Accountability. Structured growth."
    },
    {
      icon: "🎁",
      title: "Step 4 – Deliver Rewards",
      description: "Once funding is complete, creators deliver rewards to their supporters and continue building their vision.",
      subtitle: "Community-driven success."
    },
    {
      icon: "📣",
      title: "Step 5 – Share Updates",
      description: "Keep your backers informed with regular updates, progress reports, and behind-the-scenes content.",
      subtitle: "Transparency builds trust. Keep the conversation going."
    },
    {
      icon: "🤝",
      title: "Step 6 – Build Community",
      description: "Connect with your supporters, respond to feedback, and create a lasting community around your project.",
      subtitle: "Your backers become your biggest advocates."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-primary-500/10 to-transparent blur-3xl" />
          <div className="relative max-w-screen-xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              How RaiseRealm Works
            </h1>
            <p className="text-xl text-blue-200 mb-4">
              Turn ideas into funded reality in six simple steps.
            </p>
            <p className="text-slate-300 max-w-2xl mx-auto">
              RaiseRealm connects creators and supporters through a secure, milestone-based funding system. 
              From launching your idea to delivering rewards, everything is transparent and structured.
            </p>
          </div>
        </section>

        {/* Step-by-Step Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-soft hover:shadow-lift transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl mb-2">{step.icon}</div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">{step.title}</h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      <p className="text-sm text-slate-500 italic border-l-2 border-primary-200 pl-3">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose RaiseRealm */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center text-slate-900 mb-4">
              Why Creators Choose RaiseRealm
            </h2>
            <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
              We provide the tools and support you need to turn your vision into reality.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center border border-slate-100 shadow-soft">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Secure Funding</h3>
                <p className="text-slate-600 text-sm">
                  All payments are encrypted and held securely until milestones are met.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center border border-slate-100 shadow-soft">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Milestone Progress</h3>
                <p className="text-slate-600 text-sm">
                  Funds released step-by-step as you achieve your defined goals.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center border border-slate-100 shadow-soft">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Community Support</h3>
                <p className="text-slate-600 text-sm">
                  Connect with backers who believe in your vision and mission.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center border border-slate-100 shadow-soft">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Real-time Updates</h3>
                <p className="text-slate-600 text-sm">
                  Keep backers informed with notifications and progress reports.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-cyan-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-6">
              Start Your Project Today
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Your idea deserves an audience. Join thousands of creators who have successfully funded their dreams.
            </p>
            <Link
              to="/create-project"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start Your Project
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
