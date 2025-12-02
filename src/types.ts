export interface Project {
  id: number;
  title: string;
  image: string;
  link?: string;
  tags: string[];
  description?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

