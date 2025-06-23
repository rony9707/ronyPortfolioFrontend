// agnibha-profile.interface.ts

export interface Metric {
  type: string;
  count: number;
  description: string;
  svgImage: string;
}

export interface Skill {
  type: string;
  description: string;
  percentage: number;
}

export interface Portfolio {
  type: 'Project' | 'NPM Package';
  projectName: string;
  imageLink: string;
  progress: string;
  description: string;
  technologiesUsed: string;
  projectDate: string;

  // Optional fields 
  githubLink?: string;
  projectURL?: string;
  npmLink?: string;
  npmInstallCMD?: string;
}


export interface SocialLink {
  platform: string;
  url: string;
  iconClass: string;
}

export interface Experience {
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
}

export interface KeyValue {
  key: string;
  value: string;
}

export interface IAgnibhaProfile {
  info: KeyValue[];
  meterics: Metric[];
  skills: Skill[];
  portfolios: Portfolio[];
  socialLinks: SocialLink[];
  experiences: Experience[];
  songs: string[];
}