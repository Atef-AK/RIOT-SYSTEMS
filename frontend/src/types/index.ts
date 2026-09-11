export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';
export type UserStatus = 'ACTIVE' | 'INACTIVE';
export type MessageStatus = 'NEW' | 'READ' | 'IN_PROGRESS' | 'REPLIED' | 'ARCHIVED';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: UserStatus;
  avatar?: string | null;
  createdAt: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  icon: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  coverImage?: string | null;
  features: string | string[];
  technologies: string | string[];
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  challenge?: string | null;
  solution?: string | null;
  results?: string | null;
  clientName?: string | null;
  clientIndustry?: string | null;
  year?: string | null;
  coverImage: string;
  gallery?: string | string[] | null;
  technologies: string | string[];
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  country?: string | null;
  projectType: string;
  budgetRange?: string | null;
  message: string;
  attachmentUrl?: string | null;
  status: MessageStatus;
  internalNotes?: string | null;
  ipAddress?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PageSection {
  id: string;
  pageId: string;
  sectionType: string;
  title?: string | null;
  subtitle?: string | null;
  content?: string | null;
  order: number;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  metaTitle?: string | null;
  metaDesc?: string | null;
  isPublished: boolean;
  sections?: PageSection[];
  createdAt: string;
  updatedAt: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  category: string;
}

export interface Technology {
  id: string;
  name: string;
  category: 'HARDWARE' | 'COMMUNICATION' | 'SOFTWARE' | 'AI' | 'CLOUD';
  icon?: string | null;
  isFeatured: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  position: string;
  content: string;
  rating: number;
  avatar?: string | null;
  isPublished: boolean;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  photo?: string | null;
  linkedin?: string | null;
  github?: string | null;
  skills?: string | string[] | null;
  isPublished: boolean;
  order: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  order: number;
  target: string;
  isVisible: boolean;
}

export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  altText?: string | null;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId?: string | null;
  userName: string;
  action: string;
  entity: string;
  entityId?: string | null;
  details?: string | null;
  ipAddress?: string | null;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalServices: number;
  totalMessages: number;
  unreadMessages: number;
  totalMedia: number;
  recentMessages: ContactMessage[];
  recentActivities: ActivityLog[];
  projectsByCategory: { category: string; count: number }[];
}
