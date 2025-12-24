
import React from 'react';

const docCategories = ['Strategic', 'Legal', 'Product', 'Investment'];

export const Documents: React.FC = () => {
  return (
    <div className="space-y-12 pb-20 pt-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Startup Documents</h1>
          <p className="text-gray-400 font-light">The secure repository for your venture's intellectual property and strategic drafts.</p>
        </div>
        <button className="bg-[#1E1E1E] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl">Draft New Doc</button>
      </header>

      <div className="flex gap-4 border-b border-gray-100 pb-2">
        {['All', ...docCategories].map((cat, i) => (
          <button key={i} className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all ${i === 0 ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-900'}`}>{cat}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Articles of Incorporation', date: '2 days ago', cat: 'Legal', type: 'PDF' },
          { name: 'Go-to-Market Strategy v3', date: '5 hours ago', cat: 'Strategic', type: 'DOC' },
          { name: 'Product Spec: V1 Ledger', date: 'May 12, 2025', cat: 'Product', type: 'DOC' },
          { name: 'Term Sheet Template', date: 'April 20, 2025', cat: 'Investment', type: 'PDF' },
        ].map((doc, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] soft-shadow border border-gray-50 hover:border-indigo-100 transition-all group cursor-pointer">
             <div className="w-12 h-14 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-indigo-400">{doc.type}</span>
             </div>
             <h3 className="text-sm font-bold text-gray-900 mb-1">{doc.name}</h3>
             <div className="flex items-center gap-3">
                <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">{doc.cat}</span>
                <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                <span className="text-[9px] text-gray-400 font-medium uppercase tracking-tight">{doc.date}</span>
             </div>
             
             <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[9px] font-bold text-gray-400 hover:text-gray-900 uppercase">View</button>
                <button className="text-[9px] font-bold text-gray-400 hover:text-gray-900 uppercase">Share</button>
                <button className="text-[9px] font-bold text-red-400 hover:text-red-600 uppercase">Archive</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
