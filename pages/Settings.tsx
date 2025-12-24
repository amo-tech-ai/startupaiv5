
import React from 'react';
import { useStartup } from '../context/StartupContext';

export const Settings: React.FC = () => {
  const { state, updateModule } = useStartup();

  return (
    <div className="space-y-12 pb-20 pt-6">
      <header className="max-w-xl">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Governance & Settings</h1>
        <p className="text-gray-400 font-light">System parameters, workspace members, and strategic visibility.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="bg-white p-10 rounded-[40px] border border-gray-50 soft-shadow space-y-8">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">Startup Metadata</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400">Venture Name</label>
              <input 
                type="text" 
                defaultValue={state.profile.name} 
                onChange={(e) => updateModule('profile', { ...state.profile, name: e.target.value })}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400">Current Stage</label>
              <select 
                defaultValue={state.profile.stage}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-100"
              >
                <option>Idea</option>
                <option>MVP</option>
                <option>Seed</option>
                <option>Series A</option>
              </select>
            </div>
          </div>
        </section>

        <section className="bg-white p-10 rounded-[40px] border border-gray-50 soft-shadow space-y-8">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">Workspace & Security</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="text-sm font-bold text-gray-900">Multi-Agent Autonomy</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Allow AI to propose proactive changes</p>
              </div>
              <div className="w-10 h-6 bg-indigo-600 rounded-full flex items-center justify-end px-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl opacity-50 cursor-not-allowed">
              <div>
                <p className="text-sm font-bold text-gray-900">White Label Branding</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Customize the OS appearance</p>
              </div>
              <span className="text-[9px] font-bold text-indigo-400 uppercase">Premium Only</span>
            </div>
          </div>
        </section>
      </div>
      
      <div className="bg-red-50/30 p-10 rounded-[40px] border border-red-100/30">
        <h3 className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-4">Danger Zone</h3>
        <button className="text-xs font-bold text-red-500 border border-red-200 px-6 py-2 rounded-xl hover:bg-red-50 transition-all">Reset All Startup Data</button>
      </div>
    </div>
  );
};
