
import React from 'react';

export const Roadmap: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      <header>
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Product Roadmap</h1>
        <p className="text-gray-400">High-level visual summary that maps out the evolution of Maison Julian.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['Now', 'Next', 'Later'].map((column, idx) => (
          <div key={idx} className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">{column}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-50 text-gray-400 rounded-full">
                {idx === 0 ? '3 Items' : idx === 1 ? '4 Items' : '12 Items'}
              </span>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl soft-shadow border border-gray-50 hover:border-indigo-100 transition-all group cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sprint 12</span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2 group-hover:text-indigo-900 transition-colors">Digital Ledger Integration</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Connecting production API to the on-chain certification engine.</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                     <div className="flex -space-x-2">
                        {[1, 2].map((_, j) => (
                           <img key={j} src={`https://picsum.photos/seed/${j + 100}/20/20`} className="w-5 h-5 rounded-full border-2 border-white" />
                        ))}
                     </div>
                     <span className="text-[9px] font-bold text-indigo-500">80%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
