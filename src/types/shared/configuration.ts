import { I_BaseEntity, I_BaseRequest, I_Filters, I_Response } from './base';
import { T_ConfigurationType } from './common';

// Configuration interfaces
export interface I_Configuration extends I_BaseEntity {
  type: T_ConfigurationType;
  key: string;
  label: string;
  count?: number;
  isActive?: boolean;
  order?: number;
  metadata?: {
    color?: string;
    icon?: string;
    description?: string;
    parentKey?: string;
    level?: number;
    difficulty?: string;
    category?: string;
  };
}

// Request interfaces
export interface I_CreateConfigurationRequest extends I_BaseRequest {
  type: T_ConfigurationType;
  key: string;
  label: string;
  count?: number;
  isActive?: boolean;
  order?: number;
  metadata?: {
    color?: string;
    icon?: string;
    description?: string;
    parentKey?: string;
    level?: number;
    difficulty?: string;
    category?: string;
  };
}

export interface I_UpdateConfigurationRequest extends I_BaseRequest {
  key?: string;
  label?: string;
  count?: number;
  isActive?: boolean;
  order?: number;
  metadata?: {
    color?: string;
    icon?: string;
    description?: string;
    parentKey?: string;
    level?: number;
    difficulty?: string;
    category?: string;
  };
}

// Filter and response interfaces
export interface I_ConfigurationFilters extends I_Filters {
  type?: T_ConfigurationType;
  isActive?: boolean;
}

export interface I_ConfigurationsResponse extends I_Response<I_Configuration> {}

// Admin table specific types
export type T_ConfigurationTableColumns = keyof I_Configuration;
export type T_ConfigurationSortField =
  | 'key'
  | 'label'
  | 'type'
  | 'order'
  | 'createdAt';
export type T_ConfigurationFilterType = 'type' | 'isActive' | 'search';
