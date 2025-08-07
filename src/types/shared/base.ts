// Base interfaces and generic patterns for the entire application

export interface I_BaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface I_BaseRequest {
  [key: string]: any;
}

export interface I_BaseResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface I_BasePagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// Generic patterns for CRUD operations
export type I_CreateRequest<T> = I_BaseRequest & {
  [K in keyof T]: T[K];
};

export type I_UpdateRequest<T> = I_BaseRequest & {
  [K in keyof T]?: T[K];
};

export interface I_Filters {
  search?: string;
  page?: number;
  limit?: number;
  isActive?: boolean;
}

export interface I_Response<T> {
  items: T[];
  pagination: I_BasePagination;
}

// Common table types for admin interfaces
export type T_TableColumns<T> = keyof T;
export type T_SortField<T> = keyof T;
export type T_FilterType = string;

// Common admin table patterns
export interface I_AdminTableProps<T> {
  data: T[];
  loading: boolean;
  pagination: I_BasePagination;
  filters: I_Filters;
  onFilterChange: (filters: I_Filters) => void;
  onSortChange: (field: T_SortField<T>, direction: 'asc' | 'desc') => void;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}
