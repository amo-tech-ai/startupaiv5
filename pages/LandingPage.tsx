
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#FDFCFB] min-h-screen selection:bg-indigo-100">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-10 h-20 flex items-center justify-between ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : ''}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-900 rounded-sm flex items-center justify-center">
            <span className="text-white font-serif font-bold text-xs">S</span>
          </div>
          <span className="text-xl font-serif font-semibold tracking-tight">StartupAI</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <a href="#how-it-works" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-indigo-900 transition-colors">How it Works</a>
          <a href="#features" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-indigo-900 transition-colors">Features</a>
          <NavLink to="/dashboard" className="bg-[#1E1E1E] text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg">Enter App</NavLink>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="flex-1 space-y-8 animate-fade-in">
          <h1 className="text-7xl font-serif font-bold text-gray-900 leading-[1.1]">
            Turn ideas into <br />
            <span className="italic text-indigo-900/40">investor-ready</span> <br />
            startups.
          </h1>
          <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-light">
            StartupAI is an editorial-grade operating system that helps founders 
            validate ideas, plan products, and raise capital — step by step.
          </p>
          <div className="flex items-center gap-6 pt-4">
            <NavLink to="/dashboard" className="bg-indigo-900 text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-indigo-800 transition-all shadow-xl">Get Started</NavLink>
            <a href="#how-it-works" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors underline underline-offset-8">See How It Works</a>
          </div>
        </div>
        <div className="flex-1 relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="absolute -inset-10 bg-indigo-50/50 rounded-full blur-3xl opacity-50"></div>
          <div className="relative bg-white p-8 rounded-[40px] soft-shadow border border-gray-100 transform hover:rotate-2 transition-transform duration-700">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-900 font-serif font-bold">M</div>
              <div className="space-y-1">
                <div className="h-2 w-32 bg-gray-100 rounded-full"></div>
                <div className="h-1.5 w-20 bg-gray-50 rounded-full"></div>
              </div>
            </div>
            <div className="space-y-6">
               <div className="h-4 bg-gray-50 rounded-full w-full"></div>
               <div className="h-4 bg-gray-50 rounded-full w-5/6"></div>
               <div className="h-4 bg-gray-100 rounded-full w-4/6"></div>
               <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="h-24 bg-indigo-50/30 rounded-2xl border border-indigo-50"></div>
                  <div className="h-24 bg-gray-50 rounded-2xl"></div>
               </div>
            </div>
            <div className="mt-10 flex justify-end">
               <div className="px-4 py-2 bg-indigo-900 rounded-full text-[10px] text-white font-bold uppercase tracking-widest">Intelligence Live</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-10 bg-white border-y border-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <h2 className="text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">Your calm, intelligent <br /> co-founder.</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                StartupAI combines structured planning, deep market research, and quiet intelligence to guide founders from spark to funding.
              </p>
              <blockquote className="border-l-2 border-indigo-100 pl-8 py-2 italic text-gray-400">
                "We provide the strategic framework so you can focus on the creative execution. No chaos, just clarity."
              </blockquote>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
             <div className="w-full max-w-md aspect-square bg-[#FDFCFB] rounded-[60px] soft-shadow border border-gray-50 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="z-10 text-center space-y-4">
                   <div className="w-16 h-16 bg-white rounded-2xl soft-shadow mx-auto flex items-center justify-center text-indigo-500">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                   </div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Strategic Alignment</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em] mb-4 block">The Ecosystem</span>
          <h2 className="text-5xl font-serif font-bold text-gray-900">Built for every stage of growth.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Market Validation', desc: 'Verify demand with AI-powered trend analysis and competitor benchmarks.', icon: '📊' },
            { title: 'Lean Canvas', desc: 'Draft your business model with strategic blocks that detect weaknesses automatically.', icon: '🏗️' },
            { title: 'Product Roadmaps', desc: 'Visual milestones that adapt to your burn rate and development velocity.', icon: '🗺️' },
            { title: 'PRDs & Tech Stack', desc: 'Clear, structured documentation generated from your vision and requirements.', icon: '🛠️' },
            { title: 'Financial Projections', desc: 'Unit economics and runway modeling that investors actually trust.', icon: '📈' },
            { title: 'Pitch Decks', desc: 'Narrative-first slide builders that align your traction with market demand.', icon: '🎙️' },
          ].map((feature, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-50 soft-shadow hover:-translate-y-2 transition-all duration-500 group">
              <div className="text-3xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">{feature.icon}</div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works (Flow) */}
      <section id="how-it-works" className="py-32 px-10 bg-[#1E1E1E] text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 p-40 opacity-10 blur-3xl bg-indigo-500 rounded-full"></div>
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-24">
               <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4 block">Workflow</span>
               <h2 className="text-5xl font-serif font-bold">The path from idea to raise.</h2>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
               {[
                 { step: '01', title: 'Profile', desc: 'Define identity' },
                 { step: '02', title: 'Canvas', desc: 'Map strategy' },
                 { step: '03', title: 'Market', desc: 'Validate proof' },
                 { step: '04', title: 'MVP', desc: 'Scope build' },
                 { step: '05', title: 'Pitch', desc: 'Close round' },
               ].map((step, i) => (
                 <React.Fragment key={i}>
                   <div className="flex flex-col items-center text-center space-y-4 group">
                      <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold text-indigo-400 group-hover:border-indigo-400 transition-colors duration-500">
                         {step.step}
                      </div>
                      <h4 className="text-lg font-serif font-semibold">{step.title}</h4>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500">{step.desc}</p>
                   </div>
                   {i < 4 && <div className="hidden lg:block w-16 h-px bg-white/10"></div>}
                 </React.Fragment>
               ))}
            </div>
         </div>
      </section>

      {/* Statistics & Proof */}
      <section className="py-32 px-10 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { val: '92%', label: 'Clearer direction' },
              { val: '3x', label: 'Faster planning' },
              { val: '40%', label: 'Fewer MVP errors' },
              { val: '2x', label: 'Investor readiness' },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                 <h3 className="text-6xl font-serif font-bold text-gray-900">{stat.val}</h3>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-10">
         <div className="max-w-5xl mx-auto bg-[#1E1E1E] rounded-[60px] p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
            <h2 className="text-6xl font-serif font-bold text-white mb-8">Build with clarity. <br /> Raise with confidence.</h2>
            <p className="text-gray-400 mb-12 max-w-md mx-auto text-lg font-light">Join the next generation of founders building on the StartupAI Operating System.</p>
            <NavLink to="/dashboard" className="bg-white text-gray-900 px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl inline-block">Start Planning Your Startup</NavLink>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-10 border-t border-gray-100">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="space-y-6">
               <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-indigo-900 rounded-sm flex items-center justify-center">
                   <span className="text-white font-serif font-bold text-[8px]">S</span>
                 </div>
                 <span className="text-lg font-serif font-semibold tracking-tight">StartupAI</span>
               </div>
               <p className="text-xs text-gray-400 leading-relaxed font-light">Built for founders, <br /> by strategic co-founders.</p>
            </div>
            <div>
               <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-900 mb-6">Product</h5>
               <ul className="space-y-4 text-xs text-gray-500">
                  <li><NavLink to="/dashboard" className="hover:text-indigo-900 font-medium text-indigo-600">App Dashboard</NavLink></li>
                  <li><a href="#how-it-works" className="hover:text-indigo-900">How it Works</a></li>
                  <li><a href="#features" className="hover:text-indigo-900">Features</a></li>
                  <li><a href="#" className="hover:text-indigo-900">Pricing</a></li>
               </ul>
            </div>
            <div>
               <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-900 mb-6">Company</h5>
               <ul className="space-y-4 text-xs text-gray-500">
                  <li><a href="#" className="hover:text-indigo-900">About</a></li>
                  <li><a href="#" className="hover:text-indigo-900">Blog</a></li>
                  <li><a href="#" className="hover:text-indigo-900">Careers</a></li>
               </ul>
            </div>
            <div>
               <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-900 mb-6">Legal</h5>
               <ul className="space-y-4 text-xs text-gray-500">
                  <li><a href="#" className="hover:text-indigo-900">Privacy</a></li>
                  <li><a href="#" className="hover:text-indigo-900">Terms</a></li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">
            <p>© StartupAI — Built for founders.</p>
            <div className="flex gap-6">
               <a href="#" className="hover:text-gray-900">Twitter</a>
               <a href="#" className="hover:text-gray-900">LinkedIn</a>
            </div>
         </div>
      </footer>
    </div>
  );
};
