// Admin User types using shared interfaces

import {
  I_BaseEntity,
  I_CreateRequest,
  I_UpdateRequest,
  I_Filters,
  I_Response,
  T_TableColumns,
  T_SortField,
} from '../shared/base';
import {
  T_UserRole,
  T_Gender,
  T_Theme,
  T_Language,
  E_UserRole,
  E_Gender,
  E_Theme,
  E_Language,
} from '../shared/common';
import { I_UserMetadata } from '../shared/metadata';
import { I_UserStatistics } from '../shared/statistics';

// User interface
export interface I_User extends I_BaseEntity {
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: T_UserRole;
  isActive: boolean;
  lastLogin?: string;
  profile?: I_UserProfile;
  statistics?: I_UserStatistics;
  metadata?: I_UserMetadata;
}

// User profile interface
export interface I_UserProfile {
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: T_Gender;
  bio?: string;
  preferences?: I_UserPreferences;
}

// User preferences interface
export interface I_UserPreferences {
  language?: T_Language;
  theme?: T_Theme;
  notifications?: boolean;
  dailyGoal?: number;
}

// Request/Response types using generic patterns
export type I_CreateUserRequest = I_CreateRequest<I_User>;
export type I_UpdateUserRequest = I_UpdateRequest<I_User>;

// Filters interface
export interface I_UserFilters extends I_Filters {
  role?: T_UserRole;
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

// Response interface
export type I_UsersResponse = I_Response<I_User>;

// Admin table specific types
export type T_UserTableColumns = T_TableColumns<I_User>;
export type T_UserSortField = T_SortField<I_User>;
export type T_UserFilterType = 'role' | 'isActive' | 'search';

// Re-export enums for convenience
export { E_UserRole, E_Gender, E_Theme, E_Language };
