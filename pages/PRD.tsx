
import React, { useState } from 'react';

export const PRD: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const sections = [
    { title: 'Overview', icon: '📝', complete: true, content: 'Detailed summary of the Maison Julian platform objectives and market fit.' },
    { title: 'User Stories', icon: '👤', complete: true, content: 'As a luxury buyer, I want to verify the carbon footprint of my purchase so that I feel ethical.' },
    { title: 'Functional Requirements', icon: '⚙️', complete: false, content: 'The system must integrate with the Ethereum Mainnet via Polygon L2.' },
    { title: 'Technical Constraints', icon: '🛡️', complete: true, content: 'Maximum latency of 200ms for ledger verification calls.' },
    { title: 'Acceptance Criteria', icon: '✅', complete: false, content: 'Users can successfully download a PDF certificate of provenance.' }
  ];

  return (
    <div className="space-y-12 pb-20 pt-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">PRD Builder</h1>
          <p className="text-gray-400 font-light">Documenting the technical and functional essence of Maison Julian.</p>
        </div>
        <div className="flex gap-3">
           <button className="text-[10px] font-bold text-gray-400 border border-gray-100 px-6 py-2.5 rounded-full uppercase tracking-widest hover:bg-white hover:soft-shadow transition-all">Version History</button>
           <button className="bg-[#1E1E1E] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl">Export Spec</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sections Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="px-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-4">Structure</h3>
          {sections.map((section, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveSection(idx)}
              className={`w-full flex items-center justify-between p-6 rounded-[30px] border transition-all duration-500 text-left group ${activeSection === idx ? 'bg-white border-indigo-200 soft-shadow ring-1 ring-indigo-50' : 'bg-transparent border-gray-50 hover:bg-white/50'}`}
            >
              <div className="flex items-center gap-4">
                <span className={`text-xl transition-transform group-hover:scale-110 ${activeSection === idx ? 'grayscale-0' : 'grayscale opacity-50'}`}>{section.icon}</span>
                <span className={`text-sm font-bold ${activeSection === idx ? 'text-gray-900' : 'text-gray-400'}`}>{section.title}</span>
              </div>
              <div className={`w-1.5 h-1.5 rounded-full ${section.complete ? 'bg-green-500' : 'bg-amber-400 animate-pulse'}`}></div>
            </button>
          ))}
          <button className="w-full p-6 border border-dashed border-gray-100 rounded-[30px] text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:border-indigo-100 hover:text-indigo-400 transition-all">+ Add Section</button>
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-8">
          {activeSection !== null ? (
            <div className="bg-white rounded-[50px] soft-shadow border border-gray-50 p-12 min-h-[500px] animate-fade-in flex flex-col">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-50">
                 <h2 className="text-3xl font-serif font-bold text-gray-900">{sections[activeSection].title}</h2>
                 <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Last edited: Today</span>
              </div>
              <textarea 
                defaultValue={sections[activeSection].content}
                className="flex-1 w-full bg-transparent text-gray-600 font-light text-lg leading-relaxed focus:outline-none resize-none"
                placeholder="Start drafting this requirement..."
              />
              <div className="mt-10 pt-8 border-t border-gray-50 flex items-center justify-between">
                 <div className="flex gap-3">
                   <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest border border-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-all">AI Rewrite</button>
                   <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-50 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all">Add Criteria</button>
                 </div>
                 <button className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Save Section</button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-4 py-32">
               <div className="text-6xl grayscale">📐</div>
               <p className="text-lg font-serif italic max-w-xs">Select a structural block to begin formal specification.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
