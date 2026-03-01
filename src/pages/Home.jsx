import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AIChatbot from '../components/chatbot/AIChatbot';
import { projectService } from '../services/projectService';
import { formatCurrency, calculateProgress } from '../utils/helpers';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      const data = await projectService.getProjects({ limit: 6, sort: 'newest' });
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoadingProjects(false);
    }
  };

  const getProjectColor = (index) => {
    const colors = [
      'from-orange-400 to-yellow-400',
      'from-blue-400 to-cyan-400',
      'from-green-400 to-emerald-400',
      'from-purple-400 to-pink-400',
      'from-red-400 to-orange-400',
      'from-indigo-400 to-purple-400',
    ];
    return colors[index % colors.length];
  };

  const stats = [
    { value: '₹50Cr+', label: 'Funds Raised' },
    { value: '10,000+', label: 'Backers' },
    { value: '500+', label: 'Projects Funded' },
    { value: '95%', label: 'Success Rate' },
  ];

  const testimonials = [
    {
      quote: "RaiseRealm's milestone-based funding gave our solar project the structure it needed. We've powered 50 villages and counting!",
      name: 'Priya Sharma',
      role: 'Founder',
      project: 'Solar Villages Initiative',
      initials: 'PS',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      quote: "The transparency and accountability on RaiseRealm built trust with our backers. We exceeded our goal in just 3 weeks.",
      name: 'Rajesh Kumar',
      role: 'Healthcare Innovator',
      project: 'Affordable Health Monitor',
      initials: 'RK',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      quote: "As a backer, I love knowing exactly how my contribution is being used. The milestone updates keep me engaged and confident.",
      name: 'Ananya Patel',
      role: 'Community Backer',
      project: 'Supporter of 15+ Projects',
      initials: 'AP',
      color: 'bg-green-100 text-green-600',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
          </div>
          
          {/* Content */}
          <div className={`relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Logo Container */}
            <div className="inline-flex items-center justify-center mb-6 sm:mb-8">
              <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl">
                <div className="w-16 h-16 sm:w-24 md:w-28 lg:w-32 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">
                  <img
                    src="/logo.png"
                    alt="RaiseRealm Logo"
                    className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-24 h-24 bg-white/20 rounded-xl items-center justify-center">
                    <span className="text-3xl font-bold text-white">R</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-3 sm:mb-4">
              RAISEREALM
            </h1>

            {/* Tagline */}
            <p className="text-sm sm:text-xl md:text-2xl font-medium text-blue-200 tracking-widest uppercase mb-4 sm:mb-6 px-2 sm:px-0">
              Fuel Vision Fund Future
            </p>

            {/* Description */}
            <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4 sm:px-0">
              Crowdfunding with accountability. Milestone-based funding that builds trust and creates real impact.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/create-project" 
                className="group px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Start Your Project
                <svg className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                to="/projects" 
                className="group px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
              >
                Explore Projects
                <svg className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-left">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8">
                Welcome to RaiseRealm
              </h2>
              
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Welcome to RaiseRealm, a milestone-driven crowdfunding platform built to transform bold ideas into measurable impact.
                </p>
                
                <p>
                  RaiseRealm was created with a simple belief: great ideas deserve structured support, not blind funding. We connect creators, innovators, and changemakers with a community of backers who believe in progress, transparency, and accountability.
                </p>
                
                <p>
                  Whether you're launching a tech product, building a social initiative, developing a creative project, or shaping the next big startup, RaiseRealm provides the framework to bring your vision to life. Our milestone-based funding system ensures that every contribution moves a project forward with clarity and purpose.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 py-8">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">For Creators</h3>
                    <p className="text-slate-600">
                      A platform to share your story, define clear goals, and build trust through progress updates and structured milestones.
                    </p>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">For Backers</h3>
                    <p className="text-slate-600">
                      Confidence, transparency, and visibility into how funds are being used every step of the way.
                    </p>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-slate-200">
                  <p className="text-2xl font-bold text-slate-900 mb-4">
                    This is more than crowdfunding.
                    <br />
                    <span className="text-primary-600">This is structured growth, community-powered innovation, and responsible funding combined.</span>
                  </p>
                  
                  <p className="text-xl text-slate-700 font-medium">
                    At RaiseRealm, we don't just fund ideas.
                    <br />
                    <span className="text-secondary-600">We fuel vision and fund the future.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Video Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Our Story in 60 Seconds
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Discover how RaiseRealm is transforming crowdfunding with transparency, accountability, and community
              </p>
            </div>
            
            {/* Video Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-800">
              <video
                className="w-full aspect-video"
                controls
                preload="metadata"
              >
<source src="/raiserealm-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* Impact + Projects Section */}
        <section className="py-20 lg:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                Projects Making a Difference
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                See how RaiseRealm is turning visions into reality, one milestone at a time.
              </p>
            </div>

            {/* Project Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Card Header with Gradient */}
                  <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                  
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${project.color} text-white`}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-slate-900">{project.raised} raised</span>
                        <span className="text-slate-500">of {project.goal}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${project.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="mt-1 text-right text-xs text-slate-500">
                        {project.progress}% funded
                      </div>
                    </div>

                    {/* Button */}
                    <button className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors">
                      Support This Project
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link 
                to="/projects"
                className="inline-flex items-center px-8 py-4 rounded-full bg-white border-2 border-slate-200 text-slate-900 font-semibold hover:border-primary-500 hover:text-primary-600 transition-all"
              >
                View All Projects
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                Stories from Our Community
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Hear from creators and backers who are building the future together.
              </p>
            </div>

            {/* Testimonial Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="group relative bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-8">
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-slate-700 text-lg leading-relaxed mb-8 italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Profile */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center font-bold text-lg`}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-primary-600 font-medium">
                        {testimonial.project}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of creators and backers who are building the future through milestone-based crowdfunding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/create-project" 
                className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-blue-50 transition-all shadow-lg"
              >
                Start Your Project
              </Link>
              <Link 
                to="/projects" 
                className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/10 transition-all"
              >
                Explore Projects
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
}
