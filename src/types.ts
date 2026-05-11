export type ProjectTier = 'enterprise' | 'saas' | 'web' | 'landing';

export interface Project {
  id: number;
  title: string;
  image: string;
  liveLink?: string;
  githubLink?: string;
  tags: string[];
  tier: ProjectTier;
  description?: string;
  summary?: string;
  stack?: string;
  role?: string;
  problem?: string;
  solution?: string;
  result?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Service {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
}

export interface Note {
  id: number;
  title: string;
  date: string;
  summary: string;
  content: string[];
  learning: string;
  nextStep: string;
}

export interface ArchitecturePrinciple {
  title: string;
  description: string;
  icon: string;
}

export interface StackGroup {
  category: string;
  items: string;
  icon: string;
}
