import { I_BaseEntity, I_BaseRequest, I_Filters, I_Response } from './base';
import { T_Difficulty } from './common';

// User Progress interfaces
export interface I_UserProgress extends I_BaseEntity {
  user: string;
  course?: string;
  lesson?: string;
  flashcardSet?: string;
  progress: number; // percentage
  score: number; // percentage
  timeSpent: number; // in minutes
  completedAt?: string;
  lastStudied?: string;
  isCompleted: boolean;
  metadata?: {
    device?: string;
    location?: string;
    notes?: string;
    difficulty?: T_Difficulty;
  };
  statistics?: {
    totalAttempts: number;
    averageScore: number;
    bestScore: number;
    studyStreak: number;
  };
}

// Request interfaces
export interface I_CreateUserProgressRequest extends I_BaseRequest {
  user: string;
  course?: string;
  lesson?: string;
  flashcardSet?: string;
  progress: number;
  score: number;
  timeSpent: number;
  isCompleted?: boolean;
  metadata?: {
    device?: string;
    location?: string;
    notes?: string;
    difficulty?: T_Difficulty;
  };
}

export interface I_UpdateUserProgressRequest extends I_BaseRequest {
  progress?: number;
  score?: number;
  timeSpent?: number;
  completedAt?: string;
  lastStudied?: string;
  isCompleted?: boolean;
  metadata?: {
    device?: string;
    location?: string;
    notes?: string;
    difficulty?: T_Difficulty;
  };
}

// Filter and response interfaces
export interface I_UserProgressFilters extends I_Filters {
  user?: string;
  course?: string;
  lesson?: string;
  flashcardSet?: string;
  isCompleted?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface I_UserProgressResponse extends I_Response<I_UserProgress> {}

// Types

// Admin table specific types
export type T_UserProgressTableColumns = keyof I_UserProgress;
export type T_UserProgressSortField =
  | 'progress'
  | 'score'
  | 'timeSpent'
  | 'completedAt'
  | 'createdAt';
export type T_UserProgressFilterType =
  | 'user'
  | 'course'
  | 'lesson'
  | 'flashcardSet'
  | 'isCompleted'
  | 'search';
