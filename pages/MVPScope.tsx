
import React, { useState } from 'react';

export const MVPScope: React.FC = () => {
  const [features, setFeatures] = useState([
    { id: '1', title: 'Carbon Ledger API', category: 'Backend', status: 'in', priority: 'critical' },
    { id: '2', title: 'Luxury Brand Dashboard', category: 'UI', status: 'in', priority: 'high' },
    { id: '3', title: 'NFT Certificates', category: 'Web3', status: 'out', priority: 'low' },
    { id: '4', title: 'Mobile App (iOS/Android)', category: 'Mobile', status: 'out', priority: 'medium' },
  ]);

  const toggleStatus = (id: string) => {
    setFeatures(features.map(f => f.id === id ? { ...f, status: f.status === 'in' ? 'out' : 'in' } : f));
  };

  return (
    <div className="space-y-12 pb-20 pt-6">
      <header className="max-w-xl">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">MVP Scope</h1>
        <p className="text-gray-400 font-light">Defining the absolute minimum requirements for the Maison Julian market debut.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* In-Scope Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">In-Scope (Critical Path)</h3>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{features.filter(f => f.status === 'in').length} Items</span>
          </div>
          <div className="space-y-3">
            {features.filter(f => f.status === 'in').map(feature => (
              <div key={feature.id} className="bg-white p-6 rounded-[30px] soft-shadow border border-gray-50 flex items-center justify-between group hover:border-indigo-100 transition-all cursor-pointer">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-tight">{feature.category}</span>
                    <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                    <span className="text-[9px] font-bold text-red-400 uppercase tracking-tight">{feature.priority}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{feature.title}</p>
                </div>
                <button onClick={() => toggleStatus(feature.id)} className="text-[9px] font-bold text-gray-300 hover:text-red-400 uppercase tracking-widest transition-colors opacity-0 group-hover:opacity-100">Remove</button>
              </div>
            ))}
          </div>
        </section>

        {/* Out-of-Scope Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Excluded (V2 / Later)</h3>
            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{features.filter(f => f.status === 'out').length} Items</span>
          </div>
          <div className="space-y-3">
            {features.filter(f => f.status === 'out').map(feature => (
              <div key={feature.id} className="bg-white/50 p-6 rounded-[30px] border border-dashed border-gray-100 flex items-center justify-between group grayscale hover:grayscale-0 transition-all cursor-pointer">
                <div>
                   <p className="text-sm font-bold text-gray-400 group-hover:text-gray-900 transition-colors">{feature.title}</p>
                </div>
                <button onClick={() => toggleStatus(feature.id)} className="text-[9px] font-bold text-indigo-400 hover:text-indigo-600 uppercase tracking-widest transition-colors opacity-0 group-hover:opacity-100">Move to In-Scope</button>
              </div>
            ))}
            <div className="p-6 rounded-[30px] border border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-[10px] font-bold uppercase tracking-widest hover:border-indigo-200 hover:text-indigo-400 transition-all cursor-pointer">
               + Add Exclusion Idea
            </div>
          </div>
        </section>
      </div>

      {/* Success Metrics Strip */}
      <section className="bg-indigo-900 rounded-[50px] p-12 text-white relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-20 opacity-10 bg-white rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
         <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="max-w-xs">
               <h3 className="text-2xl font-serif font-bold mb-2">Success Definition</h3>
               <p className="text-indigo-200 text-xs font-light leading-relaxed italic">The MVP is successful if we reach these benchmarks with the current scope.</p>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8">
               {[
                 { l: 'Bespoke Onboarding', v: '< 5 min' },
                 { l: 'Data Precision', v: '99.9%' },
                 { l: 'Market Interest', v: '10 LOIs' }
               ].map((m, i) => (
                 <div key={i} className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-400">{m.l}</p>
                    <p className="text-2xl font-serif font-bold">{m.v}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};
