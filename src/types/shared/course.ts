import { I_BaseEntity, I_BaseRequest, I_Filters, I_Response } from './base';
import { T_Level } from './common';

// Import from lesson.ts to avoid circular dependency
import { I_LessonSimple } from './lesson';

// Course interfaces
export interface I_Course extends I_BaseEntity {
  title: string;
  description: string;
  level: T_CourseLevel;
  levelColor?: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple';
  image?: string;
  duration: string;
  order?: number;
  isNewCourse?: boolean;
  isPopular?: boolean;
  isActive?: boolean;
  metadata?: {
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    category?: T_CourseCategory;
    tags?: string[];
  };
  statistics?: {
    totalLessons: number;
    totalStudents: number;
    averageRating: number;
    completionRate: number;
  };
}

// Course for CourseDetails (with lessons)
export interface I_CourseDetail extends I_BaseEntity {
  title: string;
  description: string;
  level: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  thumbnail?: string;
  lessons: I_LessonSimple[];
}

// Course for Courses component (simplified)
export interface I_CourseSimple extends I_BaseEntity {
  title: string;
  description: string;
  level: T_CourseLevel;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  thumbnail?: string;
  // Additional properties for display
  image?: string;
  isNew?: boolean;
  isPopular?: boolean;
  levelColor?: string;
  rating?: number;
  students?: number;
  duration?: string;
}

// Request interfaces
export interface I_CreateCourseRequest extends I_BaseRequest {
  title: string;
  description: string;
  level: T_CourseLevel;
  levelColor?: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple';
  image?: string;
  duration: string;
  order?: number;
  isNewCourse?: boolean;
  isPopular?: boolean;
  isActive?: boolean;
  metadata?: {
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    category?: T_CourseCategory;
    tags?: string[];
  };
}

export interface I_UpdateCourseRequest extends I_BaseRequest {
  title?: string;
  description?: string;
  level?: T_CourseLevel;
  levelColor?: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple';
  image?: string;
  duration?: string;
  order?: number;
  isNewCourse?: boolean;
  isPopular?: boolean;
  isActive?: boolean;
  metadata?: {
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    category?: T_CourseCategory;
    tags?: string[];
  };
}

// Filter and response interfaces
export interface I_CourseFilters extends I_Filters {
  level?: T_CourseLevel;
  category?: T_CourseCategory;
  difficulty?: T_Level;
  isActive?: boolean;
}

export interface I_CoursesResponse extends I_Response<I_Course> {}

// Filter interface for course components
export interface I_Filter {
  key: string;
  label: string;
  count: number;
  metadata?: {
    color?: string;
    level?: number;
  };
}

// Types
export type T_CourseLevel =
  | 'HSK1'
  | 'HSK2'
  | 'HSK3'
  | 'HSK4'
  | 'HSK5'
  | 'HSK6'
  | 'Common'
  | 'Idiom'
  | 'Proverb'
  | 'Advanced'
  | 'Other'
  | 'Place Name'
  | 'Person Name'
  | 'Technical'
  | 'Literary'
  | 'Informal';

export type T_CourseCategory =
  | 'Grammar'
  | 'Vocabulary'
  | 'Listening'
  | 'Reading'
  | 'Writing'
  | 'Speaking'
  | 'Mixed';

// Admin table specific types
export type T_CourseTableColumns = keyof I_Course;
export type T_CourseSortField =
  | 'title'
  | 'level'
  | 'order'
  | 'createdAt'
  | 'duration';
export type T_CourseFilterType =
  | 'level'
  | 'category'
  | 'difficulty'
  | 'isActive'
  | 'search';
