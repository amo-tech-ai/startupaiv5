
import React, { useState, useEffect } from 'react';
import { getMarketIntelligence } from '../services/ai';
import { useStartup } from '../context/StartupContext';

export const MarketIntel: React.FC = () => {
  const { state } = useStartup();
  const [loading, setLoading] = useState(false);
  const [intel, setIntel] = useState<any>(null);

  const fetchIntel = async () => {
    setLoading(true);
    const result = await getMarketIntelligence(state);
    setIntel(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchIntel();
  }, []);

  return (
    <div className="space-y-12 pb-20 pt-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Market Intelligence</h1>
          <p className="text-gray-400 font-light tracking-wide italic">"Seeing what others miss in the competitive landscape."</p>
        </div>
        <button 
          onClick={fetchIntel}
          disabled={loading}
          className="bg-[#1E1E1E] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl disabled:opacity-50"
        >
          {loading ? 'Analyzing Market...' : 'Run Deep Scan'}
        </button>
      </header>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center space-y-4">
           <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
           <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest animate-pulse">Consulting Global Signals...</p>
        </div>
      ) : intel && (
        <div className="space-y-12 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Market Signals */}
            <section className="bg-white p-10 rounded-[50px] border border-gray-50 soft-shadow space-y-8">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Macro Signals</h3>
               </div>
               <div className="space-y-4">
                  {intel.signals.map((signal: string, i: number) => (
                    <div key={i} className="flex gap-4 p-5 bg-gray-50/50 rounded-2xl hover:bg-white hover:soft-shadow transition-all group">
                       <span className="text-indigo-400 font-serif font-bold opacity-30 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                       <p className="text-xs text-gray-600 leading-relaxed font-light">{signal}</p>
                    </div>
                  ))}
               </div>
            </section>

            {/* Underserved Niches */}
            <section className="bg-indigo-900 text-white p-10 rounded-[50px] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-24 opacity-5 bg-white blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
               <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                     <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">Underserved Niches</h3>
                  </div>
                  <div className="space-y-4">
                     {intel.niches.map((niche: string, i: number) => (
                       <div key={i} className="p-6 border border-white/10 rounded-2xl hover:bg-white/5 transition-all">
                          <p className="text-sm font-medium leading-relaxed">{niche}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Pivot Recommendation */}
            <section className="lg:col-span-2 bg-white p-12 rounded-[60px] border border-indigo-100/30 flex flex-col md:flex-row items-center gap-12">
               <div className="w-32 h-32 rounded-full bg-indigo-50 flex items-center justify-center text-4xl soft-shadow border border-indigo-100/50 shrink-0">
                  ✨
               </div>
               <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-gray-900 italic">Strategic Pivot Proposal</h3>
                  <p className="text-lg text-gray-500 font-light leading-relaxed">
                    {intel.pivotRecommendation}
                  </p>
                  <div className="pt-4 flex gap-4">
                     <button className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-6 py-2 rounded-xl uppercase tracking-widest hover:bg-indigo-100 transition-all">Accept Recommendation</button>
                     <button className="text-[10px] font-bold text-gray-400 border border-gray-100 px-6 py-2 rounded-xl uppercase tracking-widest hover:bg-white transition-all">Dismiss</button>
                  </div>
               </div>
            </section>
          </div>

          {/* Search Grounding Sources */}
          {intel.sources && intel.sources.length > 0 && (
            <section className="bg-gray-50/50 p-10 rounded-[40px] border border-gray-100 space-y-6">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Intelligence Sources (Grounding)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {intel.sources.map((source: any, i: number) => (
                  <a 
                    key={i} 
                    href={source.web?.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-white border border-gray-100 rounded-2xl soft-shadow hover:border-indigo-400 transition-all group overflow-hidden"
                  >
                    <p className="text-xs font-bold text-gray-900 truncate mb-1 group-hover:text-indigo-600 transition-colors">{source.web?.title || 'Source Reference'}</p>
                    <p className="text-[9px] text-gray-400 truncate">{source.web?.uri}</p>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};
