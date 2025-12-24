
import React, { useState } from 'react';
import { getCompetitorAnalysis } from '../services/ai';
import { useStartup } from '../context/StartupContext';

export const MarketResearch: React.FC = () => {
  const { state } = useStartup();
  const [analyzing, setAnalyzing] = useState(false);
  const [competitorInsights, setCompetitorInsights] = useState<any[]>([]);

  const runAnalysis = async () => {
    setAnalyzing(true);
    const result = await getCompetitorAnalysis(
      state.profile.name,
      state.profile.tagline,
      "Luxury Ethical Goods / Blockchain"
    );
    setCompetitorInsights(result.competitors || []);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-12 pb-20 pt-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="max-w-xl">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Market Research</h1>
          <p className="text-gray-400 font-light tracking-wide">Strategic verification of demand, competitive benchmarks, and opportunity sizing.</p>
        </div>
        <button 
          onClick={runAnalysis}
          disabled={analyzing}
          className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-xl flex items-center gap-3 ${analyzing ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#1E1E1E] text-white hover:bg-black active:scale-95'}`}
        >
          {analyzing ? (
            <>
              <div className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
              Analyzing Sector...
            </>
          ) : (
            'Deep AI Analysis'
          )}
        </button>
      </header>

      {/* AI Analysis Results */}
      {competitorInsights.length > 0 && (
        <section className="animate-fade-in space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-1 h-1 rounded-full bg-indigo-600"></div>
             <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">AI Strategic Competitor Briefing</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitorInsights.map((comp, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] soft-shadow border border-indigo-50 hover:border-indigo-200 transition-all duration-500 group">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-serif font-bold text-gray-900">{comp.name}</h4>
                  <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-[10px] text-indigo-400 font-bold">{i+1}</div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Advantage</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{comp.advantage}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-red-400 uppercase tracking-widest mb-1">Strategic Risk</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{comp.risk}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-50">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Counter-Strategy</p>
                    <p className="text-xs font-medium text-gray-900 italic leading-relaxed">"{comp.counterStrategy}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Market Sizing (TAM/SAM/SOM) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-12 rounded-[50px] soft-shadow border border-gray-50 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-8">
              <h3 className="text-xl font-serif font-bold text-gray-900">Market Sizing</h3>
              <div className="space-y-6">
                {[
                  { label: 'TAM (Total)', val: '$42B', sub: 'Global Luxury Leather' },
                  { label: 'SAM (Serviceable)', val: '$8.4B', sub: 'Ethical/Sustainable Segment' },
                  { label: 'SOM (Obtainable)', val: '$120M', sub: 'Year 3 Target' }
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-indigo-100' : i === 1 ? 'bg-indigo-300' : 'bg-indigo-600'}`}></div>
                    <div>
                      <p className="text-2xl font-serif font-bold text-gray-900">{m.val}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{m.label} • {m.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute w-full h-full border border-indigo-100 rounded-full opacity-20"></div>
              <div className="absolute w-4/5 h-4/5 border border-indigo-300 rounded-full opacity-40"></div>
              <div className="absolute w-1/2 h-1/2 bg-indigo-600/10 border-2 border-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-[10px] font-bold text-indigo-900 uppercase">Target</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1E1E1E] text-white p-10 rounded-[50px] flex flex-col justify-between group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-20 opacity-10 bg-indigo-500 blur-3xl rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
          <div className="relative z-10">
            <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-4">AI Signal</h4>
            <h3 className="text-2xl font-serif font-bold leading-tight mb-4">Competitor Shift Detected.</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Hermès has filed 3 patents related to lab-grown mycelium leather in Q1. The window for "first-mover" in ledger-verified luxury is narrowing.
            </p>
          </div>
          <button className="relative z-10 w-full mt-8 py-4 bg-white text-gray-900 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl">
            Update Strategy
          </button>
        </div>
      </section>

      {/* Competitor Benchmarking */}
      <section className="space-y-6">
        <h3 className="text-xl font-serif font-bold text-gray-900 px-2">Competitor Benchmarking</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Heritage Luxury', price: 'Premium', speed: 'Slow', advantage: 'Legacy', risk: 'Opaqueness' },
            { name: 'Direct-to-Consumer', price: 'Value', speed: 'Fast', advantage: 'Price', risk: 'Low Prestige' },
            { name: 'Maison Julian', price: 'Ultra-Premium', speed: 'Agile', advantage: 'Ledger Proof', risk: 'Market Debut' }
          ].map((c, i) => (
            <div key={i} className={`p-8 rounded-[40px] soft-shadow border transition-all duration-500 group cursor-default ${i === 2 ? 'bg-white border-indigo-200 ring-1 ring-indigo-50' : 'bg-white border-gray-50 hover:border-indigo-100'}`}>
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-lg font-serif font-bold text-gray-900">{c.name}</h4>
                {i === 2 && <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">Your Venture</span>}
              </div>
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Price Point</p>
                  <p className="text-sm font-medium text-gray-700">{c.price}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Execution</p>
                  <p className="text-sm font-medium text-gray-700">{c.speed}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Strategic Moat</p>
                  <p className="text-sm font-medium text-indigo-600">{c.advantage}</p>
                </div>
                <div className="col-span-2 border-t border-gray-50 pt-4">
                  <p className="text-[9px] font-bold text-red-300 uppercase tracking-widest mb-1">Key Risk</p>
                  <p className="text-sm font-medium text-red-500/70">{c.risk}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
