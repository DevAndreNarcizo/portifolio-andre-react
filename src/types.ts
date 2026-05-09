export interface Project {
  id: number;
  title: string;
  image: string;
  liveLink?: string;
  githubLink?: string;
  tags: string[];
  description?: string;
  /** Short summary for the card */
  summary?: string;
  /** Stack used in the project */
  stack?: string;
  /** André's role in the project */
  role?: string;
  /** Problem solved */
  problem?: string;
  /** Solution implemented */
  solution?: string;
  /** Result or learning */
  result?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface Service {
  id: number;
  title: string;
  description: string;
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
