
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { IntelligencePanel } from './IntelligencePanel';
import { Header } from './Header';
import { BottomLogicStrip } from './BottomLogicStrip';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isIntelligenceOpen, setIsIntelligenceOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen w-full bg-[#FDFCFB]">
      <Header onToggleAI={() => setIsIntelligenceOpen(!isIntelligenceOpen)} />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Panel: Context & Navigation */}
        <Sidebar />

        {/* Main Panel: Human Work Area */}
        <main className="flex-1 overflow-y-auto px-10 pt-8 pb-32 scroll-smooth">
          <div className="max-w-5xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>

        {/* Right Panel: Intelligence & AI actions */}
        <IntelligencePanel isOpen={isIntelligenceOpen} onClose={() => setIsIntelligenceOpen(false)} />
        
        {/* Bottom Logic Strip */}
        <BottomLogicStrip />
      </div>
    </div>
  );
};
