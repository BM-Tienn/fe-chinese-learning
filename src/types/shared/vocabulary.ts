import { I_BaseEntity, I_BaseRequest, I_Filters, I_Response } from './base';
import { T_Difficulty } from './common';

// Vocabulary interfaces
export interface I_Vocabulary extends I_BaseEntity {
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
  examples?: I_VocabularyExample[];
  related?: {
    synonyms?: string[];
    antonyms?: string[];
    compounds?: string[];
  };
  hskLevel?: number;
  category: T_VocabularyCategory;
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
  };
}

export interface I_VocabularyExample {
  chinese: string;
  pinyin: string;
  vietnamese: string;
  audio?: string;
}

// Request interfaces
export interface I_CreateVocabularyRequest extends I_BaseRequest {
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
  examples?: I_VocabularyExample[];
  related?: {
    synonyms?: string[];
    antonyms?: string[];
    compounds?: string[];
  };
  hskLevel?: number;
  category: T_VocabularyCategory;
  difficulty?: T_Difficulty;
  isActive?: boolean;
  metadata?: {
    tags?: string[];
    notes?: string;
    source?: string;
  };
}

export interface I_UpdateVocabularyRequest extends I_BaseRequest {
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
  examples?: I_VocabularyExample[];
  related?: {
    synonyms?: string[];
    antonyms?: string[];
    compounds?: string[];
  };
  hskLevel?: number;
  category?: T_VocabularyCategory;
  difficulty?: T_Difficulty;
  isActive?: boolean;
  metadata?: {
    tags?: string[];
    notes?: string;
    source?: string;
  };
}

// Filter and response interfaces
export interface I_VocabularyFilters extends I_Filters {
  category?: T_VocabularyCategory;
  difficulty?: T_Difficulty;
  hskLevel?: number;
  isActive?: boolean;
}

export interface I_VocabulariesResponse extends I_Response<I_Vocabulary> {}

// Types
export type T_VocabularyCategory =
  | 'Basic'
  | 'Intermediate'
  | 'Advanced'
  | 'Business'
  | 'Academic'
  | 'Literary'
  | 'Informal';

// Admin table specific types
export type T_VocabularyTableColumns = keyof I_Vocabulary;
export type T_VocabularySortField =
  | 'chinese'
  | 'category'
  | 'hskLevel'
  | 'createdAt';
export type T_VocabularyFilterType =
  | 'category'
  | 'difficulty'
  | 'hskLevel'
  | 'isActive'
  | 'search';
