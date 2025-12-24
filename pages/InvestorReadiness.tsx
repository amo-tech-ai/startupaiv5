
import React, { useState, useEffect } from 'react';
import { getInvestorReadiness } from '../services/ai';
import { useStartup } from '../context/StartupContext';

export const InvestorReadiness: React.FC = () => {
  const { state } = useStartup();
  const [loading, setLoading] = useState(false);
  const [readiness, setReadiness] = useState<any>(null);

  const fetchReadiness = async () => {
    setLoading(true);
    const result = await getInvestorReadiness(state);
    setReadiness(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchReadiness();
  }, []);

  return (
    <div className="space-y-12 pb-20 pt-6">
      <header className="flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="max-w-xl space-y-4">
          <h1 className="text-4xl font-serif font-bold text-gray-900">Investor Readiness</h1>
          <p className="text-gray-400 font-light text-lg">Are you actually fundable? The ruthless VC simulation.</p>
        </div>
        
        {readiness && !loading && (
          <div className="relative group cursor-pointer animate-fade-in">
             <svg className="w-48 h-48 transform -rotate-90">
               <circle cx="96" cy="96" r="80" className="stroke-gray-100 fill-none" strokeWidth="10" />
               <circle cx="96" cy="96" r="80" className="stroke-indigo-600 fill-none transition-all duration-1000 ease-out" strokeWidth="10" strokeDasharray="502" strokeDashoffset={502 * (1 - readiness.score / 100)} />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-serif font-bold text-gray-900">{readiness.score}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Score</span>
             </div>
          </div>
        )}
      </header>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center space-y-4">
           <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
           <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest animate-pulse">VC Agent Simulating Board Meeting...</p>
        </div>
      ) : readiness && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
          {/* Critical Gaps */}
          <section className="bg-white p-10 rounded-[50px] border border-red-50 soft-shadow space-y-8">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Critical Gaps (Red Flags)</h3>
             </div>
             <div className="space-y-4">
                {readiness.gaps.map((gap: string, i: number) => (
                  <div key={i} className="flex gap-4 p-5 bg-red-50/30 rounded-2xl border border-red-100/20">
                     <span className="text-red-400 font-serif font-bold">!</span>
                     <p className="text-xs text-red-900/60 leading-relaxed font-medium">{gap}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Suggested Milestones */}
          <section className="bg-white p-10 rounded-[50px] border border-gray-50 soft-shadow space-y-8">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Path to Fundability</h3>
             </div>
             <div className="space-y-4">
                {readiness.milestones.map((milestone: string, i: number) => (
                  <div key={i} className="flex gap-4 p-5 bg-green-50/30 rounded-2xl border border-green-100/20 group hover:scale-[1.02] transition-transform cursor-pointer">
                     <span className="text-green-600 font-serif font-bold">✓</span>
                     <p className="text-xs text-green-900/60 leading-relaxed font-medium">{milestone}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Tough VC Questions */}
          <section className="lg:col-span-2 bg-[#1E1E1E] text-white p-12 rounded-[60px] relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-40 opacity-5 bg-indigo-500 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
             <div className="relative z-10 space-y-12">
                <div className="text-center">
                   <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4 block">Interview Simulation</span>
                   <h2 className="text-3xl font-serif font-bold italic">"Answer the unanswerable."</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   {readiness.questions.map((q: string, i: number) => (
                     <div key={i} className="bg-white/5 p-8 rounded-[40px] border border-white/10 hover:border-white/20 transition-all">
                        <p className="text-lg font-serif font-light leading-relaxed italic mb-8">"{q}"</p>
                        <button className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest border-b border-indigo-400/30 pb-1">Consult Strategy Chat</button>
                     </div>
                   ))}
                </div>
             </div>
          </section>
        </div>
      )}
    </div>
  );
};
