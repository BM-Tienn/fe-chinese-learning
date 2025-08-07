import { BaseApi } from './baseApi';
import { API_ENDPOINTS } from '../config/api';

export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  active: boolean;
  passwordChangedAt?: string;
  passwordResetToken?: string;
  passwordResetExpires?: string;
  learningProfile: {
    currentLevel: 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6';
    totalStudyTime: number; // in minutes
    totalWordsLearned: number;
    totalLessonsCompleted: number;
    streak: number;
    bestStreak: number;
    lastStudyDate?: string;
  };
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: 'vi' | 'en';
    notifications: boolean;
    dailyGoal: number; // minutes
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role?: 'user' | 'admin';
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  role?: 'user' | 'admin';
  active?: boolean;
  learningProfile?: {
    currentLevel?: 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6';
    totalStudyTime?: number;
    totalWordsLearned?: number;
    totalLessonsCompleted?: number;
    streak?: number;
    bestStreak?: number;
    lastStudyDate?: string;
  };
  preferences?: {
    theme?: 'light' | 'dark' | 'auto';
    language?: 'vi' | 'en';
    notifications?: boolean;
    dailyGoal?: number;
  };
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  avatar?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdatePreferencesRequest {
  language?: string;
  theme?: 'light' | 'dark';
  notifications?: boolean;
  studyReminders?: boolean;
}

export class UsersApi extends BaseApi {
  constructor() {
    super(API_ENDPOINTS.USERS.ME.replace('/users/me', ''));
  }

  // Admin APIs
  /**
   * Lấy tất cả người dùng (Admin only)
   */
  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    active?: boolean;
  }): Promise<{
    users: User[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get('/users', params);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải danh sách người dùng',
      );
    }
  }

  /**
   * Lấy thông tin người dùng theo ID (Admin only)
   */
  async getUserById(id: string): Promise<User> {
    try {
      return await this.get<User>(`/users/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải thông tin người dùng',
      );
    }
  }

  /**
   * Tạo người dùng mới (Admin only)
   */
  async createUser(data: CreateUserRequest): Promise<User> {
    try {
      return await this.post<User>('/users', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo người dùng mới',
      );
    }
  }

  /**
   * Cập nhật người dùng (Admin only)
   */
  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    try {
      return await this.patch<User>(`/users/${id}`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật người dùng',
      );
    }
  }

  /**
   * Xóa người dùng (Admin only)
   */
  async deleteUser(id: string): Promise<any> {
    try {
      return await this.delete(`/users/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể xóa người dùng',
      );
    }
  }

  /**
   * Kích hoạt/vô hiệu hóa người dùng (Admin only)
   */
  async toggleUserStatus(id: string, active: boolean): Promise<User> {
    try {
      return await this.patch<User>(`/users/${id}/status`, { active });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể thay đổi trạng thái người dùng',
      );
    }
  }

  /**
   * Reset mật khẩu người dùng (Admin only)
   */
  async resetUserPassword(id: string): Promise<any> {
    try {
      return await this.post(`/users/${id}/reset-password`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể reset mật khẩu',
      );
    }
  }

  // User APIs (existing)
  /**
   * Lấy thông tin người dùng hiện tại
   */
  async getCurrentUser(): Promise<User> {
    try {
      return await this.get<User>('/users/me');
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải thông tin người dùng',
      );
    }
  }

  /**
   * Cập nhật thông tin cá nhân
   */
  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    try {
      return await this.patch<User>('/users/updateMe', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật thông tin cá nhân',
      );
    }
  }

  /**
   * Thay đổi mật khẩu
   */
  async changePassword(data: ChangePasswordRequest): Promise<any> {
    try {
      return await this.post('/users/changePassword', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể thay đổi mật khẩu',
      );
    }
  }

  /**
   * Cập nhật preferences
   */
  async updatePreferences(data: UpdatePreferencesRequest): Promise<User> {
    try {
      return await this.patch<User>('/users/preferences', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật cài đặt',
      );
    }
  }

  /**
   * Upload avatar
   */
  async uploadAvatar(file: File): Promise<{ avatar: string }> {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      return await this.post<{ avatar: string }>('/users/avatar', formData);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể upload avatar',
      );
    }
  }

  /**
   * Xóa avatar
   */
  async deleteAvatar(): Promise<any> {
    try {
      return await this.delete('/users/avatar');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể xóa avatar');
    }
  }

  /**
   * Lấy thống kê học tập của người dùng
   */
  async getUserStats(): Promise<{
    totalStudyTime: number;
    totalWordsLearned: number;
    totalLessonsCompleted: number;
    currentStreak: number;
    longestStreak: number;
    weeklyProgress: Array<{
      date: string;
      studyTime: number;
      wordsLearned: number;
      lessonsCompleted: number;
    }>;
  }> {
    try {
      return await this.get('/users/stats');
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải thống kê học tập',
      );
    }
  }

  /**
   * Lấy lịch sử hoạt động
   */
  async getActivityHistory(
    page?: number,
    limit?: number,
  ): Promise<{
    activities: Array<{
      _id: string;
      type: string;
      description: string;
      timestamp: string;
      metadata?: any;
    }>;
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      const params = { page, limit };
      return await this.get('/users/activity-history', params);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải lịch sử hoạt động',
      );
    }
  }

  /**
   * Xóa tài khoản
   */
  async deleteAccount(password: string): Promise<any> {
    try {
      return await this.post('/users/delete-account', { password });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể xóa tài khoản',
      );
    }
  }
}

const usersApi = new UsersApi();
export default usersApi;
