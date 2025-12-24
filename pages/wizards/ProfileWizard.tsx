
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStartup } from '../../context/StartupContext';

export const ProfileWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const { state, updateModule } = useStartup();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: state.profile.name || '',
    tagline: state.profile.tagline || '',
    founder: 'Julian Chen',
    background: '',
    url: ''
  });

  const next = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      updateModule('profile', {
        name: formData.name,
        tagline: formData.tagline,
        stage: 'Seed'
      });
      navigate('/startup-profile');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-10">
      <div className="max-w-xl w-full bg-white rounded-[60px] p-16 soft-shadow border border-gray-50 space-y-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 opacity-5 bg-indigo-500 blur-3xl rounded-full"></div>
        
        <header className="text-center space-y-4">
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-12 h-1 bg-gray-100 rounded-full transition-all duration-500 ${step >= i ? 'bg-indigo-600' : ''}`}></div>
            ))}
          </div>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em] block">Module 01 — Intake</span>
          <h1 className="text-4xl font-serif font-bold text-gray-900">
            {step === 1 ? 'Venture Identity' : step === 2 ? 'Founder Context' : 'Market Presence'}
          </h1>
        </header>

        <div className="space-y-8 relative z-10">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Venture Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Maison Julian" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Core Tagline</label>
                <input 
                  type="text" 
                  value={formData.tagline}
                  onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                  placeholder="The future of conscientious luxury..." 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100" 
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Primary Founder</label>
                <input 
                  type="text" 
                  value={formData.founder}
                  onChange={(e) => setFormData({...formData, founder: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Expertise Narrative</label>
                <textarea 
                  value={formData.background}
                  onChange={(e) => setFormData({...formData, background: e.target.value})}
                  placeholder="Summarize your domain expertise..." 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 min-h-[120px] resize-none"
                ></textarea>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
               <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100/20 text-center">
                  <p className="text-xs text-indigo-900/60 leading-relaxed font-light italic">Connect your LinkedIn or Website to auto-verify your strategic proof points.</p>
               </div>
               <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Venture Website</label>
                <input 
                  type="text" 
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="https://..." 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100" 
                />
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Back</button>
            )}
            <button onClick={next} className="flex-1 bg-[#1E1E1E] text-white py-5 rounded-[30px] text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95">
              {step === 3 ? 'Commit to Profile' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
