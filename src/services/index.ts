// Export all API services
export { default as authApi } from './authApi';
export { default as dashboardApi } from './dashboardApi';
export { default as coursesApi } from './coursesApi';
export { default as flashcardsApi } from './flashcardsApi';
export { default as wordsApi } from './wordsApi';
export { default as usersApi } from './usersApi';
export { default as vocabulariesApi } from './vocabulariesApi';
export { default as configurationsApi } from './configurationsApi';
export { default as lessonsApi } from './lessonsApi';
export { default as studySessionsApi } from './studySessionsApi';
export { default as userProgressApi } from './userProgressApi';
export { default as userGoalsApi } from './userGoalsApi';

// Export common types
export type { Level, Difficulty, Theme, Gender } from '../types/common';

// Export types
export type {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  LogoutResponse,
} from './authApi';

export type {
  DashboardStats,
  RecentActivity,
  DashboardData,
} from './dashboardApi';

export type {
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
  CourseFilters,
} from './coursesApi';

export type {
  Lesson,
  CreateLessonRequest,
  UpdateLessonRequest,
  LessonFilters,
} from './lessonsApi';

export type {
  Flashcard,
  FlashcardSet,
  CreateFlashcardSetRequest,
  UpdateFlashcardSetRequest,
  FlashcardSetFilters,
  ProgressUpdate,
  StudyProgress,
} from './flashcardsApi';

export type {
  Word,
  CreateWordRequest,
  UpdateWordRequest,
  WordFilters,
} from './wordsApi';

export type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  UpdatePreferencesRequest,
} from './usersApi';

export type {
  Vocabulary,
  CreateVocabularyRequest,
  UpdateVocabularyRequest,
  VocabularyFilters,
} from './vocabulariesApi';

export type {
  Configuration,
  CreateConfigurationRequest,
  UpdateConfigurationRequest,
  ConfigurationFilters,
} from './configurationsApi';

export type {
  StudySession,
  CreateStudySessionRequest,
  UpdateStudySessionRequest,
  StudySessionFilters,
} from './studySessionsApi';

export type {
  UserProgress,
  CreateUserProgressRequest,
  UpdateUserProgressRequest,
  UserProgressFilters,
} from './userProgressApi';

export type {
  UserGoal,
  CreateUserGoalRequest,
  UpdateUserGoalRequest,
  UserGoalFilters,
} from './userGoalsApi';
