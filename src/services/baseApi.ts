import axios from 'utils/axios';
import {
  ApiResponse,
  ErrorResponse,
  PaginatedResponse,
  SingleItemResponse,
} from '../types/common';

export abstract class BaseApi {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Thực hiện GET request
   */
  protected async get<T = any>(endpoint: string, params?: any): Promise<T> {
    try {
      const response = await axios.get<
        ApiResponse<T> | PaginatedResponse<T> | SingleItemResponse<T>
      >(`${this.baseUrl}${endpoint}`, { params });
      // Handle different response structures based on backend apiResponse.js
      // if (
      //   response.data.data &&
      //   typeof response.data.data === 'object' &&
      //   response.data.data !== null
      // ) {
      //   const data = response.data.data as any;
      //   if ('items' in data) {
      //     // Paginated response with items array (ApiResponse.success)
      //     return data.items as T;
      //   } else if ('item' in data) {
      //     // Single item response (ApiResponse.successSingle)
      //     return data.item as T;
      //   }
      // }

      // Direct data response
      return response.data.data as T;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Thực hiện POST request
   */
  protected async post<T = any>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await axios.post<ApiResponse<T> | SingleItemResponse<T>>(
        `${this.baseUrl}${endpoint}`,
        data,
      );

      // Handle response structure
      // if (
      //   response.data.data &&
      //   typeof response.data.data === 'object' &&
      //   response.data.data !== null
      // ) {
      //   const data = response.data.data as any;
      //   if ('item' in data) {
      //     return data.item as T;
      //   }
      // }

      return response.data.data as T;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Thực hiện PUT request
   */
  protected async put<T = any>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await axios.put<ApiResponse<T> | SingleItemResponse<T>>(
        `${this.baseUrl}${endpoint}`,
        data,
      );

      // Handle response structure
      // if (
      //   response.data.data &&
      //   typeof response.data.data === 'object' &&
      //   response.data.data !== null
      // ) {
      //   const data = response.data.data as any;
      //   if ('item' in data) {
      //     return data.item as T;
      //   }
      // }

      return response.data.data as T;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Thực hiện PATCH request
   */
  protected async patch<T = any>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await axios.patch<
        ApiResponse<T> | SingleItemResponse<T>
      >(`${this.baseUrl}${endpoint}`, data);

      // Handle response structure
      // if (
      //   response.data.data &&
      //   typeof response.data.data === 'object' &&
      //   response.data.data !== null
      // ) {
      //   const data = response.data.data as any;
      //   if ('item' in data) {
      //     return data.item as T;
      //   }
      // }

      return response.data.data as T;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Thực hiện DELETE request
   */
  protected async delete<T = any>(endpoint: string): Promise<T> {
    try {
      const response = await axios.delete<
        ApiResponse<T> | SingleItemResponse<T>
      >(`${this.baseUrl}${endpoint}`);

      // Handle response structure
      // if (
      //   response.data.data &&
      //   typeof response.data.data === 'object' &&
      //   response.data.data !== null
      // ) {
      //   const data = response.data.data as any;
      //   if ('item' in data) {
      //     return data.item as T;
      //   }
      // }

      return response.data.data as T;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Xử lý lỗi chung
   */
  protected handleError(error: any): void {
    if (error.response) {
      // Server trả về response với status code lỗi
      const errorData = error.response.data as ErrorResponse;

      if (errorData.error && errorData.error.message) {
        // Sử dụng cấu trúc ErrorResponse từ backend
        throw new Error(errorData.error.message || 'Đã xảy ra lỗi');
      } else {
        // Fallback mặc định
        throw new Error('Đã xảy ra lỗi');
      }
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      throw new Error('Không thể kết nối đến server');
    } else {
      // Lỗi khác
      throw new Error('Đã xảy ra lỗi không xác định');
    }
  }

  /**
   * Tạo URL với parameters
   */
  protected buildUrl(endpoint: string, params?: Record<string, any>): string {
    if (!params) return `${this.baseUrl}${endpoint}`;

    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    const queryString = queryParams.toString();
    return `${this.baseUrl}${endpoint}${queryString ? `?${queryString}` : ''}`;
  }
}
