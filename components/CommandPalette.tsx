
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const commands = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Startup Profile', path: '/startup-profile', icon: '🏢' },
    { name: 'Lean Canvas', path: '/lean-canvas', icon: '🏗️' },
    { name: 'Investor Readiness', path: '/investor-readiness', icon: '📈' },
    { name: 'Roadmap', path: '/roadmap', icon: '🗺️' },
    { name: 'Financials', path: '/financials', icon: '💰' },
  ];

  const filtered = commands.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose(); // Toggle handled by parent
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleDown);
    return () => window.removeEventListener('keydown', handleDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-6 bg-[#1E1E1E]/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-[30px] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center gap-4">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            autoFocus
            type="text" 
            placeholder="Command Maison Julian..." 
            className="flex-1 bg-transparent text-lg focus:outline-none placeholder:text-gray-300 font-light"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-2 py-1 border border-gray-100 rounded-md">Esc</button>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-4 space-y-1">
          {filtered.length > 0 ? filtered.map((cmd) => (
            <button
              key={cmd.path}
              onClick={() => { navigate(cmd.path); onClose(); }}
              className="w-full flex items-center justify-between p-4 hover:bg-indigo-50/50 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-xl group-hover:scale-110 transition-transform">{cmd.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-900">{cmd.name}</span>
              </div>
              <span className="text-[10px] text-gray-300 group-hover:text-indigo-400 font-bold uppercase tracking-widest">Jump to</span>
            </button>
          )) : (
            <div className="p-10 text-center space-y-2">
              <p className="text-sm text-gray-400 font-light italic">No results for "{query}"</p>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Ask Strategy Agent instead?</p>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50/50 p-4 border-t border-gray-50 flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase tracking-widest">
           <span>Navigate with ↓↑</span>
           <span>Enter to Execute</span>
        </div>
      </div>
    </div>
  );
};
