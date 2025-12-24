
import React from 'react';

const logicSteps = [
  { title: 'Clarify', desc: 'Profile & Positioning' },
  { title: 'Focus', desc: 'MVP Scope' },
  { title: 'Validate', desc: 'Market Proof' },
  { title: 'Pitch', desc: 'Investor Readiness' },
];

export const BottomLogicStrip: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-64 right-0 h-20 glass-panel border-t border-gray-100 px-10 flex items-center justify-center z-30">
      <div className="flex items-center gap-12">
        {logicSteps.map((step, idx) => (
          <React.Fragment key={step.title}>
            <div className="flex flex-col items-center group cursor-pointer">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 group-hover:text-indigo-700 transition-colors">{step.title}</span>
              <span className="text-[11px] text-gray-400 font-medium group-hover:text-gray-600 transition-colors">{step.desc}</span>
            </div>
            {idx < logicSteps.length - 1 && (
              <div className="w-8 h-px bg-gray-200"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
