// Common types and enums used across the application

// Difficulty levels
export type T_Difficulty = 'Easy' | 'Medium' | 'Hard';
export enum E_Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

// Learning levels
export type T_Level = 'Beginner' | 'Intermediate' | 'Advanced';
export enum E_Level {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

// Status types
export type T_Status = 'active' | 'inactive' | 'pending' | 'completed';
export enum E_Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  COMPLETED = 'completed',
}

// HSK levels
export type T_HSKLevel = 1 | 2 | 3 | 4 | 5 | 6;
export enum E_HSKLevel {
  HSK1 = 1,
  HSK2 = 2,
  HSK3 = 3,
  HSK4 = 4,
  HSK5 = 5,
  HSK6 = 6,
}

// User roles
export type T_UserRole = 'user' | 'admin' | 'moderator';
export enum E_UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

// Gender types
export type T_Gender = 'male' | 'female' | 'other';
export enum E_Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

// Theme types
export type T_Theme = 'light' | 'dark' | 'auto';
export enum E_Theme {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

// Language types
export type T_Language = 'vi' | 'en';
export enum E_Language {
  VIETNAMESE = 'vi',
  ENGLISH = 'en',
}

// Formality levels
export type T_Formality = 'formal' | 'neutral' | 'informal' | 'literary';
export enum E_Formality {
  FORMAL = 'formal',
  NEUTRAL = 'neutral',
  INFORMAL = 'informal',
  LITERARY = 'literary',
}

// Exercise types
export type T_ExerciseType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'matching'
  | 'true-false'
  | 'essay'
  | 'listening'
  | 'writing';

export enum E_ExerciseType {
  MULTIPLE_CHOICE = 'multiple-choice',
  FILL_BLANK = 'fill-blank',
  MATCHING = 'matching',
  TRUE_FALSE = 'true-false',
  ESSAY = 'essay',
  LISTENING = 'listening',
  WRITING = 'writing',
}

// Study session types
export type T_StudySessionType =
  | 'lesson'
  | 'flashcard'
  | 'quiz'
  | 'writing'
  | 'listening'
  | 'mixed';

export enum E_StudySessionType {
  LESSON = 'lesson',
  FLASHCARD = 'flashcard',
  QUIZ = 'quiz',
  WRITING = 'writing',
  LISTENING = 'listening',
  MIXED = 'mixed',
}

// User goal types
export type T_UserGoalType = 'daily' | 'weekly' | 'monthly' | 'custom';
export enum E_UserGoalType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  CUSTOM = 'custom',
}

// Configuration types
export type T_ConfigurationType =
  | 'filter'
  | 'topic'
  | 'level'
  | 'category'
  | 'difficulty'
  | 'tag'
  | 'setting'
  | 'wordType';

export enum E_ConfigurationType {
  FILTER = 'filter',
  TOPIC = 'topic',
  LEVEL = 'level',
  CATEGORY = 'category',
  DIFFICULTY = 'difficulty',
  TAG = 'tag',
  SETTING = 'setting',
  WORD_TYPE = 'wordType',
}

// Color types for UI
export type T_Color =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'orange'
  | 'pink'
  | 'gray';

export enum E_Color {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  PURPLE = 'purple',
  ORANGE = 'orange',
  PINK = 'pink',
  GRAY = 'gray',
}
