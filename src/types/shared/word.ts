import { I_BaseEntity, I_BaseRequest, I_Filters, I_Response } from './base';
import { T_Difficulty } from './common';

// Word interfaces
export interface I_Word extends I_BaseEntity {
  user: string;
  chinese: string;
  pinyin: string;
  vietnameseReading?: string;
  meaning: {
    primary: string;
    secondary?: string[];
    partOfSpeech?: string;
  };
  grammar?: {
    level?: string;
    frequency?: number;
    formality?: string;
  };
  examples?: I_WordExample[];
  related?: {
    synonyms?: string[];
    antonyms?: string[];
    compounds?: string[];
  };
  hskLevel?: number;
  category: T_WordCategory;
  difficulty?: T_Difficulty;
  isActive?: boolean;
  metadata?: {
    tags?: string[];
    notes?: string;
    source?: string;
  };
  statistics?: {
    totalReviews: number;
    masteryLevel: number;
    lastReviewed?: string;
    averageScore: number;
    nextReview?: string;
  };
}

export interface I_WordExample {
  chinese: string;
  pinyin: string;
  vietnamese: string;
  audio?: string;
}

// Request interfaces
export interface I_CreateWordRequest extends I_BaseRequest {
  user: string;
  chinese: string;
  pinyin: string;
  vietnameseReading?: string;
  meaning: {
    primary: string;
    secondary?: string[];
    partOfSpeech?: string;
  };
  grammar?: {
    level?: string;
    frequency?: number;
    formality?: string;
  };
  examples?: I_WordExample[];
  related?: {
    synonyms?: string[];
    antonyms?: string[];
    compounds?: string[];
  };
  hskLevel?: number;
  category: T_WordCategory;
  difficulty?: T_Difficulty;
  isActive?: boolean;
  metadata?: {
    tags?: string[];
    notes?: string;
    source?: string;
  };
}

export interface I_UpdateWordRequest extends I_BaseRequest {
  chinese?: string;
  pinyin?: string;
  vietnameseReading?: string;
  meaning?: {
    primary: string;
    secondary?: string[];
    partOfSpeech?: string;
  };
  grammar?: {
    level?: string;
    frequency?: number;
    formality?: string;
  };
  examples?: I_WordExample[];
  related?: {
    synonyms?: string[];
    antonyms?: string[];
    compounds?: string[];
  };
  hskLevel?: number;
  category?: T_WordCategory;
  difficulty?: T_Difficulty;
  isActive?: boolean;
  metadata?: {
    tags?: string[];
    notes?: string;
    source?: string;
  };
}

// Filter and response interfaces
export interface I_WordFilters extends I_Filters {
  user?: string;
  category?: T_WordCategory;
  difficulty?: T_Difficulty;
  hskLevel?: number;
  isActive?: boolean;
}

export interface I_WordsResponse extends I_Response<I_Word> {}

// Types
export type T_WordCategory =
  | 'Basic'
  | 'Intermediate'
  | 'Advanced'
  | 'Business'
  | 'Academic'
  | 'Literary'
  | 'Informal';

// Admin table specific types
export type T_WordTableColumns = keyof I_Word;
export type T_WordSortField = 'chinese' | 'category' | 'hskLevel' | 'createdAt';
export type T_WordFilterType =
  | 'user'
  | 'category'
  | 'difficulty'
  | 'hskLevel'
  | 'isActive'
  | 'search';
