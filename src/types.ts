export type ProjectTier = 'enterprise' | 'saas' | 'web' | 'landing';

export interface Localized {
  pt: string;
  en: string;
}

export interface Project {
  id: number;
  title: string;
  image: string;
  liveLink?: string;
  githubLink?: string;
  tags: string[];
  tier: ProjectTier;
  summary: Localized;
  problem: Localized;
  solution: Localized;
  result: Localized;
  role: Localized;
  stack: string;
}

export interface TechMarqueeItem {
  name: string;
}

export interface Service {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
}

export interface StackGroup {
  category: string;
  items: string;
  icon: string;
}
