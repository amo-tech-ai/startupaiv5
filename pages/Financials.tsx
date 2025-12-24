
import React, { useState } from 'react';
import { useStartup } from '../context/StartupContext';
import { stressTestFinancials } from '../services/ai';

export const Financials: React.FC = () => {
  const { state } = useStartup();
  const [isTesting, setIsTesting] = useState(false);
  const [scenarios, setScenarios] = useState<any[]>([]);

  const runStressTest = async () => {
    setIsTesting(true);
    const result = await stressTestFinancials(state.financials);
    setScenarios(result.scenarios || []);
    setIsTesting(false);
  };

  return (
    <div className="space-y-12 pb-32 pt-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Financials</h1>
          <p className="text-gray-400 font-light tracking-wide">Modeling the economics of {state.profile.name}.</p>
        </div>
        <button 
          onClick={runStressTest}
          disabled={isTesting}
          className="bg-indigo-900 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl disabled:opacity-50"
        >
          {isTesting ? 'Simulating Chaos...' : 'Run AI Stress Test'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-10 rounded-[40px] soft-shadow border border-gray-50">
           <h3 className="text-xl font-serif font-bold text-gray-900 mb-8">Runway Projection</h3>
           <div className="h-48 flex items-end gap-3 px-4">
              {[40, 65, 55, 80, 70, 45, 30].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-50 rounded-t-xl group relative cursor-pointer hover:bg-indigo-100 transition-colors">
                   <div style={{ height: `${h}%` }} className="w-full bg-indigo-600 rounded-t-xl opacity-80 group-hover:opacity-100 transition-opacity"></div>
                   <div className="absolute -bottom-6 left-0 right-0 text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest">M{i+1}</div>
                </div>
              ))}
           </div>
           <div className="mt-12 flex justify-between items-center bg-gray-50 p-6 rounded-2xl">
              <div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Est. Exhaustion Date</p>
                 <p className="text-xl font-serif font-bold text-red-500">Oct 24, 2025</p>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cash on Hand</p>
                 <p className="text-xl font-serif font-bold text-gray-900">$240,000</p>
              </div>
           </div>
        </section>

        <section className="space-y-6">
           {[
             { label: 'Monthly Burn', val: `$${state.financials.burn.toLocaleString()}`, sub: '+2% trend' },
             { label: 'CAC (Blended)', val: `$${state.financials.cac.toFixed(2)}`, sub: 'Target: <$30' },
             { label: 'Runway', val: `${state.financials.runway} Mo`, sub: 'Critical Level: 6 Mo' }
           ].map((item, i) => (
             <div key={i} className="bg-white p-8 rounded-[30px] soft-shadow border border-gray-50 flex items-center justify-between group hover:border-indigo-100 transition-all">
                <div>
                   <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</h4>
                   <p className="text-3xl font-serif font-bold text-gray-900">{item.val}</p>
                </div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full">{item.sub}</span>
             </div>
           ))}
        </section>
      </div>

      {/* Stress Test Scenarios Results */}
      {scenarios.length > 0 && (
        <section className="animate-fade-in space-y-6">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Simulation Results: Risk Exposure</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scenarios.map((s, i) => (
                <div key={i} className="bg-[#1E1E1E] text-white p-8 rounded-[40px] shadow-2xl space-y-6 relative overflow-hidden group">
                   <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                   <div>
                      <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Scenario {i+1}</p>
                      <h4 className="text-lg font-serif font-bold">{s.name}</h4>
                   </div>
                   <div>
                      <p className="text-[9px] font-bold text-red-400 uppercase tracking-widest mb-1">Impact</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{s.impact}</p>
                   </div>
                   <div className="pt-4 border-t border-white/5">
                      <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2">Mitigation Strategy</p>
                      <p className="text-xs italic font-medium leading-relaxed">"{s.mitigation}"</p>
                   </div>
                </div>
              ))}
           </div>
        </section>
      )}
    </div>
  );
};
