import { I_BaseEntity, I_BaseRequest, I_Filters, I_Response } from './base';
import { T_Level } from './common';

// Flashcard interfaces
export interface I_FlashcardSet extends I_BaseEntity {
  title: string;
  description?: string;
  course?: string;
  lesson?: string;
  level: T_Level;
  category: T_FlashcardCategory;
  tags?: string[];
  isActive?: boolean;
  cards: I_Flashcard[];
  statistics?: {
    totalCards: number;
    masteredCards: number;
    totalReviews: number;
    averageScore: number;
    lastReviewed?: string;
  };
}

// Flashcard for FlashcardStudy component
export interface I_Flashcard {
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

// Flashcard for Flashcards component (simplified)
export interface I_FlashcardSetSimple extends I_BaseEntity {
  title: string;
  description: string;
  category: string;
  level: string;
  totalCards: number;
  masteredCards: number;
  learningCards: number;
  notStartedCards: number;
  // Additional properties for display
  isNew?: boolean;
  isRecommended?: boolean;
  difficulty?: string;
  timeEstimate?: string;
  lastStudied?: string;
  mastery?: number;
  color?: string;
}

// Request interfaces
export interface I_CreateFlashcardSetRequest extends I_BaseRequest {
  title: string;
  description?: string;
  course?: string;
  lesson?: string;
  level: T_Level;
  category: T_FlashcardCategory;
  tags?: string[];
  isActive?: boolean;
  cards: Omit<I_Flashcard, '_id'>[];
}

export interface I_UpdateFlashcardSetRequest extends I_BaseRequest {
  title?: string;
  description?: string;
  course?: string;
  lesson?: string;
  level?: T_Level;
  category?: T_FlashcardCategory;
  tags?: string[];
  isActive?: boolean;
  cards?: Omit<I_Flashcard, '_id'>[];
}

// Filter and response interfaces
export interface I_FlashcardFilters extends I_Filters {
  course?: string;
  lesson?: string;
  level?: T_Level;
  category?: T_FlashcardCategory;
  isActive?: boolean;
}

export interface I_FlashcardSetsResponse extends I_Response<I_FlashcardSet> {}

// Types
export type T_FlashcardCategory =
  | 'Vocabulary'
  | 'Grammar'
  | 'Phrases'
  | 'Characters'
  | 'Mixed';

// Admin table specific types
export type T_FlashcardTableColumns = keyof I_FlashcardSet;
export type T_FlashcardSortField = 'title' | 'level' | 'category' | 'createdAt';
export type T_FlashcardFilterType =
  | 'course'
  | 'lesson'
  | 'level'
  | 'category'
  | 'isActive'
  | 'search';
