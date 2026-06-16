export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  year: string;
  featured: boolean;
  gallery?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  location: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'languages' | 'tools' | 'ai';
  iconName: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  type: 'hackathon' | 'certification' | 'academic' | 'contribution';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

