
import React, { useState, useEffect } from 'react';
import { useStartup } from '../context/StartupContext';
import { getGTMStrategy } from '../services/ai';

export const GTM: React.FC = () => {
  const { state } = useStartup();
  const [loading, setLoading] = useState(false);
  const [gtm, setGtm] = useState<any>(null);

  const generateGTM = async () => {
    setLoading(true);
    const result = await getGTMStrategy(state);
    if (result) setGtm(result);
    setLoading(false);
  };

  useEffect(() => {
    generateGTM();
  }, []);

  return (
    <div className="space-y-12 pb-20 pt-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">GTM Strategy</h1>
          <p className="text-gray-400 font-light tracking-wide">Mapping the zero-to-one trajectory for {state.profile.name}.</p>
        </div>
        <button 
          onClick={generateGTM}
          disabled={loading}
          className="bg-[#1E1E1E] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl disabled:opacity-50"
        >
          {loading ? 'Consulting Strategist...' : 'Regenerate Plan'}
        </button>
      </header>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center space-y-4">
           <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
           <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest animate-pulse">Calculating Acquisition Logic...</p>
        </div>
      ) : gtm && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          {/* ICP Definition */}
          <section className="bg-white p-10 rounded-[50px] border border-gray-50 soft-shadow space-y-8 h-full">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">Ideal Customer Profile</h3>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-xl">💎</div>
                  <div>
                      <p className="text-sm font-bold text-gray-900">{gtm.icp.title}</p>
                      <p className="text-[9px] text-gray-400 uppercase font-medium">Primary Segment</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  {gtm.icp.description}
                </p>
                <div className="pt-4 flex flex-wrap gap-2">
                  {gtm.icp.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-gray-50 text-[9px] font-bold text-gray-400 rounded-full uppercase tracking-tight">{tag}</span>
                  ))}
                </div>
            </div>
          </section>

          {/* Messaging Framework */}
          <section className="bg-indigo-50/30 p-10 rounded-[50px] border border-indigo-100/30 space-y-8 h-full">
            <h3 className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest border-b border-indigo-100/20 pb-4">Messaging Pillars</h3>
            <div className="space-y-6">
                {gtm.pillars.map((p: any, i: number) => (
                  <div key={i} className="p-4 bg-white/50 rounded-2xl border border-white">
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">{p.title}</p>
                    <p className="text-xs text-gray-600 font-light leading-relaxed">{p.description}</p>
                  </div>
                ))}
            </div>
          </section>

          {/* Channels Heatmap */}
          <section className="bg-white p-10 rounded-[50px] border border-gray-50 soft-shadow space-y-8 h-full">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">Channel Performance</h3>
            <div className="space-y-6">
                {gtm.channels.map((ch: any, i: number) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                        <span className="text-gray-900">{ch.name}</span>
                        <span className="text-gray-400">{ch.efficiency}% Efficiency</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div style={{ width: `${ch.efficiency}%` }} className="h-full bg-indigo-600 rounded-full transition-all duration-1000"></div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </div>
      )}

      {/* Launch Timeline */}
      <section className="bg-white p-12 rounded-[60px] border border-gray-50 soft-shadow relative overflow-hidden">
         <h3 className="text-xl font-serif font-bold text-gray-900 mb-10">Launch Trajectory</h3>
         <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-100 -translate-y-1/2 -z-10"></div>
            {[
              { l: 'Alpha Waitlist', active: true },
              { l: 'Private Beta', active: true },
              { l: 'Public Debut', active: false },
              { l: 'Global Expansion', active: false }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group">
                 <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${step.active ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg' : 'bg-white border-gray-100 text-gray-300'}`}>
                    <span className="text-[10px] font-bold">{i + 1}</span>
                 </div>
                 <span className={`text-[10px] font-bold uppercase tracking-widest ${step.active ? 'text-gray-900' : 'text-gray-300'}`}>{step.l}</span>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};
