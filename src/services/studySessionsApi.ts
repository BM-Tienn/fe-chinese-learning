import { BaseApi } from './baseApi';
import { API_ENDPOINTS } from '../config/api';

export interface StudySession {
  _id: string;
  user: string; // User ID
  course?: string; // Course ID
  lesson?: string; // Lesson ID
  flashcardSet?: string; // FlashcardSet ID
  type: 'lesson' | 'flashcard' | 'quiz' | 'writing' | 'listening' | 'mixed';
  startTime: string;
  endTime?: string;
  duration: number; // in minutes
  score: number;
  progress: number;
  isCompleted: boolean;
  vocabularyStudied: Array<{
    vocabulary: string; // Vocabulary ID
    mastery: number;
    attempts: number;
    correctAnswers: number;
  }>;
  metadata: {
    device?: string;
    location?: string;
    notes?: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudySessionRequest {
  course?: string;
  lesson?: string;
  flashcardSet?: string;
  type: StudySession['type'];
  metadata?: {
    device?: string;
    location?: string;
    notes?: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
  };
}

export interface UpdateStudySessionRequest {
  endTime?: string;
  duration?: number;
  score?: number;
  progress?: number;
  isCompleted?: boolean;
  vocabularyStudied?: Array<{
    vocabulary: string;
    mastery: number;
    attempts: number;
    correctAnswers: number;
  }>;
  metadata?: {
    device?: string;
    location?: string;
    notes?: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
  };
}

export interface StudySessionFilters {
  user?: string;
  course?: string;
  lesson?: string;
  flashcardSet?: string;
  type?: StudySession['type'];
  isCompleted?: boolean;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export class StudySessionsApi extends BaseApi {
  constructor() {
    super(API_ENDPOINTS.COURSES.LIST.replace('/courses', ''));
  }

  // Admin APIs
  /**
   * Lấy tất cả phiên học tập (Admin)
   */
  async getAllStudySessions(filters?: StudySessionFilters): Promise<{
    studySessions: StudySession[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get('/study-sessions', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải danh sách phiên học tập',
      );
    }
  }

  /**
   * Lấy chi tiết phiên học tập theo ID (Admin)
   */
  async getStudySessionById(id: string): Promise<StudySession> {
    try {
      return await this.get<StudySession>(`/study-sessions/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải chi tiết phiên học tập',
      );
    }
  }

  /**
   * Tạo phiên học tập mới (Admin)
   */
  async createStudySession(
    data: CreateStudySessionRequest,
  ): Promise<StudySession> {
    try {
      return await this.post<StudySession>('/study-sessions', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo phiên học tập mới',
      );
    }
  }

  /**
   * Cập nhật phiên học tập (Admin)
   */
  async updateStudySession(
    id: string,
    data: UpdateStudySessionRequest,
  ): Promise<StudySession> {
    try {
      return await this.patch<StudySession>(`/study-sessions/${id}`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật phiên học tập',
      );
    }
  }

  /**
   * Xóa phiên học tập (Admin)
   */
  async deleteStudySession(id: string): Promise<any> {
    try {
      return await this.delete(`/study-sessions/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể xóa phiên học tập',
      );
    }
  }

  /**
   * Lấy phiên học tập theo user (Admin)
   */
  async getStudySessionsByUser(
    userId: string,
    filters?: StudySessionFilters,
  ): Promise<{
    studySessions: StudySession[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get(`/users/${userId}/study-sessions`, filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Không thể tải phiên học tập theo user',
      );
    }
  }

  /**
   * Lấy thống kê phiên học tập (Admin)
   */
  async getStudySessionStats(filters?: StudySessionFilters): Promise<{
    totalSessions: number;
    totalDuration: number;
    averageScore: number;
    averageProgress: number;
    completedSessions: number;
    activeSessions: number;
  }> {
    try {
      return await this.get('/study-sessions/stats', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải thống kê phiên học tập',
      );
    }
  }

  // User APIs
  /**
   * Lấy phiên học tập của user hiện tại
   */
  async getUserStudySessions(
    filters?: StudySessionFilters,
  ): Promise<StudySession[]> {
    try {
      return await this.get<StudySession[]>('/study-sessions/user', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải phiên học tập',
      );
    }
  }

  /**
   * Lấy chi tiết phiên học tập
   */
  async getStudySession(id: string): Promise<StudySession> {
    try {
      return await this.get<StudySession>(`/study-sessions/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải chi tiết phiên học tập',
      );
    }
  }

  /**
   * Tạo phiên học tập mới cho user hiện tại
   */
  async createUserStudySession(
    data: CreateStudySessionRequest,
  ): Promise<StudySession> {
    try {
      return await this.post<StudySession>('/study-sessions', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo phiên học tập mới',
      );
    }
  }

  /**
   * Cập nhật phiên học tập của user hiện tại
   */
  async updateUserStudySession(
    id: string,
    data: UpdateStudySessionRequest,
  ): Promise<StudySession> {
    try {
      return await this.patch<StudySession>(`/study-sessions/${id}`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật phiên học tập',
      );
    }
  }

  /**
   * Kết thúc phiên học tập
   */
  async endStudySession(
    id: string,
    data: {
      score: number;
      progress: number;
      vocabularyStudied?: Array<{
        vocabulary: string;
        mastery: number;
        attempts: number;
        correctAnswers: number;
      }>;
    },
  ): Promise<StudySession> {
    try {
      return await this.patch<StudySession>(`/study-sessions/${id}/end`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể kết thúc phiên học tập',
      );
    }
  }

  /**
   * Lấy thống kê phiên học tập của user hiện tại
   */
  async getUserStudySessionStats(): Promise<{
    totalSessions: number;
    totalDuration: number;
    averageScore: number;
    averageProgress: number;
    completedSessions: number;
    activeSessions: number;
  }> {
    try {
      return await this.get('/study-sessions/user/stats');
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải thống kê phiên học tập',
      );
    }
  }

  /**
   * Gửi câu trả lời cho phiên học tập
   */
  async submitAnswer(sessionId: string, answer: any): Promise<any> {
    try {
      return await this.post(
        `/study-sessions/${sessionId}/submit-answer`,
        answer,
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể gửi câu trả lời',
      );
    }
  }

  /**
   * Hoàn thành phiên học tập
   */
  async completeStudySession(
    sessionId: string,
    data: {
      score: number;
      progress: number;
      vocabularyStudied?: Array<{
        vocabulary: string;
        mastery: number;
        attempts: number;
        correctAnswers: number;
      }>;
    },
  ): Promise<StudySession> {
    try {
      return await this.patch(`/study-sessions/${sessionId}/complete`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể hoàn thành phiên học tập',
      );
    }
  }
}

const studySessionsApi = new StudySessionsApi();
export default studySessionsApi;
