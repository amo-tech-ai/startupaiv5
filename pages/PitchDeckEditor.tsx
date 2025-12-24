
import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { generateSlideVisual, refinePitchNarrative } from '../services/ai';
import { useStartup } from '../context/StartupContext';

export const PitchDeckEditor: React.FC = () => {
  const { deck_id } = useParams();
  const { state, updateModule } = useStartup();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [improvements, setImprovements] = useState<string[]>([]);

  // Local mirror of slides for performance, committed to context on save
  const [slides, setSlides] = useState(state.pitchDeck.slides.length > 0 ? state.pitchDeck.slides : [
    { title: 'The Mission', content: 'Transforming luxury via carbon neutrality.', icon: '🌍', image: null, notes: '' },
    { title: 'The Problem', content: 'Traditional luxury is opaque and wasteful.', icon: '📉', image: null, notes: '' },
    { title: 'The Solution', content: 'Digital ledger for verified provenance.', icon: '💎', image: null, notes: '' },
    { title: 'The Proof', content: '8 LOIs from Milan fashion houses.', icon: '📈', image: null, notes: '' },
    { title: 'The Ask', content: '$1.2M at $8M post-money valuation.', icon: '💰', image: null, notes: '' },
  ]);

  const commitSlides = () => {
    updateModule('pitchDeck', { slides });
  };

  const handleGenerateVisual = async () => {
    setIsGenerating(true);
    const imageUrl = await generateSlideVisual(`${slides[activeSlide].title}: ${slides[activeSlide].content}`);
    if (imageUrl) {
      const newSlides = [...slides];
      newSlides[activeSlide].image = imageUrl;
      setSlides(newSlides);
      commitSlides();
    }
    setIsGenerating(false);
  };

  const handleRefineNarrative = async () => {
    setIsRefining(true);
    const result = await refinePitchNarrative(slides, 'Seed');
    setImprovements(result.improvements || []);
    setIsRefining(false);
  };

  return (
    <div className="space-y-12 pb-32 pt-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
           <NavLink to="/pitch-decks" className="text-gray-400 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           </NavLink>
           <h1 className="text-2xl font-serif font-bold text-gray-900">Investor Deck • {state.profile.name}</h1>
           <span className="text-[9px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase">Active Draft</span>
        </div>
        <div className="flex gap-4">
           <button 
            onClick={handleRefineNarrative}
            className="text-[10px] font-bold text-indigo-600 border border-indigo-100 px-6 py-2 rounded-xl uppercase tracking-widest hover:bg-white transition-all"
           >
             {isRefining ? 'Refining Flow...' : 'AI Story Audit'}
           </button>
           <button className="bg-indigo-900 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl">Export Deck</button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Slide Navigator */}
        <div className="w-full lg:w-64 space-y-4 shrink-0 flex lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar">
           {slides.map((slide: any, i: number) => (
             <button
               key={i}
               onClick={() => setActiveSlide(i)}
               className={`w-48 lg:w-full aspect-[16/9] rounded-2xl border-2 transition-all p-4 text-left flex flex-col justify-between shrink-0 relative overflow-hidden ${activeSlide === i ? 'bg-white border-indigo-600 soft-shadow' : 'bg-gray-50 border-transparent hover:border-gray-100'}`}
             >
                {slide.image && <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Slide visual" />}
                <div className="relative z-10">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Slide {i+1}</span>
                  <p className="text-[11px] font-bold text-gray-900 truncate">{slide.title}</p>
                </div>
             </button>
           ))}
        </div>

        {/* Main: Slide Canvas */}
        <div className="flex-1 space-y-8">
           <div className="aspect-[16/9] bg-white rounded-[40px] soft-shadow border border-gray-50 relative flex flex-col items-center justify-center p-20 text-center group overflow-hidden">
              {slides[activeSlide].image && (
                <img src={slides[activeSlide].image} className="absolute inset-0 w-full h-full object-cover animate-fade-in" alt="Slide backdrop" />
              )}
              
              <div className={`relative z-10 p-12 rounded-[40px] ${slides[activeSlide].image ? 'bg-white/80 backdrop-blur-xl border border-white/50 soft-shadow' : ''}`}>
                <span className="text-6xl mb-8 transform group-hover:scale-110 transition-transform block">{slides[activeSlide].icon}</span>
                <h2 className="text-5xl font-serif font-bold text-gray-900 mb-6">{slides[activeSlide].title}</h2>
                <textarea 
                  value={slides[activeSlide].content}
                  onChange={(e) => {
                    const newSlides = [...slides];
                    newSlides[activeSlide].content = e.target.value;
                    setSlides(newSlides);
                  }}
                  onBlur={commitSlides}
                  className="w-full bg-transparent text-xl text-gray-500 font-light leading-relaxed text-center focus:outline-none resize-none h-24"
                />
              </div>
              
              <div className="absolute bottom-8 right-8 flex gap-4">
                 <button 
                  onClick={handleGenerateVisual}
                  disabled={isGenerating}
                  className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-xl text-[10px] font-bold text-indigo-600 soft-shadow border border-indigo-100 uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
                 >
                   {isGenerating ? 'Generating Art...' : 'AI Visual'}
                 </button>
              </div>
           </div>

           {/* Narrative Audit Sidebar/Panel */}
           {improvements.length > 0 && (
             <div className="bg-indigo-900 text-white p-10 rounded-[40px] animate-fade-in">
                <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-6">Narrative Strategy Audit</h4>
                <div className="space-y-4">
                   {improvements.map((imp, i) => (
                     <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                        <span className="text-indigo-400 font-bold italic">0{i+1}</span>
                        <p className="text-sm font-light leading-relaxed italic">"{imp}"</p>
                     </div>
                   ))}
                </div>
             </div>
           )}

           <div className="bg-gray-50/50 p-10 rounded-[40px] border border-gray-100">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Speaker Notes</h4>
              <textarea 
                value={slides[activeSlide].notes}
                onChange={(e) => {
                  const newSlides = [...slides];
                  newSlides[activeSlide].notes = e.target.value;
                  setSlides(newSlides);
                }}
                onBlur={commitSlides}
                placeholder="The hook for this slide is..."
                className="w-full bg-transparent text-sm text-gray-700 leading-relaxed font-light focus:outline-none resize-none min-h-[120px]"
              />
           </div>
        </div>
      </div>
    </div>
  );
};
