
import React from 'react';
import { NavLink } from 'react-router-dom';

const navSections = [
  {
    title: 'Command',
    items: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Investor Readiness', path: '/investor-readiness' },
    ]
  },
  {
    title: 'Foundation',
    items: [
      { label: 'Startup Profile', path: '/startup-profile' },
      { label: 'Lean Canvas', path: '/lean-canvas' },
      { label: 'Market Intelligence', path: '/market-intel' },
    ]
  },
  {
    title: 'Planning',
    items: [
      { label: 'Roadmap', path: '/roadmap' },
      { label: 'MVP Scope', path: '/mvp-scope' },
      { label: 'PRD', path: '/prd' },
      { label: 'Tech Stack', path: '/tech-stack' },
    ]
  },
  {
    title: 'Growth',
    items: [
      { label: 'GTM Strategy', path: '/gtm' },
      { label: 'Financials', path: '/financials' },
      { label: 'Pitch Decks', path: '/pitch-decks' },
    ]
  },
  {
    title: 'Workspace',
    items: [
      { label: 'Tasks', path: '/tasks' },
      { label: 'Documents', path: '/documents' },
      { label: 'Chat', path: '/chat' },
    ]
  },
  {
    title: 'Governance',
    items: [
      { label: 'Agents', path: '/agents' },
      { label: 'Settings', path: '/settings' },
    ]
  }
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r border-gray-100 bg-white flex flex-col h-full z-40 overflow-hidden">
      <div className="p-8 pb-4 shrink-0">
        <div className="flex items-center gap-2 mb-8">
           <NavLink to="/" className="text-xl font-serif font-bold tracking-tight group">
             <span className="text-indigo-600 transition-colors group-hover:text-black">S</span>tartupAI
           </NavLink>
           <div className="ml-auto w-1 h-1 rounded-full bg-indigo-600 animate-pulse"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar space-y-8 pb-10">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-2">
            <h4 className="px-4 text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">{section.title}</h4>
            <nav className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink 
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-2.5 text-xs rounded-xl transition-all duration-300
                    ${isActive ? 'bg-[#1E1E1E] text-white font-medium shadow-lg translate-x-1' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50/50'}
                  `}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-gray-50 shrink-0">
        <div className="bg-[#FDFCFB] p-4 rounded-2xl border border-gray-100 soft-shadow flex items-center gap-3 group cursor-pointer hover:border-indigo-100 transition-all">
          <img src="https://picsum.photos/seed/user/80/80" className="w-8 h-8 rounded-full object-cover border border-white" />
          <div className="overflow-hidden">
            <p className="text-[10px] font-bold text-gray-900 truncate">Julian Chen</p>
            <p className="text-[8px] text-gray-400 uppercase tracking-widest font-medium">Founder Access</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
