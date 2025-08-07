import { BaseApi } from './baseApi';
import { API_ENDPOINTS } from '../config/api';

export interface DashboardStats {
  totalCourses: number;
  totalLessons: number;
  totalWords: number;
  totalFlashcards: number;
  completedLessons: number;
  studyStreak: number;
  totalStudyTime: number;
}

export interface RecentActivity {
  _id: string;
  type: 'lesson' | 'flashcard' | 'word' | 'course';
  title: string;
  description: string;
  timestamp: string;
  progress?: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivities: RecentActivity[];
}

export class DashboardApi extends BaseApi {
  constructor() {
    super(API_ENDPOINTS.DASHBOARD.MAIN.replace('/dashboard', ''));
  }

  /**
   * Lấy dữ liệu dashboard chính
   */
  async getDashboard(): Promise<DashboardData> {
    try {
      return await this.get<DashboardData>('/dashboard');
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải dữ liệu dashboard',
      );
    }
  }

  /**
   * Lấy thống kê dashboard
   */
  async getStats(): Promise<DashboardStats> {
    try {
      return await this.get<DashboardStats>('/dashboard/stats');
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải thống kê',
      );
    }
  }

  /**
   * Lấy hoạt động gần đây
   */
  async getRecentActivity(limit?: number): Promise<RecentActivity[]> {
    try {
      const params = limit ? { limit } : undefined;
      return await this.get<RecentActivity[]>(
        '/dashboard/recent-activity',
        params,
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải hoạt động gần đây',
      );
    }
  }
}

const dashboardApi = new DashboardApi();
export default dashboardApi;
