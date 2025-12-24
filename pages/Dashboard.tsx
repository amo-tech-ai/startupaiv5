
import React from 'react';
import { useStartup } from '../context/StartupContext';
import { NavLink } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { state, readinessScore } = useStartup();

  return (
    <div className="space-y-16 pb-20 pt-6">
      {/* Header with Readiness Score */}
      <header className="flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="max-w-xl space-y-4">
          <div className="flex items-center gap-3">
             <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase tracking-widest border border-indigo-100">Stage: {state.profile.stage}</span>
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Strategy Cycle</span>
          </div>
          <h1 className="text-6xl font-serif font-bold text-gray-900 leading-[1.1]">{state.profile.name}.</h1>
          <p className="text-gray-500 text-lg leading-relaxed font-light">
            {state.profile.tagline}. You are <span className="text-indigo-600 font-medium">{readinessScore}% ready</span> for the upcoming showcase.
          </p>
        </div>

        {/* Circular Readiness Score */}
        <div className="relative group cursor-pointer">
           <svg className="w-40 h-40 transform -rotate-90">
             <circle cx="80" cy="80" r="70" className="stroke-gray-100 fill-none" strokeWidth="8" />
             <circle 
              cx="80" cy="80" r="70" 
              className="stroke-indigo-600 fill-none transition-all duration-1000 ease-out" 
              strokeWidth="8" 
              strokeDasharray="440" 
              strokeDashoffset={440 * (1 - readinessScore / 100)} 
             />
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-serif font-bold text-gray-900">{readinessScore}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Score</span>
           </div>
        </div>
      </header>

      {/* Metric Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Market Proof', val: 'Verified', trend: '+12%', color: 'text-green-500' },
          { label: 'Monthly Burn', val: `$${state.financials.burn.toLocaleString()}`, trend: 'Stable', color: 'text-indigo-600' },
          { label: 'MVP Scope', val: `${state.mvp.features?.length || 0} Req`, trend: 'Locked', color: 'text-indigo-600' },
          { label: 'Risk Index', val: readinessScore > 80 ? 'Low' : 'Medium', trend: '-5%', color: readinessScore > 80 ? 'text-green-500' : 'text-amber-500' },
        ].map((m, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-50 soft-shadow hover:-translate-y-1 transition-all duration-500 group">
             <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{m.label}</h4>
             <div className="flex items-end justify-between">
                <span className="text-3xl font-serif font-bold text-gray-900 group-hover:text-indigo-900">{m.val}</span>
                <span className={`text-[10px] font-bold ${m.color} uppercase tracking-tighter`}>{m.trend}</span>
             </div>
          </div>
        ))}
      </section>

      {/* Startup Journey Flow */}
      <section className="bg-white p-12 rounded-[60px] border border-gray-50 soft-shadow overflow-hidden relative">
         <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="h-full w-full bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px]"></div>
         </div>
         <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12">Critical Path Journey</h2>
         
         <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-100 -translate-y-1/2 -z-10"></div>
            {[
              { label: 'Profile', active: true, path: '/startup-profile' },
              { label: 'Canvas', active: Object.keys(state.canvas).length > 0, path: '/lean-canvas' },
              { label: 'Market', active: readinessScore > 50, path: '/market-intel' },
              { label: 'Roadmap', active: readinessScore > 60, path: '/roadmap' },
              { label: 'MVP', active: state.mvp.features?.length > 0, path: '/mvp-scope' },
              { label: 'PRD', active: readinessScore > 80, path: '/prd' },
              { label: 'Deck', active: state.pitchDeck.slides?.length > 0, path: '/pitch-decks' },
            ].map((step, i) => (
              <NavLink to={step.path} key={i} className="flex flex-col items-center gap-4 group cursor-pointer">
                 <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${step.active ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg' : 'bg-white border-gray-100 text-gray-300'} group-hover:border-indigo-400`}>
                    <span className="text-[10px] font-bold">{i + 1}</span>
                 </div>
                 <span className={`text-[10px] font-bold uppercase tracking-widest ${step.active ? 'text-gray-900' : 'text-gray-300'} group-hover:text-indigo-600`}>{step.label}</span>
              </NavLink>
            ))}
         </div>
      </section>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#1E1E1E] text-white p-12 rounded-[50px] relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-10 blur-2xl bg-indigo-500 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
           <h3 className="text-4xl font-serif font-bold mb-6">Market Insight.</h3>
           <p className="text-gray-400 text-lg leading-relaxed font-light mb-10">
             Our agents detected a shift in your sector. Competitor "Heritage Luxury" just announced a carbon-neutral certification. Your ledger moat is now more critical than ever.
           </p>
           <NavLink to="/market-intel" className="bg-white text-gray-900 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-all inline-block">Deep Dive Research</NavLink>
        </div>

        <div className="bg-white p-12 rounded-[50px] soft-shadow border border-gray-50 flex flex-col justify-between">
           <div>
             <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6">Strategic Deficits.</h3>
             <div className="space-y-4">
               {readinessScore < 100 ? (
                 <>
                   <div className="flex items-center justify-between p-5 bg-red-50/50 rounded-2xl hover:bg-red-50 transition-colors cursor-pointer group">
                      <div>
                         <p className="text-sm font-bold text-red-900">Define Core Mission</p>
                         <p className="text-[10px] text-red-400 uppercase tracking-widest">Required for investor readiness</p>
                      </div>
                      <NavLink to="/startup-profile" className="text-[10px] font-bold uppercase text-red-600 opacity-0 group-hover:opacity-100">Fix</NavLink>
                   </div>
                   <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group">
                      <div>
                         <p className="text-sm font-bold text-gray-900">Finalize Lean Canvas</p>
                         <p className="text-[10px] text-gray-400 uppercase tracking-widest">Revenue blocks are currently blank</p>
                      </div>
                      <NavLink to="/lean-canvas" className="text-[10px] font-bold uppercase text-indigo-600 opacity-0 group-hover:opacity-100">Draft</NavLink>
                   </div>
                 </>
               ) : (
                 <div className="p-10 text-center space-y-4">
                    <p className="text-4xl">🏅</p>
                    <p className="text-lg font-serif italic text-gray-500">Maximum readiness achieved. You are ready to pitch.</p>
                 </div>
               )}
             </div>
           </div>
           <NavLink to="/roadmap" className="w-full text-center mt-8 py-4 border border-gray-100 text-gray-400 text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-gray-50 hover:text-gray-900 transition-all">View Full Roadmap</NavLink>
        </div>
      </div>
    </div>
  );
};
