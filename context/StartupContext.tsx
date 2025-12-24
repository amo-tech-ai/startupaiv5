
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

interface StartupState {
  profile: any;
  canvas: any;
  mvp: any;
  prd: any;
  pitchDeck: { slides: any[] };
  financials: any;
  version: number;
}

interface StrategyGap {
  id: string;
  module: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
}

interface StartupContextType {
  state: StartupState;
  updateModule: (module: keyof StartupState, data: any) => void;
  proposals: any[];
  addProposal: (proposal: any) => void;
  approveProposal: (id: string) => void;
  resetState: () => void;
  readinessScore: number;
  activeGaps: StrategyGap[];
}

const STORAGE_KEY = 'startup_ai_state_v1';

const DEFAULT_STATE: StartupState = {
  profile: { name: 'Maison Julian', stage: 'Seed', tagline: 'Future of Conscientious Luxury', mission: '' },
  canvas: {},
  mvp: { features: [] },
  prd: { sections: [] },
  pitchDeck: { slides: [] },
  financials: { burn: 14200, runway: 18, cac: 42.50 },
  version: 1,
};

const StartupContext = createContext<StartupContextType | undefined>(undefined);

export const StartupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<StartupState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_STATE;
  });

  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateModule = (module: keyof StartupState, data: any) => {
    setState(prev => ({
      ...prev,
      [module]: typeof data === 'object' ? { ...prev[module], ...data } : data,
      version: prev.version + 1
    }));
  };

  const activeGaps = useMemo(() => {
    const gaps: StrategyGap[] = [];
    if (!state.profile.mission) {
      gaps.push({ id: 'gap-1', module: 'profile', severity: 'high', title: 'Missing Mission Statement', description: 'Your venture lacks a north star. Investors prioritize clarity of purpose.' });
    }
    if (Object.keys(state.canvas).length < 5) {
      gaps.push({ id: 'gap-2', module: 'canvas', severity: 'medium', title: 'Incomplete Lean Canvas', description: 'Major strategic blocks are empty. Your business model is currently high-risk.' });
    }
    if (state.pitchDeck.slides.length < 5) {
      gaps.push({ id: 'gap-3', module: 'pitch', severity: 'high', title: 'Weak Pitch Narrative', description: 'Your deck lacks the core 5-slide arc (Problem, Solution, Proof, Market, Ask).' });
    }
    return gaps;
  }, [state]);

  const readinessScore = useMemo(() => {
    let score = 40; // Base score
    if (state.profile.mission) score += 10;
    if (Object.keys(state.canvas).length >= 7) score += 20;
    if (state.pitchDeck.slides.length >= 10) score += 15;
    if (state.financials.runway > 12) score += 15;
    return Math.min(score, 100);
  }, [state]);

  const resetState = () => {
    setState(DEFAULT_STATE);
    localStorage.removeItem(STORAGE_KEY);
  };

  const addProposal = (proposal: any) => {
    setProposals(prev => [proposal, ...prev]);
  };

  const approveProposal = (id: string) => {
    setProposals(prev => prev.filter(p => p.id !== id));
  };

  return (
    <StartupContext.Provider value={{ state, updateModule, proposals, addProposal, approveProposal, resetState, readinessScore, activeGaps }}>
      {children}
    </StartupContext.Provider>
  );
};

export const useStartup = () => {
  const context = useContext(StartupContext);
  if (!context) throw new Error('useStartup must be used within StartupProvider');
  return context;
};
