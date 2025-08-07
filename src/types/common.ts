// Common types used across the application

export type Level =
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

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Theme = 'light' | 'dark';

export type Gender = 'male' | 'female' | 'other';

// API Response types - phù hợp với backend apiResponse.js
export interface ApiResponse<T = any> {
  status: string;
  message: string;
  data: T;
}

// Response cho danh sách items (có pagination)
export interface PaginatedResponse<T = any> {
  status: string;
  message: string;
  data: {
    items: T[];
    pagination: {
      page: number;
      limit: number;
      count: number;
      pageTotal: number;
    };
  };
}

// Response cho single item
export interface SingleItemResponse<T = any> {
  status: string;
  message: string;
  data: {
    item: T;
  };
}

export interface ErrorResponse {
  status: string;
  error: {
    message: string;
    details?: string;
  };
}
