
import React, { useState, useEffect } from 'react';
import { getSectionSuggestion } from '../services/ai';
import { useStartup } from '../context/StartupContext';

const canvasSections = [
  { title: 'Problem', desc: 'Top 3 pain points of your target customers.' },
  { title: 'Solution', desc: 'Top 3 features that solve those pain points.' },
  { title: 'Key Metrics', desc: 'Core activities that measure how you are doing.' },
  { title: 'Unique Value Proposition', desc: 'Single, clear, compelling message that states why you are different.' },
  { title: 'Unfair Advantage', desc: 'Something that cannot easily be bought or copied.' },
  { title: 'Channels', desc: 'Path to customers (Free vs. Paid).' },
  { title: 'Customer Segments', desc: 'Target customers and users.' },
  { title: 'Cost Structure', desc: 'Fixed and variable costs.' },
  { title: 'Revenue Streams', desc: 'Sources of cash flow.' },
];

export const LeanCanvas: React.FC = () => {
  const { state, updateModule } = useStartup();
  
  // Initialize local state from global context or defaults
  const [canvasData, setCanvasData] = useState<Record<string, string>>(() => {
    const saved = state.canvas || {};
    const initial: Record<string, string> = {};
    canvasSections.forEach(s => {
      initial[s.title] = saved[s.title] || s.desc;
    });
    return initial;
  });

  const [editingBlock, setEditingBlock] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);

  // Keep local state in sync if global state changes externally
  useEffect(() => {
    if (state.canvas && Object.keys(state.canvas).length > 0) {
      setCanvasData(prev => ({ ...prev, ...state.canvas }));
    }
  }, [state.canvas]);

  const openEditor = (title: string) => {
    setEditingBlock(title);
    setTempValue(canvasData[title]);
  };

  const saveEdit = () => {
    if (editingBlock) {
      const newData = { ...canvasData, [editingBlock]: tempValue };
      setCanvasData(newData);
      updateModule('canvas', newData);
      setEditingBlock(null);
    }
  };

  const handleAISuggestion = async () => {
    if (!editingBlock) return;
    setIsSuggesting(true);
    
    // Provide rich context for better AI results
    const startupContext = `
      Name: ${state.profile.name}
      Tagline: ${state.profile.tagline}
      Stage: ${state.profile.stage}
      Current Canvas State: ${JSON.stringify(canvasData)}
    `;
    
    try {
      const suggestion = await getSectionSuggestion(editingBlock, startupContext);
      if (suggestion) {
        setTempValue(suggestion);
      }
    } catch (error) {
      console.error("AI Suggestion failed:", error);
    } finally {
      setIsSuggesting(false);
    }
  };

  // Sections that have AI assistance enabled
  const aiEnabledBlocks = ['Key Metrics', 'Unfair Advantage', 'Unique Value Proposition', 'Problem'];

  return (
    <div className="space-y-12 pb-32">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Lean Canvas</h1>
          <p className="text-gray-400 font-light max-w-lg">The strategic blueprint for your venture. Click any block to refine your business model.</p>
        </div>
        <div className="flex gap-3">
          <button className="text-[10px] font-bold px-6 py-2.5 border border-gray-100 rounded-full hover:bg-white hover:soft-shadow transition-all uppercase tracking-widest text-gray-400">Export PDF</button>
          <button className="text-[10px] font-bold bg-[#1E1E1E] text-white px-8 py-2.5 rounded-full hover:bg-black transition-all uppercase tracking-widest shadow-xl">Share Strategy</button>
        </div>
      </header>

      {/* Grid Layout - Standard Lean Canvas Format */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 min-h-[700px]">
        {/* Row 1 */}
        <div className="md:col-span-1 md:row-span-2">
          <CanvasCard 
            title="Problem" 
            content={canvasData['Problem']} 
            onClick={() => openEditor('Problem')}
            aiFlag={canvasData['Problem'].includes('Top 3 pain points')}
            hasAI={true}
          />
        </div>
        <div className="md:col-span-1">
          <CanvasCard 
            title="Solution" 
            content={canvasData['Solution']} 
            onClick={() => openEditor('Solution')}
          />
        </div>
        <div className="md:col-span-1 md:row-span-2">
          <CanvasCard 
            title="Unique Value Proposition" 
            content={canvasData['Unique Value Proposition']} 
            onClick={() => openEditor('Unique Value Proposition')}
            highlight 
            hasAI={true}
          />
        </div>
        <div className="md:col-span-1">
          <CanvasCard 
            title="Unfair Advantage" 
            content={canvasData['Unfair Advantage']} 
            onClick={() => openEditor('Unfair Advantage')}
            aiFlag={canvasData['Unfair Advantage'].includes('Something that cannot')}
            hasAI={true}
          />
        </div>
        <div className="md:col-span-1 md:row-span-2">
          <CanvasCard 
            title="Customer Segments" 
            content={canvasData['Customer Segments']} 
            onClick={() => openEditor('Customer Segments')}
          />
        </div>
        
        {/* Row 1 Lower Blocks */}
        <div className="md:col-start-2 md:row-start-2">
          <CanvasCard 
            title="Key Metrics" 
            content={canvasData['Key Metrics']} 
            onClick={() => openEditor('Key Metrics')}
            aiFlag={canvasData['Key Metrics'].includes('Core activities')}
            hasAI={true}
          />
        </div>
        <div className="md:col-start-4 md:row-start-2">
          <CanvasCard 
            title="Channels" 
            content={canvasData['Channels']} 
            onClick={() => openEditor('Channels')}
          />
        </div>

        {/* Bottom Row */}
        <div className="md:col-span-2 md:col-start-1 md:col-end-3">
          <CanvasCard 
            title="Cost Structure" 
            content={canvasData['Cost Structure']} 
            onClick={() => openEditor('Cost Structure')}
          />
        </div>
        <div className="md:col-span-2 md:col-start-4 md:col-end-6">
          <CanvasCard 
            title="Revenue Streams" 
            content={canvasData['Revenue Streams']} 
            onClick={() => openEditor('Revenue Streams')}
          />
        </div>
      </div>

      {/* Advisory Section */}
      <footer className="bg-indigo-50/20 rounded-[40px] p-10 border border-indigo-100/20 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest">Next Strategic Milestone</h4>
          <p className="text-xl font-serif font-bold text-gray-900">Validate Problem Hypotheses</p>
          <p className="text-xs text-gray-400 font-light">Based on your Canvas, we recommend conducting 10 user interviews to verify the "Problem" assumptions.</p>
        </div>
        <button className="text-[10px] font-bold text-indigo-600 bg-white px-8 py-3 rounded-full uppercase tracking-widest soft-shadow border border-indigo-50 hover:bg-indigo-50 transition-all">Launch Research</button>
      </footer>

      {/* Editing Modal */}
      {editingBlock && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/5 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[50px] p-12 soft-shadow border border-gray-100 relative shadow-2xl">
            <header className="mb-8 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1 block">Strategy Block</span>
                <h2 className="text-4xl font-serif font-bold text-gray-900">{editingBlock}</h2>
              </div>
              <button 
                onClick={() => setEditingBlock(null)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </header>
            
            <textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full h-56 bg-gray-50/50 border border-gray-100 rounded-[30px] p-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none leading-relaxed text-gray-700"
              placeholder={`Define your ${editingBlock.toLowerCase()}...`}
            />

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex gap-4">
                {aiEnabledBlocks.includes(editingBlock) && (
                  <button 
                    onClick={handleAISuggestion}
                    disabled={isSuggesting}
                    className="flex items-center gap-3 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-6 py-3 rounded-2xl hover:bg-indigo-100 transition-all uppercase tracking-widest disabled:opacity-50 group"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full bg-indigo-600 ${isSuggesting ? 'animate-ping' : ''}`}></div>
                    {isSuggesting ? 'Agent Drafting...' : 'Suggest with AI'}
                  </button>
                )}
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => setEditingBlock(null)}
                  className="flex-1 sm:flex-none text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 px-6"
                >
                  Discard
                </button>
                <button 
                  onClick={saveEdit}
                  className="bg-[#1E1E1E] text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl"
                >
                  Commit Block
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CanvasCard: React.FC<{ 
  title: string; 
  content: string; 
  onClick: () => void;
  highlight?: boolean; 
  aiFlag?: boolean;
  hasAI?: boolean;
}> = ({ title, content, onClick, highlight, aiFlag, hasAI }) => (
  <div 
    onClick={onClick}
    className={`
      h-full min-h-[180px] p-8 rounded-[35px] soft-shadow border transition-all duration-500 group cursor-pointer relative overflow-hidden flex flex-col
      ${highlight ? 'bg-indigo-50/30 border-indigo-100' : 'bg-white border-gray-50 hover:border-indigo-100 hover:-translate-y-1'}
      ${aiFlag ? 'border-amber-100' : ''}
    `}
  >
    {aiFlag && (
      <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-amber-50 rounded-full opacity-30 group-hover:scale-150 transition-transform"></div>
    )}
    
    <div className="flex items-center justify-between mb-6 relative z-10">
      <div className="flex items-center gap-2">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-300 group-hover:text-indigo-600 transition-colors">{title}</h3>
        {hasAI && (
          <span className="text-[8px] text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">✨ AI</span>
        )}
      </div>
      {aiFlag && <span className="text-[8px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded uppercase tracking-tighter">Needs Input</span>}
    </div>
    
    <p className={`text-xs leading-relaxed transition-colors relative z-10 flex-1 ${content.includes('Top 3') || content.includes('Single, clear') || content.includes('Something that') || content.includes('Core activities') ? 'text-gray-300 italic font-light' : 'text-gray-600 group-hover:text-gray-900 font-medium'}`}>
      {content}
    </p>
    
    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 relative z-10">
       <div className="flex items-center gap-2 text-indigo-600 text-[10px] font-bold uppercase tracking-widest">
         <span>Edit Block</span>
         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7" /></svg>
       </div>
    </div>
  </div>
);
