
export interface AIProposal {
  id: string;
  type: 'optimization' | 'insight' | 'action';
  title: string;
  description: string;
  impact: string;
  category: string;
}

export interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}
