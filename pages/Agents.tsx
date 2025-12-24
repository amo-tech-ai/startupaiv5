
import React, { useState } from 'react';
import { chatWithAgent } from '../services/ai';

const agents = [
  { id: 'marketing', name: 'Julian', role: 'Chief Brand Architect', color: 'bg-indigo-600', desc: 'Expert in high-end positioning and editorial storytelling.' },
  { id: 'tech', name: 'Axis', role: 'Technical Lead', color: 'bg-gray-900', desc: 'Architecture, scalability, and technical constraints manager.' },
  { id: 'finance', name: 'Vera', role: 'Growth Strategist', color: 'bg-indigo-900', desc: 'Unit economics, burn analysis, and fundraising prep.' }
];

export const Agents: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || loading) return;
    const userMsg = { role: 'user', text: message };
    setChat([...chat, userMsg]);
    setMessage('');
    setLoading(true);

    const reply = await chatWithAgent(selectedAgent.name, message, chat);
    setChat(prev => [...prev, { role: 'agent', text: reply || 'I apologize, I am processing high-level data. Let us try again.' }]);
    setLoading(false);
  };

  return (
    <div className="flex h-[calc(100vh-160px)] gap-8 animate-fade-in">
      {/* Left: Agent Selection */}
      <div className="w-80 space-y-6">
        <header>
          <h1 className="text-4xl font-serif font-bold text-gray-900">Agents</h1>
          <p className="text-gray-400 mt-2 font-light">Consult your strategic board of directors.</p>
        </header>
        
        <div className="space-y-3">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={`w-full text-left p-6 rounded-[30px] border transition-all duration-300 ${selectedAgent.id === agent.id ? 'bg-white border-indigo-200 soft-shadow ring-1 ring-indigo-50' : 'bg-transparent border-gray-50 hover:bg-white/50'}`}
            >
              <div className="flex items-center gap-4 mb-3">
                 <div className={`w-10 h-10 rounded-2xl ${agent.color} flex items-center justify-center text-white font-serif font-bold`}>{agent.name[0]}</div>
                 <div>
                    <p className="text-sm font-bold text-gray-900">{agent.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{agent.role}</p>
                 </div>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed font-light">{agent.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Chat Window */}
      <div className="flex-1 bg-white rounded-[40px] soft-shadow border border-gray-50 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <header className="p-8 border-b border-gray-50 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full ${selectedAgent.color} animate-pulse`}></div>
              <div>
                 <h2 className="text-lg font-serif font-semibold text-gray-900">{selectedAgent.name} is online</h2>
                 <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Live Strategic Consultation</p>
              </div>
           </div>
           <button onClick={() => setChat([])} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900">Clear Session</button>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
          {chat.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-4">
               <div className="text-4xl">💭</div>
               <p className="text-sm italic font-serif">What strategic horizon shall we explore today?</p>
            </div>
          )}
          {chat.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[70%] p-6 rounded-[30px] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#1E1E1E] text-white' : 'bg-gray-50 text-gray-800 font-light'}`}>
                  {msg.text}
               </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
                <div className="bg-gray-50 p-6 rounded-[30px] flex gap-1 items-center">
                   <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                   <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
             </div>
          )}
        </div>

        <div className="p-8 bg-gray-50/50 border-t border-gray-50">
           <div className="relative">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                type="text"
                placeholder={`Query ${selectedAgent.name} about your strategy...`}
                className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all soft-shadow pr-16"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#1E1E1E] text-white rounded-xl flex items-center justify-center hover:bg-black transition-all active:scale-95 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
