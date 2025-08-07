import { I_BaseEntity, I_BaseRequest, I_Filters, I_Response } from './base';
import { T_UserGoalType } from './common';

// User Goal interfaces
export interface I_UserGoal extends I_BaseEntity {
  user: string;
  label: string;
  type: T_UserGoalType;
  category: T_UserGoalCategory;
  total: number;
  current: number;
  unit: string;
  color?: string;
  icon?: string;
  endDate?: string;
  isActive: boolean;
  metadata?: {
    description?: string;
    notes?: string;
    reminders?: boolean;
  };
  statistics?: {
    completionRate: number;
    daysRemaining?: number;
    averageProgress: number;
    lastUpdated?: string;
  };
}

// Request interfaces
export interface I_CreateUserGoalRequest extends I_BaseRequest {
  user: string;
  label: string;
  type: T_UserGoalType;
  category: T_UserGoalCategory;
  total: number;
  current?: number;
  unit: string;
  color?: string;
  icon?: string;
  endDate?: string;
  isActive?: boolean;
  metadata?: {
    description?: string;
    notes?: string;
    reminders?: boolean;
  };
}

export interface I_UpdateUserGoalRequest extends I_BaseRequest {
  label?: string;
  type?: T_UserGoalType;
  category?: T_UserGoalCategory;
  total?: number;
  current?: number;
  unit?: string;
  color?: string;
  icon?: string;
  endDate?: string;
  isActive?: boolean;
  metadata?: {
    description?: string;
    notes?: string;
    reminders?: boolean;
  };
}

// Filter and response interfaces
export interface I_UserGoalFilters extends I_Filters {
  user?: string;
  type?: T_UserGoalType;
  category?: T_UserGoalCategory;
  isActive?: boolean;
}

export interface I_UserGoalsResponse extends I_Response<I_UserGoal> {}

// Types
export type T_UserGoalCategory =
  | 'study'
  | 'vocabulary'
  | 'grammar'
  | 'listening'
  | 'reading'
  | 'writing'
  | 'speaking'
  | 'custom';

// Admin table specific types
export type T_UserGoalTableColumns = keyof I_UserGoal;
export type T_UserGoalSortField =
  | 'label'
  | 'type'
  | 'category'
  | 'total'
  | 'current'
  | 'createdAt';
export type T_UserGoalFilterType =
  | 'user'
  | 'type'
  | 'category'
  | 'isActive'
  | 'search';
