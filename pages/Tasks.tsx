
import React from 'react';

export const Tasks: React.FC = () => {
  return (
    <div className="space-y-12 pb-20 pt-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Tasks</h1>
          <p className="text-gray-400 font-light">Tactical execution of the Maison Julian strategic vision.</p>
        </div>
        <button className="bg-[#1E1E1E] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl">New Task</button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[
          { title: 'To Do', items: [
            { t: 'Finalize Milan venue contract', d: 'Due tomorrow', p: 'Critical' },
            { t: 'Review ledger gas fees', d: 'Due Friday', p: 'High' }
          ]},
          { title: 'In Progress', items: [
            { t: 'Drafting Series A narrative', d: 'In Progress', p: 'High' },
            { t: 'Onboarding carbon consultant', d: 'In Progress', p: 'Med' }
          ]},
          { title: 'Completed', items: [
            { t: 'Seed pitch deck V2', d: 'Completed', p: 'Critical' },
            { t: 'Core branding guidelines', d: 'Completed', p: 'High' }
          ]}
        ].map((col, idx) => (
          <div key={idx} className="space-y-6">
            <h3 className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{col.title}</h3>
            <div className="space-y-4">
              {col.items.map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-[30px] soft-shadow border border-gray-50 hover:border-indigo-100 transition-all group cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.p === 'Critical' ? 'bg-red-500' : item.p === 'High' ? 'bg-amber-500' : 'bg-indigo-500'}`}></span>
                    <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{item.p} Priority</span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-indigo-900 transition-colors">{item.t}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
