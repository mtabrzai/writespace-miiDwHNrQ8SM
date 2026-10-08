export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  POSTS: '/posts',
  POST: '/posts/:id',
  CREATE_POST: '/posts/new',
  EDIT_POST: '/posts/:id/edit',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

export const COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#6b7280',
  ACCENT: '#10b981',
  DANGER: '#ef4444',
  WARNING: '#f59e0b',
  INFO: '#3b82f6',
  LIGHT: '#f9fafb',
  DARK: '#111827',
  WHITE: '#ffffff',
  BLACK: '#000000',
};

export const LIMITS = {
  MAX_TITLE_LENGTH: 100,
  MAX_CONTENT_LENGTH: 10000,
  MIN_PASSWORD_LENGTH: 8,
  MAX_USERNAME_LENGTH: 30,
  MAX_EMAIL_LENGTH: 254,
  POSTS_PER_PAGE: 10,
  COMMENTS_PER_PAGE: 20,
};