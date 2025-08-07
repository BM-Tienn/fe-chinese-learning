import { BaseApi } from './baseApi';
import { API_ENDPOINTS } from '../config/api';

export interface Configuration {
  _id: string;
  type: 'filter' | 'topic' | 'wordType' | 'level' | 'category';
  key: string;
  label: string;
  count: number;
  isActive: boolean;
  order: number;
  metadata: {
    color?: string;
    icon?: string;
    description?: string;
    parentKey?: string;
    level?: number;
    difficulty?: string;
    category?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateConfigurationRequest {
  type: Configuration['type'];
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

export interface UpdateConfigurationRequest {
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

export interface ConfigurationFilters {
  type?: Configuration['type'];
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export class ConfigurationsApi extends BaseApi {
  constructor() {
    super(API_ENDPOINTS.CONFIGURATIONS.LIST.replace('/configurations', ''));
  }

  // Admin APIs
  /**
   * Lấy tất cả cấu hình (Admin)
   */
  async getAllConfigurations(filters?: ConfigurationFilters): Promise<{
    configurations: Configuration[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get('/configurations', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải danh sách cấu hình',
      );
    }
  }

  /**
   * Lấy chi tiết cấu hình theo ID (Admin)
   */
  async getConfigurationById(id: string): Promise<Configuration> {
    try {
      return await this.get<Configuration>(`/configurations/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải chi tiết cấu hình',
      );
    }
  }

  /**
   * Tạo cấu hình mới (Admin)
   */
  async createConfiguration(
    data: CreateConfigurationRequest,
  ): Promise<Configuration> {
    try {
      return await this.post<Configuration>('/configurations', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo cấu hình mới',
      );
    }
  }

  /**
   * Cập nhật cấu hình (Admin)
   */
  async updateConfiguration(
    id: string,
    data: UpdateConfigurationRequest,
  ): Promise<Configuration> {
    try {
      return await this.patch<Configuration>(`/configurations/${id}`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật cấu hình',
      );
    }
  }

  /**
   * Xóa cấu hình (Admin)
   */
  async deleteConfiguration(id: string): Promise<any> {
    try {
      return await this.delete(`/configurations/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể xóa cấu hình',
      );
    }
  }

  /**
   * Kích hoạt/vô hiệu hóa cấu hình (Admin)
   */
  async toggleConfigurationStatus(
    id: string,
    isActive: boolean,
  ): Promise<Configuration> {
    try {
      return await this.patch<Configuration>(`/configurations/${id}/status`, {
        isActive,
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể thay đổi trạng thái cấu hình',
      );
    }
  }

  /**
   * Cập nhật thứ tự cấu hình (Admin)
   */
  async updateConfigurationOrder(
    id: string,
    order: number,
  ): Promise<Configuration> {
    try {
      return await this.patch<Configuration>(`/configurations/${id}/order`, {
        order,
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật thứ tự cấu hình',
      );
    }
  }

  /**
   * Cập nhật số lượng cấu hình (Admin)
   */
  async updateConfigurationCount(
    id: string,
    count: number,
  ): Promise<Configuration> {
    try {
      return await this.patch<Configuration>(`/configurations/${id}/count`, {
        count,
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật số lượng cấu hình',
      );
    }
  }

  /**
   * Lấy cấu hình theo type (Admin)
   */
  async getConfigurationsByType(
    type: Configuration['type'],
  ): Promise<Configuration[]> {
    try {
      return await this.get<Configuration[]>(`/configurations/type/${type}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải cấu hình theo loại',
      );
    }
  }

  // User APIs (existing)
  /**
   * Lấy tất cả cấu hình cho user
   */
  async getConfigurations(): Promise<Configuration[]> {
    try {
      return await this.get<Configuration[]>('/configurations');
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải cấu hình',
      );
    }
  }

  /**
   * Lấy cấu hình theo type cho user
   */
  async getConfigurationsByTypeForUser(
    type: Configuration['type'],
  ): Promise<Configuration[]> {
    try {
      return await this.get<Configuration[]>(`/configurations/type/${type}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải cấu hình theo loại',
      );
    }
  }
}

const configurationsApi = new ConfigurationsApi();
export default configurationsApi;
