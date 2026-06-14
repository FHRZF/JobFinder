export enum Screen {
  SPLASH = "SPLASH",
  ONBOARDING = "ONBOARDING",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  HOME = "HOME",
  SEARCH = "SEARCH",
  APPS = "APPS",
  RESUME = "RESUME",
  PROFILE = "PROFILE",
  JOB_DETAIL = "JOB_DETAIL",
  COMPANY_PROFILE = "COMPANY_PROFILE",
  APPLICATION_FORM = "APPLICATION_FORM",
  PORTFOLIO_BUILDER = "PORTFOLIO_BUILDER",
  ACTIVITY = "ACTIVITY",
}

export interface UserProfile {
  name: string;
  role: string; // e.g. "Student", "Fresh Graduate", "Professional"
  headline: string;
  avatarUrl: string;
  email: string;
  phone: string;
  summary: string;
  applicationsCount: number;
  experienceYears: number;
  skills: string[];
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  location: string;
  salaryRange: string;
  type: string; // Full Time, Contract, Part Time
  experienceLevel: string; // Mid-Senior level, Entry, Senior
  postedTime: string;
  description: string;
  tags: string[];
  isAiMatch?: boolean;
  isTopMatch?: boolean;
  benefits?: string[];
  requirements?: string[];
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  duration: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  company: string;
  details: string;
  time: string;
  type: "invitation" | "match" | "viewed" | "optimization";
  isNew: boolean;
}

export interface ApplicationPipelineItem {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  status: "Submitted" | "Reviewing" | "Interview" | "Closed";
  appliedDate: string;
  interviewDate?: string;
}

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  isRecommendation?: boolean;
  recommendationTitle?: string;
}
