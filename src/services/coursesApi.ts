import { BaseApi } from './baseApi';
import { API_CONFIG } from '../config/env';

export interface Course {
  _id: string;
  title: string;
  description: string;
  level:
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
  levelColor: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple';
  image?: string;
  duration: string; // e.g., "8 tuần", "10 tuần"
  lessons: string[]; // Array of lesson IDs
  totalLessons: number;
  students: number;
  rating: number;
  isNewCourse: boolean;
  isPopular: boolean;
  isActive: boolean;
  order: number;
  metadata: {
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    category:
      | 'Grammar'
      | 'Vocabulary'
      | 'Listening'
      | 'Reading'
      | 'Writing'
      | 'Speaking'
      | 'Mixed';
    tags: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  level: Course['level'];
  levelColor?: Course['levelColor'];
  image?: string;
  duration: string;
  order?: number;
  isNewCourse?: boolean;
  isPopular?: boolean;
  isActive?: boolean;
  metadata?: {
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    category?:
      | 'Grammar'
      | 'Vocabulary'
      | 'Listening'
      | 'Reading'
      | 'Writing'
      | 'Speaking'
      | 'Mixed';
    tags?: string[];
  };
}

export interface UpdateCourseRequest {
  title?: string;
  description?: string;
  level?: Course['level'];
  levelColor?: Course['levelColor'];
  image?: string;
  duration?: string;
  order?: number;
  isNewCourse?: boolean;
  isPopular?: boolean;
  isActive?: boolean;
  metadata?: {
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    category?:
      | 'Grammar'
      | 'Vocabulary'
      | 'Listening'
      | 'Reading'
      | 'Writing'
      | 'Speaking'
      | 'Mixed';
    tags?: string[];
  };
}

export interface CourseFilters {
  level?: Course['level'];
  search?: string;
  page?: number;
  limit?: number;
  isActive?: boolean;
  isPopular?: boolean;
  isNewCourse?: boolean;
}

export class CoursesApi extends BaseApi {
  constructor() {
    super(API_CONFIG.FULL_BASE_URL);
  }

  // Admin APIs
  /**
   * Lấy tất cả khóa học (Admin)
   */
  async getAllCourses(filters?: CourseFilters): Promise<{
    courses: Course[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get('/courses', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải danh sách khóa học',
      );
    }
  }

  /**
   * Lấy chi tiết khóa học theo ID (Admin)
   */
  async getCourseById(id: string): Promise<Course> {
    try {
      return await this.get<Course>(`/courses/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải chi tiết khóa học',
      );
    }
  }

  /**
   * Tạo khóa học mới (Admin)
   */
  async createCourse(data: CreateCourseRequest): Promise<Course> {
    try {
      return await this.post<Course>('/courses', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo khóa học mới',
      );
    }
  }

  /**
   * Cập nhật khóa học (Admin)
   */
  async updateCourse(id: string, data: UpdateCourseRequest): Promise<Course> {
    try {
      return await this.patch<Course>(`/courses/${id}`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật khóa học',
      );
    }
  }

  /**
   * Xóa khóa học (Admin)
   */
  async deleteCourse(id: string): Promise<any> {
    try {
      return await this.delete(`/courses/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể xóa khóa học',
      );
    }
  }

  /**
   * Kích hoạt/vô hiệu hóa khóa học (Admin)
   */
  async toggleCourseStatus(id: string, isActive: boolean): Promise<Course> {
    try {
      return await this.patch<Course>(`/courses/${id}/status`, { isActive });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể thay đổi trạng thái khóa học',
      );
    }
  }

  /**
   * Cập nhật thứ tự khóa học (Admin)
   */
  async updateCourseOrder(id: string, order: number): Promise<Course> {
    try {
      return await this.patch<Course>(`/courses/${id}/order`, { order });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật thứ tự khóa học',
      );
    }
  }

  // User APIs (existing)
  /**
   * Lấy danh sách khóa học cho user
   */
  async getCourses(filters?: CourseFilters): Promise<Course[]> {
    try {
      return await this.get<Course[]>('/courses/active', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải danh sách khóa học',
      );
    }
  }

  /**
   * Lấy chi tiết khóa học cho user
   */
  async getCourse(id: string): Promise<Course> {
    try {
      return await this.get<Course>(`/courses/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải chi tiết khóa học',
      );
    }
  }

  /**
   * Lấy danh sách bài học của khóa học
   */
  async getCourseLessons(courseId: string, params?: any): Promise<any[]> {
    try {
      return await this.get<any[]>(`/courses/${courseId}/lessons`, params);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải danh sách bài học',
      );
    }
  }

  /**
   * Lấy chi tiết bài học
   */
  async getLesson(courseId: string, lessonId: string): Promise<any> {
    try {
      return await this.get<any>(`/courses/${courseId}/lessons/${lessonId}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải chi tiết bài học',
      );
    }
  }

  /**
   * Đánh dấu bài học đã hoàn thành
   */
  async completeLesson(courseId: string, lessonId: string): Promise<any> {
    try {
      return await this.post(
        `/courses/${courseId}/lessons/${lessonId}/complete`,
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể đánh dấu bài học đã hoàn thành',
      );
    }
  }

  /**
   * Lấy tiến độ khóa học
   */
  async getCourseProgress(
    courseId: string,
  ): Promise<{ progress: number; completedLessons: number }> {
    try {
      return await this.get<{ progress: number; completedLessons: number }>(
        `/courses/${courseId}/progress`,
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải tiến độ khóa học',
      );
    }
  }

  /**
   * Cập nhật tiến độ khóa học
   */
  async updateCourseProgress(
    courseId: string,
    data: { lessonId: string; completed: boolean; score?: number },
  ): Promise<any> {
    try {
      return await this.patch(`/courses/${courseId}/progress`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật tiến độ khóa học',
      );
    }
  }
}

const coursesApi = new CoursesApi();
export default coursesApi;
