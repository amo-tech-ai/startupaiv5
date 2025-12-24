
import React, { useEffect, useState } from 'react';

export const StartupProfile: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax offset calculation
  const parallaxTranslateY = scrollY * 0.2;

  return (
    <div className="relative space-y-12 pb-20 pt-6 min-h-screen">
      {/* Parallax Decorative Background Element */}
      <div 
        className="absolute top-0 right-0 -z-10 opacity-[0.03] pointer-events-none select-none"
        style={{ transform: `translateY(${parallaxTranslateY}px)` }}
      >
        <h1 className="text-[40rem] font-serif font-bold leading-none select-none">S</h1>
      </div>

      <header className="relative z-10">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2 animate-fade-in">Startup Profile</h1>
        <p className="text-gray-400 font-light">The foundational identity and narrative of your venture.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Identity Card */}
          <section className="bg-white p-8 rounded-[40px] soft-shadow border border-gray-50 space-y-8 transition-all duration-500 hover:shadow-2xl hover:border-indigo-100 group">
            <div className="flex items-start justify-between">
               <div className="flex gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-100 to-indigo-50 border border-indigo-200/20 flex items-center justify-center transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
                    <span className="text-3xl font-serif font-bold text-indigo-900">M</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif font-semibold text-gray-900">Maison Julian</h2>
                    <p className="text-sm text-indigo-600 italic font-medium mt-1">"The Future of Conscientious Luxury"</p>
                  </div>
               </div>
               <button className="text-[10px] font-bold bg-gray-50 px-6 py-2.5 rounded-full uppercase tracking-widest hover:bg-[#1E1E1E] hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm">
                 Edit Identity
               </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
               <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Core Mission</h4>
                  <p className="text-sm text-gray-700 leading-relaxed font-light transition-colors group-hover:text-gray-900">
                    To digitize the bespoke luxury experience while maintaining absolute carbon neutrality through verified ledger tracking.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Primary Market</h4>
                  <p className="text-sm text-gray-700 leading-relaxed font-light transition-colors group-hover:text-gray-900">
                    High Net Worth Millennials (28-42) seeking ethical alternatives to traditional luxury heritage brands.
                  </p>
               </div>
            </div>
          </section>

          {/* Traction Section */}
          <section className="bg-white p-10 rounded-[40px] soft-shadow border border-gray-50">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-serif font-semibold text-gray-900">Traction & Proof</h3>
               <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1.5">
                 <span className="w-1 h-1 rounded-full bg-green-500"></span>
                 Verified Data
               </span>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Waitlist', val: '12.4k', trend: '↑ 12%' },
                  { label: 'LOIs', val: '8', trend: 'Stable' },
                  { label: 'NPS', val: '74', trend: '↑ 4%' }
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50/50 p-8 rounded-3xl text-center transition-all duration-500 hover:bg-white hover:soft-shadow hover:scale-[1.03] group cursor-default">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 group-hover:text-indigo-400 transition-colors">{stat.label}</p>
                    <p className="text-3xl font-serif font-bold text-gray-900 mb-1">{stat.val}</p>
                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">{stat.trend}</p>
                  </div>
                ))}
             </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Founder Network */}
          <section className="bg-indigo-50/30 p-8 rounded-[40px] border border-indigo-100/30 transition-all hover:bg-indigo-50/50">
            <h3 className="text-lg font-serif font-semibold mb-6 text-indigo-900">Founder Network</h3>
            <div className="space-y-4">
              {[
                { name: 'Julian Chen', role: 'CEO & Head Designer', id: '1' },
                { name: 'Elena Rossi', role: 'Product Lead', id: '2' }
              ].map((founder, i) => (
                <div 
                  key={founder.id} 
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl soft-shadow border border-white transition-all duration-300 hover:translate-x-2 group cursor-pointer"
                >
                  <div className="relative">
                    <img 
                      src={`https://picsum.photos/seed/founder${founder.id}/80/80`} 
                      className="w-12 h-12 rounded-full border-2 border-indigo-100 object-cover" 
                      alt={founder.name}
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{founder.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{founder.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-indigo-100 rounded-2xl text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:bg-white hover:text-indigo-600 transition-all duration-300">
              Invite Partner
            </button>
          </section>

          {/* Connections Card */}
          <section className="bg-white p-8 rounded-[40px] soft-shadow border border-gray-50">
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Connections</h3>
             <div className="space-y-3">
               {[
                 { label: 'Website', url: 'maisonjulian.com' },
                 { label: 'LinkedIn', url: 'linkedin.com/co/maisonjulian' },
                 { label: 'Instagram', url: '@maisonjulian' }
               ].map((link, idx) => (
                 <button 
                  key={idx}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:soft-shadow hover:border-indigo-100 transition-all duration-300 group"
                 >
                   <div className="flex flex-col items-start">
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight group-hover:text-indigo-400 transition-colors">{link.label}</span>
                     <span className="text-xs font-medium text-gray-600">{link.url}</span>
                   </div>
                   <svg className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                   </svg>
                 </button>
               ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};
