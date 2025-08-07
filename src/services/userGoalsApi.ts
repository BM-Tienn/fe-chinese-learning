import { BaseApi } from './baseApi';
import { API_ENDPOINTS } from '../config/api';

export interface UserGoal {
  _id: string;
  user: string; // User ID
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  category:
    | 'new_words'
    | 'characters'
    | 'listening'
    | 'reading'
    | 'writing'
    | 'speaking'
    | 'mixed';
  label: string;
  current: number;
  total: number;
  unit: 'từ' | 'chữ' | 'bài' | 'phút' | 'điểm';
  color: 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'yellow';
  icon: string; // Lucide icon name
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  isActive: boolean;
  progress: number;
  metadata: {
    description?: string;
    notes?: string;
    reminders?: Array<{
      time: string;
      message: string;
      isSent: boolean;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserGoalRequest {
  type: UserGoal['type'];
  category: UserGoal['category'];
  label: string;
  total: number;
  unit: UserGoal['unit'];
  color?: UserGoal['color'];
  icon?: string;
  endDate: string;
  isActive?: boolean;
  metadata?: {
    description?: string;
    notes?: string;
    reminders?: Array<{
      time: string;
      message: string;
    }>;
  };
}

export interface UpdateUserGoalRequest {
  label?: string;
  total?: number;
  current?: number;
  unit?: UserGoal['unit'];
  color?: UserGoal['color'];
  icon?: string;
  endDate?: string;
  isActive?: boolean;
  metadata?: {
    description?: string;
    notes?: string;
    reminders?: Array<{
      time: string;
      message: string;
    }>;
  };
}

export interface UserGoalFilters {
  user?: string;
  type?: UserGoal['type'];
  category?: UserGoal['category'];
  isCompleted?: boolean;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export class UserGoalsApi extends BaseApi {
  constructor() {
    super(API_ENDPOINTS.COURSES.LIST.replace('/courses', ''));
  }

  // Admin APIs
  /**
   * Lấy tất cả mục tiêu học tập (Admin)
   */
  async getAllUserGoals(filters?: UserGoalFilters): Promise<{
    userGoals: UserGoal[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get('/user-goals', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải danh sách mục tiêu học tập',
      );
    }
  }

  /**
   * Lấy chi tiết mục tiêu học tập theo ID (Admin)
   */
  async getUserGoalById(id: string): Promise<UserGoal> {
    try {
      return await this.get<UserGoal>(`/user-goals/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải chi tiết mục tiêu học tập',
      );
    }
  }

  /**
   * Tạo mục tiêu học tập mới (Admin)
   */
  async createUserGoal(data: CreateUserGoalRequest): Promise<UserGoal> {
    try {
      return await this.post<UserGoal>('/user-goals', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo mục tiêu học tập mới',
      );
    }
  }

  /**
   * Cập nhật mục tiêu học tập (Admin)
   */
  async updateUserGoal(
    id: string,
    data: UpdateUserGoalRequest,
  ): Promise<UserGoal> {
    try {
      return await this.patch<UserGoal>(`/user-goals/${id}`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật mục tiêu học tập',
      );
    }
  }

  /**
   * Xóa mục tiêu học tập (Admin)
   */
  async deleteUserGoal(id: string): Promise<any> {
    try {
      return await this.delete(`/user-goals/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể xóa mục tiêu học tập',
      );
    }
  }

  /**
   * Kích hoạt/vô hiệu hóa mục tiêu học tập (Admin)
   */
  async toggleUserGoalStatus(id: string, isActive: boolean): Promise<UserGoal> {
    try {
      return await this.patch<UserGoal>(`/user-goals/${id}/status`, {
        isActive,
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể thay đổi trạng thái mục tiêu học tập',
      );
    }
  }

  /**
   * Cập nhật tiến độ mục tiêu học tập (Admin)
   */
  async updateUserGoalProgress(id: string, current: number): Promise<UserGoal> {
    try {
      return await this.patch<UserGoal>(`/user-goals/${id}/progress`, {
        current,
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể cập nhật tiến độ mục tiêu học tập',
      );
    }
  }

  /**
   * Lấy mục tiêu học tập theo user (Admin)
   */
  async getUserGoalsByUser(
    userId: string,
    filters?: UserGoalFilters,
  ): Promise<{
    userGoals: UserGoal[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get(`/users/${userId}/goals`, filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải mục tiêu học tập theo user',
      );
    }
  }

  /**
   * Lấy thống kê mục tiêu học tập (Admin)
   */
  async getAdminUserGoalStats(filters?: UserGoalFilters): Promise<{
    totalGoals: number;
    completedGoals: number;
    activeGoals: number;
    averageProgress: number;
    averageCompletionRate: number;
  }> {
    try {
      return await this.get('/user-goals/stats', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải thống kê mục tiêu học tập',
      );
    }
  }

  // User APIs
  /**
   * Lấy mục tiêu học tập của user hiện tại
   */
  async getUserGoals(filters?: UserGoalFilters): Promise<UserGoal[]> {
    try {
      return await this.get<UserGoal[]>('/user-goals/user', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải mục tiêu học tập',
      );
    }
  }

  /**
   * Lấy chi tiết mục tiêu học tập
   */
  async getUserGoal(id: string): Promise<UserGoal> {
    try {
      return await this.get<UserGoal>(`/user-goals/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải chi tiết mục tiêu học tập',
      );
    }
  }

  /**
   * Tạo mục tiêu học tập mới cho user hiện tại
   */
  async createGoal(data: CreateUserGoalRequest): Promise<UserGoal> {
    try {
      return await this.post<UserGoal>('/user-goals', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo mục tiêu học tập mới',
      );
    }
  }

  /**
   * Cập nhật mục tiêu học tập của user hiện tại
   */
  async updateGoal(id: string, data: UpdateUserGoalRequest): Promise<UserGoal> {
    try {
      return await this.patch<UserGoal>(`/user-goals/${id}`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật mục tiêu học tập',
      );
    }
  }

  /**
   * Xóa mục tiêu học tập của user hiện tại
   */
  async deleteGoal(id: string): Promise<any> {
    try {
      return await this.delete(`/user-goals/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể xóa mục tiêu học tập',
      );
    }
  }

  /**
   * Cập nhật tiến độ mục tiêu học tập của user hiện tại
   */
  async updateGoalProgress(id: string, current: number): Promise<UserGoal> {
    try {
      return await this.patch<UserGoal>(`/user-goals/${id}/progress`, {
        current,
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể cập nhật tiến độ mục tiêu học tập',
      );
    }
  }

  /**
   * Lấy thống kê mục tiêu học tập của user hiện tại
   */
  async getUserGoalStats(): Promise<{
    totalGoals: number;
    completedGoals: number;
    activeGoals: number;
    averageProgress: number;
    averageCompletionRate: number;
  }> {
    try {
      return await this.get('/user-goals/user/stats');
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải thống kê mục tiêu học tập',
      );
    }
  }
}

const userGoalsApi = new UserGoalsApi();
export default userGoalsApi;
