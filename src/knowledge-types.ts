export interface Command {
  id: string;
  command: string;
  description: string;
  example?: string;
  warning?: string;
  tags: string[];
  category: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  tags: string[];
  rating?: number;
  free: boolean;
  notes?: string;
}

export interface RoadmapItem {
  id: string;
  tech: string;
  status: 'completed' | 'learning' | 'planned';
  progress: number;
  startDate: string;
  endDate?: string;
  resources: Array<{name: string; url: string}>;
  category: string;
}

export interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  description?: string;
  tags: string[];
  category: string;
}

export interface CheatSheet {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  lastUpdated: string;
  commands: Command[];
}