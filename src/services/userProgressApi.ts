import { BaseApi } from './baseApi';
import { API_ENDPOINTS } from '../config/api';

export interface UserProgress {
  _id: string;
  user: string; // User ID
  course: string; // Course ID
  lesson?: string; // Lesson ID
  flashcardSet?: string; // FlashcardSet ID
  progress: number;
  score: number;
  timeSpent: number; // in minutes
  completedAt?: string;
  isCompleted: boolean;
  lastStudied: string;
  studySessions: Array<{
    date: string;
    duration: number; // in minutes
    score: number;
    progress: number;
  }>;
  metadata: {
    mastery: number;
    attempts: number;
    streak: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserProgressRequest {
  course: string;
  lesson?: string;
  flashcardSet?: string;
  progress?: number;
  score?: number;
  timeSpent?: number;
  metadata?: {
    mastery?: number;
    attempts?: number;
    streak?: number;
  };
}

export interface UpdateUserProgressRequest {
  progress?: number;
  score?: number;
  timeSpent?: number;
  completedAt?: string;
  isCompleted?: boolean;
  lastStudied?: string;
  studySessions?: Array<{
    date: string;
    duration: number;
    score: number;
    progress: number;
  }>;
  metadata?: {
    mastery?: number;
    attempts?: number;
    streak?: number;
  };
}

export interface UserProgressFilters {
  user?: string;
  course?: string;
  lesson?: string;
  flashcardSet?: string;
  isCompleted?: boolean;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export class UserProgressApi extends BaseApi {
  constructor() {
    super(API_ENDPOINTS.COURSES.LIST.replace('/courses', ''));
  }

  // Admin APIs
  /**
   * Lấy tất cả tiến độ học tập (Admin)
   */
  async getAllUserProgress(filters?: UserProgressFilters): Promise<{
    userProgress: UserProgress[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get('/user-progress', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải danh sách tiến độ học tập',
      );
    }
  }

  /**
   * Lấy chi tiết tiến độ học tập theo ID (Admin)
   */
  async getUserProgressById(id: string): Promise<UserProgress> {
    try {
      return await this.get<UserProgress>(`/user-progress/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải chi tiết tiến độ học tập',
      );
    }
  }

  /**
   * Tạo tiến độ học tập mới (Admin)
   */
  async createUserProgress(
    data: CreateUserProgressRequest,
  ): Promise<UserProgress> {
    try {
      return await this.post<UserProgress>('/user-progress', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo tiến độ học tập mới',
      );
    }
  }

  /**
   * Cập nhật tiến độ học tập (Admin)
   */
  async updateUserProgress(
    id: string,
    data: UpdateUserProgressRequest,
  ): Promise<UserProgress> {
    try {
      return await this.patch<UserProgress>(`/user-progress/${id}`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật tiến độ học tập',
      );
    }
  }

  /**
   * Xóa tiến độ học tập (Admin)
   */
  async deleteUserProgress(id: string): Promise<any> {
    try {
      return await this.delete(`/user-progress/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể xóa tiến độ học tập',
      );
    }
  }

  /**
   * Lấy tiến độ học tập theo user (Admin)
   */
  async getUserProgressByUser(
    userId: string,
    filters?: UserProgressFilters,
  ): Promise<{
    userProgress: UserProgress[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get(`/users/${userId}/progress`, filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải tiến độ học tập theo user',
      );
    }
  }

  /**
   * Lấy tiến độ học tập theo course (Admin)
   */
  async getUserProgressByCourse(
    courseId: string,
    filters?: UserProgressFilters,
  ): Promise<{
    userProgress: UserProgress[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get(`/courses/${courseId}/progress`, filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải tiến độ học tập theo course',
      );
    }
  }

  /**
   * Lấy thống kê tiến độ học tập (Admin)
   */
  async getAdminUserProgressStats(filters?: UserProgressFilters): Promise<{
    totalProgress: number;
    completedProgress: number;
    averageProgress: number;
    averageScore: number;
    totalTimeSpent: number;
    activeUsers: number;
  }> {
    try {
      return await this.get('/user-progress/stats', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải thống kê tiến độ học tập',
      );
    }
  }

  // User APIs
  /**
   * Lấy tiến độ học tập của user hiện tại
   */
  async getUserProgress(
    filters?: UserProgressFilters,
  ): Promise<UserProgress[]> {
    try {
      return await this.get<UserProgress[]>('/user-progress/user', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải tiến độ học tập',
      );
    }
  }

  /**
   * Lấy chi tiết tiến độ học tập
   */
  async getProgress(id: string): Promise<UserProgress> {
    try {
      return await this.get<UserProgress>(`/user-progress/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải chi tiết tiến độ học tập',
      );
    }
  }

  /**
   * Tạo tiến độ học tập mới cho user hiện tại
   */
  async createProgress(data: CreateUserProgressRequest): Promise<UserProgress> {
    try {
      return await this.post<UserProgress>('/user-progress', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo tiến độ học tập mới',
      );
    }
  }

  /**
   * Cập nhật tiến độ học tập của user hiện tại
   */
  async updateProgress(
    id: string,
    data: UpdateUserProgressRequest,
  ): Promise<UserProgress> {
    try {
      return await this.patch<UserProgress>(`/user-progress/${id}`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật tiến độ học tập',
      );
    }
  }

  /**
   * Cập nhật tiến độ học tập theo course
   */
  async updateCourseProgress(
    courseId: string,
    data: {
      progress: number;
      score: number;
      timeSpent: number;
      isCompleted?: boolean;
    },
  ): Promise<UserProgress> {
    try {
      return await this.patch<UserProgress>(
        `/courses/${courseId}/progress`,
        data,
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật tiến độ khóa học',
      );
    }
  }

  /**
   * Cập nhật tiến độ học tập theo lesson
   */
  async updateLessonProgress(
    courseId: string,
    lessonId: string,
    data: {
      progress: number;
      score: number;
      timeSpent: number;
      isCompleted?: boolean;
    },
  ): Promise<UserProgress> {
    try {
      return await this.patch<UserProgress>(
        `/courses/${courseId}/lessons/${lessonId}/progress`,
        data,
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật tiến độ bài học',
      );
    }
  }

  /**
   * Lấy thống kê tiến độ học tập của user hiện tại
   */
  async getUserProgressStats(): Promise<{
    totalProgress: number;
    completedProgress: number;
    averageProgress: number;
    averageScore: number;
    totalTimeSpent: number;
    activeCourses: number;
  }> {
    try {
      return await this.get('/user-progress/user/stats');
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải thống kê tiến độ học tập',
      );
    }
  }
}

const userProgressApi = new UserProgressApi();
export default userProgressApi;
