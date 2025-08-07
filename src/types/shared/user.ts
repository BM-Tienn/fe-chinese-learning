import { I_BaseEntity, I_BaseRequest, I_Filters, I_Response } from './base';
import { T_UserRole, T_Gender } from './common';

// User interfaces
export interface I_User extends I_BaseEntity {
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: T_UserRole;
  isActive: boolean;
  lastLogin?: string;
  profile?: {
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: T_Gender;
    bio?: string;
    preferences?: {
      language?: string;
      theme?: string;
      notifications?: boolean;
    };
  };
  statistics?: {
    totalCourses: number;
    completedCourses: number;
    totalLessons: number;
    completedLessons: number;
    totalStudyTime: number;
    averageScore: number;
  };
}

// Request interfaces
export interface I_CreateUserRequest extends I_BaseRequest {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: T_UserRole;
  isActive?: boolean;
  profile?: {
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: T_Gender;
    bio?: string;
    preferences?: {
      language?: string;
      theme?: string;
      notifications?: boolean;
    };
  };
}

export interface I_UpdateUserRequest extends I_BaseRequest {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role?: T_UserRole;
  isActive?: boolean;
  profile?: {
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: T_Gender;
    bio?: string;
    preferences?: {
      language?: string;
      theme?: string;
      notifications?: boolean;
    };
  };
}

// Filter and response interfaces
export interface I_UserFilters extends I_Filters {
  role?: T_UserRole;
  isActive?: boolean;
}

export interface I_UsersResponse extends I_Response<I_User> {}

// Admin table specific types
export type T_UserTableColumns = keyof I_User;
export type T_UserSortField =
  | 'email'
  | 'username'
  | 'role'
  | 'createdAt'
  | 'lastLogin';
export type T_UserFilterType = 'role' | 'isActive' | 'search';
