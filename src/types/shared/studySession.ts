import { I_BaseEntity, I_BaseRequest, I_Filters, I_Response } from './base';
import { T_Difficulty, T_StudySessionType } from './common';

// Study Session interfaces
export interface I_StudySession extends I_BaseEntity {
  user: string;
  course?: string;
  lesson?: string;
  flashcardSet?: string;
  type: T_StudySessionType;
  startTime: string;
  endTime?: string;
  duration: number; // in minutes
  score: number;
  progress: number;
  isCompleted: boolean;
  vocabularyStudied: I_VocabularyStudy[];
  metadata?: {
    device?: string;
    location?: string;
    notes?: string;
    difficulty?: T_Difficulty;
  };
}

// Flashcard Study Session interface (for FlashcardStudy component)
export interface I_FlashcardStudySession {
  setId: string;
  cards: I_FlashcardCard[];
  totalCards: number;
  currentIndex: number;
  sessionId: string;
}

export interface I_FlashcardCard {
  _id: string;
  front: string;
  back: string;
  pronunciation?: string;
  example?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: string;
  reviewCount: number;
  correctCount: number;
  incorrectCount: number;
  nextReview?: string;
}

export interface I_VocabularyStudy {
  vocabulary: string;
  mastery: number;
  attempts: number;
  correctAnswers: number;
}

// Request interfaces
export interface I_CreateStudySessionRequest extends I_BaseRequest {
  course?: string;
  lesson?: string;
  flashcardSet?: string;
  type: T_StudySessionType;
  metadata?: {
    device?: string;
    location?: string;
    notes?: string;
    difficulty?: T_Difficulty;
  };
}

export interface I_UpdateStudySessionRequest extends I_BaseRequest {
  endTime?: string;
  duration?: number;
  score?: number;
  progress?: number;
  isCompleted?: boolean;
  vocabularyStudied?: I_VocabularyStudy[];
  metadata?: {
    device?: string;
    location?: string;
    notes?: string;
    difficulty?: T_Difficulty;
  };
}

// Filter and response interfaces
export interface I_StudySessionFilters extends I_Filters {
  user?: string;
  course?: string;
  lesson?: string;
  flashcardSet?: string;
  type?: T_StudySessionType;
  isCompleted?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface I_StudySessionsResponse extends I_Response<I_StudySession> {}

// Types

// Admin table specific types
export type T_StudySessionTableColumns = keyof I_StudySession;
export type T_StudySessionSortField =
  | 'startTime'
  | 'duration'
  | 'score'
  | 'progress'
  | 'createdAt';
export type T_StudySessionFilterType =
  | 'user'
  | 'course'
  | 'lesson'
  | 'flashcardSet'
  | 'type'
  | 'isCompleted'
  | 'search';
