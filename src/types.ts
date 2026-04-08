export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  description: string;
  requirements: string[];
  postedAt: string;
  logo?: string;
  category: string;
}

export interface UserProfile {
  name: string;
  title: string;
  skills: string[];
  experience: string;
  bio: string;
}
