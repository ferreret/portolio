export interface SkillItem {
  name: string;
  level: number; // 0-100 for charts
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string; // HTML or Markdown string
  tags: string[];
  readTime: string;
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  summary: string;
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
  certifications: string[];
}

// Wrapper for all content to enable easy switching
export interface AppContent {
  profile: ProfileData;
  experience: ExperienceItem[];
  skillCategories: SkillCategory[];
  radarSkills: SkillItem[];
  projects: ProjectItem[];
  blog: BlogPost[];
  ui: {
    home: string;
    projects: string;
    blog: string;
    contact: string;
    downloadCv: string;
    viewProjects: string;
    heroTitlePrefix: string;
    heroTitleHighlight: string;
    heroTitleSuffix: string;
    experienceTitle: string;
    technicalProficiency: string;
    coreTechTitle: string;
    journeyTitle: string;
    educationTitle: string;
    certificationsTitle: string;
    featuredProjectsTitle: string;
    featuredProjectsSubtitle: string;
    blogTitle: string;
    blogSubtitle: string;
    backToBlog: string;
    readArticle: string;
    viewDetails: string;
    available: string;
    yearsExp: string;
    specialist: string;
    copyright: string;
  }
}