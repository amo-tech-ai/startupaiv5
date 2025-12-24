
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIntelligence, ContextType } from '../services/ai';
import { useStartup } from '../context/StartupContext';

interface IntelligencePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { readinessScore, activeGaps, addProposal } = useStartup();
  
  const [loading, setLoading] = useState(false);
  const [aiCards, setAiCards] = useState<any[]>([]);

  const fetchInsights = async () => {
    setLoading(true);
    let context: ContextType = 'dashboard';
    if (path.includes('lean-canvas')) context = 'canvas';
    else if (path.includes('roadmap')) context = 'roadmap';
    else if (path.includes('prd')) context = 'prd';
    else if (path.includes('financials')) context = 'financials';
    else if (path.includes('profile')) context = 'profile';

    const result = await getIntelligence(context, { path, score: readinessScore });
    setAiCards(result.cards || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchInsights();
    }
  }, [path, isOpen]);

  if (!isOpen) return null;

  return (
    <aside className="w-80 border-l border-gray-100 bg-white flex flex-col h-full animate-fade-in z-40 fixed right-0 lg:relative shadow-2xl lg:shadow-none">
      <div className="p-6 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
          <h2 className="text-sm font-serif font-bold tracking-tight">Intelligence Engine</h2>
        </div>
        <button onClick={onClose} className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-gray-900 transition-colors">Dismiss</button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar pb-32">
        {/* Venture Health */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Venture Readiness</span>
            <span className="text-[10px] font-bold text-indigo-600 uppercase">{readinessScore}%</span>
          </div>
          <div className="h-1 w-full bg-gray-50 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${readinessScore}%` }}></div>
          </div>
        </section>

        {/* Strategy Gaps - Critical Actions */}
        {activeGaps.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Critical Gaps</h3>
            <div className="space-y-3">
               {activeGaps.map(gap => (
                 <div key={gap.id} className="p-4 rounded-2xl bg-red-50/50 border border-red-100/30 group">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-[8px] font-bold bg-red-400 text-white px-1.5 py-0.5 rounded uppercase">{gap.severity}</span>
                       <h4 className="text-[10px] font-bold text-red-900">{gap.title}</h4>
                    </div>
                    <p className="text-[11px] text-red-900/60 leading-relaxed italic mb-3">"{gap.description}"</p>
                    <button 
                      onClick={() => navigate(`/${gap.module}`)}
                      className="w-full py-2 bg-white text-red-600 text-[9px] font-bold uppercase tracking-widest rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                    >
                      Resolve Now
                    </button>
                 </div>
               ))}
            </div>
          </section>
        )}

        {/* Proactive Proposals */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Proposals</span>
            <button onClick={fetchInsights} className="text-[9px] text-indigo-600 font-bold hover:underline uppercase">Refresh</button>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <div className="py-10 text-center animate-pulse">
                <p className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">Recalibrating Strategy...</p>
              </div>
            ) : aiCards.map((card, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#FDFCFB] border border-gray-100 soft-shadow hover:border-indigo-100 transition-all group">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-1.5 h-1.5 rounded-full ${card.type === 'risk' ? 'bg-red-400' : card.type === 'optimization' ? 'bg-indigo-400' : 'bg-green-400'}`}></span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{card.type} • {card.impact}</span>
                </div>
                <h3 className="text-xs font-bold text-gray-900 mb-2 group-hover:text-indigo-900">{card.title}</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed italic mb-4">"{card.description}"</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-indigo-900 text-white text-[9px] font-bold py-2 rounded-lg hover:bg-black transition-colors uppercase tracking-widest">Approve</button>
                  <button className="flex-1 bg-gray-50 text-gray-400 text-[9px] font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-widest">Preview</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-indigo-50/30 p-6 rounded-3xl border border-indigo-100/30">
          <h3 className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest mb-3">Strategic Advice</h3>
          <p className="text-[11px] text-indigo-900/60 leading-relaxed font-light italic">
            "Founder, your current velocity suggests you'll hit a documentation bottleneck in 3 weeks. Prioritizing the PRD today prevents a 20% delay in the September showcase."
          </p>
        </section>
      </div>

      <div className="p-6 border-t border-gray-50 bg-gray-50/30 sticky bottom-0">
        <button 
          onClick={() => navigate('/chat')}
          className="w-full flex items-center gap-3 p-4 bg-white rounded-2xl soft-shadow group hover:border-indigo-200 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Julian AI Advisor</p>
            <p className="text-[8px] text-gray-400 uppercase font-medium">Ready to brainstorm</p>
          </div>
        </button>
      </div>
    </aside>
  );
};
