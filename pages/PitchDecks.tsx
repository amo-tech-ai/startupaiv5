
import React from 'react';

export const PitchDecks: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Pitch Decks</h1>
          <p className="text-gray-400">Managing narratives for Pre-Seed and Seed rounds.</p>
        </div>
        <button className="bg-indigo-900 text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-800 transition-all">New Deck</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: 'Investor Deck V2', slides: 14, status: 'Draft', round: 'Seed' },
          { title: 'Product Story', slides: 8, status: 'Active', round: 'Internal' },
          { title: 'Series A Vision', slides: 22, status: 'Archive', round: 'Series A' }
        ].map((deck, i) => (
          <div key={i} className="group cursor-pointer">
             <div className="aspect-[16/9] bg-gray-100 rounded-3xl mb-4 soft-shadow border border-gray-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-indigo-900 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                   </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                   <span className="text-[10px] font-bold text-white bg-indigo-900/40 backdrop-blur-md px-2 py-0.5 rounded uppercase tracking-widest">Slide 1 of {deck.slides}</span>
                </div>
             </div>
             <div className="px-2">
                <h3 className="text-lg font-serif font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{deck.title}</h3>
                <div className="flex items-center gap-4">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{deck.round} Round</span>
                   <span className={`text-[10px] font-bold uppercase tracking-widest ${deck.status === 'Active' ? 'text-green-500' : 'text-gray-400'}`}>{deck.status}</span>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
