import { BaseApi } from './baseApi';
import { API_ENDPOINTS } from '../config/api';

export interface Lesson {
  _id: string;
  title: string;
  subtitle?: string;
  course: string; // Course ID
  level: 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6';
  order: number;
  image?: string;
  content: string;
  vocabulary: string[]; // Array of vocabulary IDs
  grammar: Array<{
    title: string;
    explanation: string;
    examples: Array<{
      chinese: string;
      pinyin: string;
      vietnamese: string;
    }>;
  }>;
  exercises: Array<{
    type:
      | 'multiple_choice'
      | 'fill_blank'
      | 'matching'
      | 'listening'
      | 'writing';
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    points: number;
  }>;
  estimatedTime: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isActive: boolean;
  metadata: {
    tags: string[];
    prerequisites: string[]; // Array of lesson IDs
    learningObjectives: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateLessonRequest {
  title: string;
  subtitle?: string;
  course: string;
  level: Lesson['level'];
  order: number;
  image?: string;
  content: string;
  vocabulary?: string[];
  grammar?: Lesson['grammar'];
  exercises?: Lesson['exercises'];
  estimatedTime?: number;
  difficulty?: Lesson['difficulty'];
  isActive?: boolean;
  metadata?: {
    tags?: string[];
    prerequisites?: string[];
    learningObjectives?: string[];
  };
}

export interface UpdateLessonRequest {
  title?: string;
  subtitle?: string;
  course?: string;
  level?: Lesson['level'];
  order?: number;
  image?: string;
  content?: string;
  vocabulary?: string[];
  grammar?: Lesson['grammar'];
  exercises?: Lesson['exercises'];
  estimatedTime?: number;
  difficulty?: Lesson['difficulty'];
  isActive?: boolean;
  metadata?: {
    tags?: string[];
    prerequisites?: string[];
    learningObjectives?: string[];
  };
}

export interface LessonFilters {
  course?: string;
  level?: Lesson['level'];
  difficulty?: Lesson['difficulty'];
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export class LessonsApi extends BaseApi {
  constructor() {
    super(API_ENDPOINTS.COURSES.LIST.replace('/courses', ''));
  }

  // Admin APIs
  /**
   * Lấy tất cả bài học (Admin)
   */
  async getAllLessons(filters?: LessonFilters): Promise<{
    lessons: Lesson[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get('/lessons', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải danh sách bài học',
      );
    }
  }

  /**
   * Lấy chi tiết bài học theo ID (Admin)
   */
  async getLessonById(id: string): Promise<Lesson> {
    try {
      return await this.get<Lesson>(`/lessons/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải chi tiết bài học',
      );
    }
  }

  /**
   * Tạo bài học mới (Admin)
   */
  async createLesson(data: CreateLessonRequest): Promise<Lesson> {
    try {
      return await this.post<Lesson>('/lessons', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo bài học mới',
      );
    }
  }

  /**
   * Cập nhật bài học (Admin)
   */
  async updateLesson(id: string, data: UpdateLessonRequest): Promise<Lesson> {
    try {
      return await this.patch<Lesson>(`/lessons/${id}`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật bài học',
      );
    }
  }

  /**
   * Xóa bài học (Admin)
   */
  async deleteLesson(id: string): Promise<any> {
    try {
      return await this.delete(`/lessons/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể xóa bài học');
    }
  }

  /**
   * Kích hoạt/vô hiệu hóa bài học (Admin)
   */
  async toggleLessonStatus(id: string, isActive: boolean): Promise<Lesson> {
    try {
      return await this.patch<Lesson>(`/lessons/${id}/status`, { isActive });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể thay đổi trạng thái bài học',
      );
    }
  }

  /**
   * Cập nhật thứ tự bài học (Admin)
   */
  async updateLessonOrder(id: string, order: number): Promise<Lesson> {
    try {
      return await this.patch<Lesson>(`/lessons/${id}/order`, { order });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật thứ tự bài học',
      );
    }
  }

  /**
   * Lấy bài học theo khóa học (Admin)
   */
  async getLessonsByCourse(
    courseId: string,
    filters?: LessonFilters,
  ): Promise<{
    lessons: Lesson[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get(`/courses/${courseId}/lessons`, filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải bài học theo khóa học',
      );
    }
  }

  // User APIs
  /**
   * Lấy bài học cho user
   */
  async getLesson(courseId: string, lessonId: string): Promise<Lesson> {
    try {
      return await this.get<Lesson>(`/courses/${courseId}/lessons/${lessonId}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải chi tiết bài học',
      );
    }
  }

  /**
   * Lấy danh sách bài học của khóa học cho user
   */
  async getCourseLessons(courseId: string, params?: any): Promise<Lesson[]> {
    try {
      return await this.get<Lesson[]>(`/courses/${courseId}/lessons`, params);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải danh sách bài học',
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
}

const lessonsApi = new LessonsApi();
export default lessonsApi;
