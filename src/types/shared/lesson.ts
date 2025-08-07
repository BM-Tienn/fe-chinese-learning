import { I_BaseEntity, I_BaseRequest, I_Filters, I_Response } from './base';
import { T_Difficulty } from './common';
import { I_Vocabulary } from './vocabulary';

// Lesson interfaces
export interface I_Lesson extends I_BaseEntity {
  title: string;
  subtitle?: string;
  course: string;
  level: 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6';
  order: number;
  image?: string;
  content: string;
  vocabulary?: string[];
  grammar?: Array<{
    title: string;
    explanation: string;
    examples: Array<{
      chinese: string;
      pinyin: string;
      vietnamese: string;
    }>;
  }>;
  exercises?: Array<{
    type:
      | 'multiple_choice'
      | 'fill_blank'
      | 'matching'
      | 'listening'
      | 'writing';
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    points: number;
  }>;
  estimatedTime?: number;
  difficulty?: T_Difficulty;
  isActive?: boolean;
  metadata?: {
    tags?: string[];
    prerequisites?: string[];
    learningObjectives?: string[];
  };
  statistics?: {
    totalStudents: number;
    averageScore: number;
    completionRate: number;
    averageTime: number;
  };
}

// Lesson for CourseDetails (simplified version)
export interface I_LessonSimple extends I_BaseEntity {
  title: string;
  description: string;
  content: string;
  order: number;
  duration: number;
  isCompleted: boolean;
  vocabulary: string[];
  grammar: string[];
  exercises: any[];
}

// Lesson for Lesson component (with detailed vocabulary and grammar)
export interface I_LessonData extends I_BaseEntity {
  title: string;
  description: string;
  content: string;
  order: number;
  duration: number;
  isCompleted: boolean;
  vocabulary: I_Vocabulary[];
  grammar: I_Grammar[];
  exercises: I_Exercise[];
}

// Supporting interfaces
export interface I_LessonVocabulary {
  char: string;
  pinyin: string;
  translation: string;
  pronunciation?: string;
}

export interface I_Grammar {
  title: string;
  description: string;
  examples: string[];
}

export interface I_Exercise {
  type: 'multiple-choice' | 'fill-in-blank' | 'pinyin-writing';
  question: string;
  options?: string[];
  answer: string;
  sentence_parts?: string[];
  char?: string;
}

// Request interfaces
export interface I_CreateLessonRequest extends I_BaseRequest {
  title: string;
  subtitle?: string;
  course: string;
  level: 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6';
  order: number;
  image?: string;
  content: string;
  vocabulary?: string[];
  grammar?: Array<{
    title: string;
    explanation: string;
    examples: Array<{
      chinese: string;
      pinyin: string;
      vietnamese: string;
    }>;
  }>;
  exercises?: Array<{
    type:
      | 'multiple_choice'
      | 'fill_blank'
      | 'matching'
      | 'listening'
      | 'writing';
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    points: number;
  }>;
  estimatedTime?: number;
  difficulty?: T_Difficulty;
  isActive?: boolean;
  metadata?: {
    tags?: string[];
    prerequisites?: string[];
    learningObjectives?: string[];
  };
}

export interface I_UpdateLessonRequest extends I_BaseRequest {
  title?: string;
  subtitle?: string;
  course?: string;
  level?: 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6';
  order?: number;
  image?: string;
  content?: string;
  vocabulary?: string[];
  grammar?: Array<{
    title: string;
    explanation: string;
    examples: Array<{
      chinese: string;
      pinyin: string;
      vietnamese: string;
    }>;
  }>;
  exercises?: Array<{
    type:
      | 'multiple_choice'
      | 'fill_blank'
      | 'matching'
      | 'listening'
      | 'writing';
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    points: number;
  }>;
  estimatedTime?: number;
  difficulty?: T_Difficulty;
  isActive?: boolean;
  metadata?: {
    tags?: string[];
    prerequisites?: string[];
    learningObjectives?: string[];
  };
}

// Filter and response interfaces
export interface I_LessonFilters extends I_Filters {
  course?: string;
  level?: 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6';
  difficulty?: T_Difficulty;
  isActive?: boolean;
}

export interface I_LessonsResponse extends I_Response<I_Lesson> {}

// Admin table specific types
export type T_LessonTableColumns = keyof I_Lesson;
export type T_LessonSortField =
  | 'title'
  | 'level'
  | 'order'
  | 'createdAt'
  | 'estimatedTime';
export type T_LessonFilterType =
  | 'course'
  | 'level'
  | 'difficulty'
  | 'isActive'
  | 'search';
