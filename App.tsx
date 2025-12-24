
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { StartupProfile } from './pages/StartupProfile';
import { LeanCanvas } from './pages/LeanCanvas';
import { Roadmap } from './pages/Roadmap';
import { PRD } from './pages/PRD';
import { Financials } from './pages/Financials';
import { PitchDecks } from './pages/PitchDecks';
import { PitchDeckEditor } from './pages/PitchDeckEditor';
import { MVPScope } from './pages/MVPScope';
import { Documents } from './pages/Documents';
import { Agents } from './pages/Agents';
import { MarketResearch } from './pages/MarketResearch';
import { MarketIntel } from './pages/MarketIntel';
import { InvestorReadiness } from './pages/InvestorReadiness';
import { GTM } from './pages/GTM';
import { TechStack } from './pages/TechStack';
import { Tasks } from './pages/Tasks';
import { Settings } from './pages/Settings';
import { ProfileWizard } from './pages/wizards/ProfileWizard';
import { CanvasWizard } from './pages/wizards/CanvasWizard';
import { MVPWizard } from './pages/wizards/MVPWizard';
import { PRDWizard } from './pages/wizards/PRDWizard';
import { PitchDeckWizard } from './pages/wizards/PitchDeckWizard';
import { StartupProvider } from './context/StartupContext';

// Generic Placeholder for newly added modules
const ModulePlaceholder = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 animate-fade-in">
    <div className="w-24 h-24 rounded-[40px] bg-indigo-50 flex items-center justify-center text-4xl soft-shadow border border-indigo-100/50">
      ✨
    </div>
    <div className="space-y-2">
      <h2 className="text-4xl font-serif font-bold text-gray-900">{name}</h2>
      <p className="text-gray-400 font-light max-w-sm mx-auto leading-relaxed">
        Our intelligence agents are currently calibrating the strategic parameters for this module.
      </p>
    </div>
    <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] border-b border-indigo-100 pb-1 hover:text-indigo-900 transition-colors">
      Notify me when ready
    </button>
  </div>
);

const App: React.FC = () => {
  return (
    <StartupProvider>
      <Router>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<LandingPage />} />
          <Route path="/how-it-works" element={<LandingPage />} />
          <Route path="/pricing" element={<LandingPage />} />
          <Route path="/login" element={<ModulePlaceholder name="Founder Login" />} />
          <Route path="/signup" element={<ModulePlaceholder name="Founder Intake" />} />
          
          {/* Wizards (Standalone) */}
          <Route path="/startup-profile/wizard" element={<ProfileWizard />} />
          <Route path="/lean-canvas/wizard" element={<CanvasWizard />} />
          <Route path="/mvp-scope/wizard" element={<MVPWizard />} />
          <Route path="/prd/wizard" element={<PRDWizard />} />
          <Route path="/pitch-decks/wizard" element={<PitchDeckWizard />} />
          
          {/* App Shell Core */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          
          {/* Foundation */}
          <Route path="/startup-profile" element={<Layout><StartupProfile /></Layout>} />
          <Route path="/lean-canvas" element={<Layout><LeanCanvas /></Layout>} />
          <Route path="/market-research" element={<Layout><MarketResearch /></Layout>} />
          <Route path="/market-intel" element={<Layout><MarketIntel /></Layout>} />
          
          {/* Planning */}
          <Route path="/roadmap" element={<Layout><Roadmap /></Layout>} />
          <Route path="/mvp-scope" element={<Layout><MVPScope /></Layout>} />
          <Route path="/prd" element={<Layout><PRD /></Layout>} />
          <Route path="/tech-stack" element={<Layout><TechStack /></Layout>} />
          
          {/* Finance & Fundraising */}
          <Route path="/financials" element={<Layout><Financials /></Layout>} />
          <Route path="/investor-readiness" element={<Layout><InvestorReadiness /></Layout>} />
          <Route path="/pitch-decks" element={<Layout><PitchDecks /></Layout>} />
          <Route path="/pitch-decks/:deck_id" element={<Layout><PitchDeckEditor /></Layout>} />
          
          {/* GTM & Growth */}
          <Route path="/gtm" element={<Layout><GTM /></Layout>} />
          
          {/* Execution Workspace */}
          <Route path="/tasks" element={<Layout><Tasks /></Layout>} />
          <Route path="/documents" element={<Layout><Documents /></Layout>} />
          <Route path="/chat" element={<Layout><ModulePlaceholder name="Strategy Chat" /></Layout>} />
          
          {/* Governance */}
          <Route path="/agents" element={<Layout><Agents /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </StartupProvider>
  );
};

export default App;
