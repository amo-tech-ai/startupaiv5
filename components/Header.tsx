
import React, { useState } from 'react';
import { CommandPalette } from './CommandPalette';

interface HeaderProps {
  onToggleAI: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleAI }) => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <>
      <header className="h-16 px-10 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-50">
        <div className="flex flex-col">
          <h2 className="text-xl font-serif font-semibold text-gray-900">Maison Julian</h2>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">STARTUPOS / SYSTEM UNIT 01</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer group" onClick={() => setIsCommandOpen(true)}>
            <div className="bg-gray-50 border border-gray-100 rounded-full px-5 py-1.5 text-xs w-72 flex items-center text-gray-400 transition-all group-hover:border-indigo-200">
              <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Search Command
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 border border-gray-200 rounded px-1 text-[8px] font-bold text-gray-400 group-hover:text-indigo-400 group-hover:border-indigo-100">⌘ K</div>
          </div>
          
          <button 
            onClick={onToggleAI}
            className="bg-[#1E1E1E] text-white px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
          >
            INTELLIGENCE
          </button>

          <img 
            src="https://picsum.photos/seed/user/80/80" 
            className="w-8 h-8 rounded-full object-cover border border-gray-100 shadow-sm" 
            alt="Avatar" 
          />
        </div>
      </header>
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
