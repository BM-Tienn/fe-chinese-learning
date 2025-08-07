import { API_CONFIG } from './env';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Users
  USERS: {
    ME: '/users/me',
    UPDATE_PROFILE: '/users/updateMe',
    CHANGE_PASSWORD: '/users/changePassword',
  },

  // Dashboard
  DASHBOARD: {
    MAIN: '/dashboard',
    STATS: '/dashboard/stats',
    RECENT_ACTIVITY: '/dashboard/recent-activity',
  },

  // Courses
  COURSES: {
    LIST: '/courses',
    DETAIL: (id: string) => `/courses/${id}`,
    LESSONS: (courseId: string) => `/courses/${courseId}/lessons`,
    LESSON_DETAIL: (courseId: string, lessonId: string) =>
      `/courses/${courseId}/lessons/${lessonId}`,
  },

  // Flashcards
  FLASHCARDS: {
    LIST: '/flashcards',
    DETAIL: (setId: string) => `/flashcards/${setId}`,
    STUDY: '/flashcards/study',
    PROGRESS: (setId: string) => `/flashcards/${setId}/progress`,
  },

  // Words
  WORDS: {
    LIST: '/words',
    DETAIL: (id: string) => `/words/${id}`,
    CREATE: '/words',
    UPDATE: (id: string) => `/words/${id}`,
    DELETE: (id: string) => `/words/${id}`,
  },

  // Vocabularies
  VOCABULARIES: {
    LIST: '/vocabularies',
    DETAIL: (id: string) => `/vocabularies/${id}`,
  },

  // Configurations
  CONFIGURATIONS: {
    LIST: '/configurations',
    FRONTEND: '/configurations/frontend',
    COURSE_FILTERS: '/configurations/courses/filters',
    FLASHCARD_CONFIG: '/configurations/flashcards',
    BY_TYPE: (type: string) => `/configurations/type/${type}`,
    CREATE: '/configurations',
    UPDATE: (id: string) => `/configurations/${id}`,
    DELETE: (id: string) => `/configurations/${id}`,
    UPDATE_COUNTS: '/configurations/update-counts',
    INITIALIZE: '/configurations/initialize',
    BULK_UPDATE: '/configurations/bulk-update',
    EXPORT: '/configurations/export',
    IMPORT: '/configurations/import',
  },
} as const;

// API Configuration
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.FULL_BASE_URL}${endpoint}`;
};

export const getApiConfig = () => ({
  baseURL: API_CONFIG.FULL_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});
