export interface Project {
  id: number;
  title: string;
  image: string;
  liveLink?: string;
  githubLink?: string;
  tags: string[];
  description?: string;
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

