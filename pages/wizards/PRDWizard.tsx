
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 'goal', title: 'Product Goal', q: 'What is the high-level goal of this specific release?' },
  { id: 'users', title: 'User Roles', q: 'Describe the primary and secondary users of this system.' },
  { id: 'flows', title: 'Critical Flows', q: 'Step by step, how does a user achieve their primary goal?' },
  { id: 'metrics', title: 'Success Criteria', q: 'How will we measure if this product is working as intended?' },
];

export const PRDWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    else navigate('/prd');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#FDFCFB]">
      <div className="max-w-2xl w-full bg-white rounded-[60px] p-16 soft-shadow border border-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 flex gap-1">
          {steps.map((_, i) => (
            <div key={i} className={`flex-1 transition-all duration-500 ${i <= currentStep ? 'bg-indigo-600' : 'bg-gray-100'}`}></div>
          ))}
        </div>

        <header className="mb-12">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-2 block">Wizard — Technical Spec</span>
          <h1 className="text-4xl font-serif font-bold text-gray-900">{steps[currentStep].title}</h1>
        </header>

        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-sm text-gray-400 font-light leading-relaxed">{steps[currentStep].q}</label>
            <textarea 
              placeholder="Be specific and technical..."
              className="w-full bg-gray-50 border border-gray-100 rounded-[30px] p-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 min-h-[150px] transition-all"
            />
          </div>

          <div className="flex items-center justify-between gap-6">
            <button 
              onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
              className={`text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-gray-900 transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
            >
              Back
            </button>
            <button 
              onClick={next}
              className="flex-1 bg-[#1E1E1E] text-white py-5 rounded-[30px] text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95"
            >
              {currentStep === steps.length - 1 ? 'Build Spec' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
