import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Trust = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What happens if a milestone is not completed?",
      answer: "Funds remain locked until progress is verified. If a creator fails to meet milestone requirements, the funds are held securely and can be refunded to backers or held until the creator demonstrates sufficient progress."
    },
    {
      question: "Can backers track project progress?",
      answer: "Yes, through milestone updates and notifications. Backers receive regular updates about each milestone's progress, including photos, metrics, and detailed reports from the creator."
    },
    {
      question: "Is my payment secure?",
      answer: "All payments are processed through secure, encrypted gateways. We partner with industry-leading payment providers to ensure your financial information is fully protected."
    },
    {
      question: "Can a project be cancelled?",
      answer: "Yes, under platform guidelines and review. If a project cannot be completed, a formal review process determines whether funds should be refunded to backers or released based on partial completion."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-primary-500/10 to-transparent blur-3xl" />
          <div className="relative max-w-screen-xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Trust & Transparency
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-6">
              A funding system designed to protect both creators and supporters.
            </p>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              RaiseRealm uses a milestone-based funding structure to ensure accountability and reduce risk for backers.
            </p>
          </div>
        </section>

        {/* How Milestone Funding Works */}
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 mb-4">
                How Milestone Funding Works
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Instead of releasing the entire funding amount at once, funds are distributed based on predefined milestones.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Creator Defines Milestones</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  While creating the project, creators set up clear milestones with title, description, required amount, and target date.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Backers Track Progress</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  All supporters can view milestone progress, updates, and reports in real-time through the project dashboard.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Funds Released on Completion</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  When a milestone is completed and verified, funds are released to the creator to proceed to the next phase.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Milestone Timeline Demo - Keeping existing */}
        <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <h2 className="font-heading font-extrabold tracking-tight text-3xl sm:text-4xl text-slate-900">Funding releases tied to real progress</h2>
                <p className="mt-4 text-slate-600">Creators define milestones (prototype, pilot, manufacturing, rollout). Backers see progress and updates, and funding releases happen stage-by-stage.</p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary-50 text-primary-700 border border-primary-100">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <path d="M7 12.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-sm text-slate-700"><span className="font-semibold">More transparency</span> for backers and stronger credibility for creators.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-secondary-50 text-secondary-700 border border-secondary-100">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <path d="M7 12.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-sm text-slate-700"><span className="font-semibold">Clear updates</span> with impact reporting to keep trust after funding ends.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-slate-50 text-slate-700 border border-slate-200">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <path d="M7 12.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-sm text-slate-700"><span className="font-semibold">Designed for scale</span> with analytics and discovery built around quality signals.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lift overflow-hidden">
                  <div className="p-6 lg:p-7 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading font-bold text-xl">Milestone timeline (demo)</h3>
                        <p className="mt-1 text-sm text-slate-600">What backers see: staged releases + progress updates.</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-800 border border-primary-100">Transparency</span>
                    </div>
                  </div>
                  <div className="p-6 lg:p-7">
                    <ol className="relative border-s border-slate-200">
                      <li className="mb-10 ms-6">
                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white">✓</span>
                        <h4 className="font-semibold text-slate-900">Milestone 1 — Prototype</h4>
                        <p className="text-sm text-slate-600">Design finalized, prototype built, initial testing complete.</p>
                        <div className="mt-3 w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-primary-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </li>
                      <li className="mb-10 ms-6">
                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-secondary-500 text-white">2</span>
                        <h4 className="font-semibold text-slate-900">Milestone 2 — Pilot rollout</h4>
                        <p className="text-sm text-slate-600">Deploy pilot to first partners, collect feedback, publish results.</p>
                        <div className="mt-3 w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-gradient-to-r from-secondary-500 to-primary-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                        </div>
                      </li>
                      <li className="ms-6">
                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-slate-700">3</span>
                        <h4 className="font-semibold text-slate-900">Milestone 3 — Scale</h4>
                        <p className="text-sm text-slate-600">Manufacturing / expansion, ongoing reporting, and community updates.</p>
                        <div className="mt-3 w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-slate-300 h-2 rounded-full" style={{ width: '12%' }}></div>
                        </div>
                      </li>
                    </ol>

                    <div className="mt-8 rounded-xl border border-slate-200 bg-primary-50/60 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">Creator update preview</div>
                          <div className="mt-1 text-sm text-slate-700">"Pilot installation started this week—posting measurements as we go."</div>
                          <div className="mt-2 text-xs text-slate-500">Posted 3 hours ago • Photos + metrics included</div>
                        </div>
                        <button type="button" className="shrink-0 inline-flex items-center justify-center px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm font-semibold hover:bg-slate-50">Follow</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Builds Trust */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 mb-4">
                Why This Builds Trust
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Our milestone-based approach creates a secure environment for both creators and backers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Protection for Backers */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">🛡 Protection for Backers</h3>
                <p className="text-slate-600">
                  Funds are not released upfront. Progress must be demonstrated and verified before each milestone payment is released. Your money is safe until creators deliver results.
                </p>
              </div>

              {/* Transparency for Community */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">📢 Transparency for Community</h3>
                <p className="text-slate-600">
                  Project updates are visible to all supporters. Every milestone completion, update, and progress report is shared publicly, creating full visibility into how funded projects are progressing.
                </p>
              </div>

              {/* Accountability for Creators */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">📌 Accountability for Creators</h3>
                <p className="text-slate-600">
                  Clear deadlines and deliverables reduce uncertainty. Creators are held accountable to their commitments, with structured milestones ensuring projects stay on track.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fraud Prevention Section */}
        <section className="py-16 lg:py-24 bg-slate-900 text-white">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
                Fraud Prevention & Security
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                We implement multiple layers of protection to ensure a safe platform for everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Identity Verification</h3>
                <p className="text-slate-400 text-sm">
                  All creators undergo identity verification during project creation to ensure authenticity.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Project Review</h3>
                <p className="text-slate-400 text-sm">
                  Every project undergoes review before approval to ensure quality and compliance.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Reporting System</h3>
                <p className="text-slate-400 text-sm">
                  Comprehensive dispute resolution and reporting system for concerns or issues.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Get answers to common questions about how RaiseRealm protects both creators and backers.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40' : 'max-h-0'}`}
                  >
                    <div className="px-6 pb-5 text-slate-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-primary-50">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 lg:p-10 shadow-soft">
              <div className="text-center">
                <h2 className="font-heading font-extrabold tracking-tight text-3xl sm:text-4xl">Ready to get started?</h2>
                <p className="mt-3 text-slate-600 max-w-2xl mx-auto">Join thousands of creators who have successfully funded their dreams with transparent milestones.</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/create-project" className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-soft transition-all">Start a project</Link>
                  <Link to="/projects" className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-all">Browse projects</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Trust;
