import { BaseApi } from './baseApi';
import { API_ENDPOINTS } from '../config/api';

export interface Word {
  _id: string;
  user: string; // User ID
  chinese: string;
  pinyin: string;
  definition: string;
  hskLevel?: number;
  tags: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWordRequest {
  chinese: string;
  pinyin: string;
  definition: string;
  hskLevel?: number;
  tags?: string[];
  notes?: string;
}

export interface UpdateWordRequest {
  chinese?: string;
  pinyin?: string;
  definition?: string;
  hskLevel?: number;
  tags?: string[];
  notes?: string;
}

export interface WordFilters {
  hskLevel?: number;
  tags?: string[];
  search?: string;
  page?: number;
  limit?: number;
}

export class WordsApi extends BaseApi {
  constructor() {
    super(API_ENDPOINTS.WORDS.LIST.replace('/words', ''));
  }

  // Admin APIs
  /**
   * Lấy tất cả từ vựng của user (Admin)
   */
  async getAllUserWords(
    userId: string,
    filters?: WordFilters,
  ): Promise<{
    words: Word[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get(`/users/${userId}/words`, filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải danh sách từ vựng',
      );
    }
  }

  /**
   * Lấy chi tiết từ vựng theo ID (Admin)
   */
  async getWordById(id: string): Promise<Word> {
    try {
      return await this.get<Word>(`/words/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải chi tiết từ vựng',
      );
    }
  }

  /**
   * Tạo từ vựng mới cho user (Admin)
   */
  async createWordForUser(
    userId: string,
    data: CreateWordRequest,
  ): Promise<Word> {
    try {
      return await this.post<Word>(`/users/${userId}/words`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo từ vựng mới',
      );
    }
  }

  /**
   * Cập nhật từ vựng (Admin)
   */
  async updateWord(id: string, data: UpdateWordRequest): Promise<Word> {
    try {
      return await this.patch<Word>(`/words/${id}`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật từ vựng',
      );
    }
  }

  /**
   * Xóa từ vựng (Admin)
   */
  async deleteWord(id: string): Promise<any> {
    try {
      return await this.delete(`/words/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể xóa từ vựng');
    }
  }

  /**
   * Tìm kiếm từ vựng (Admin)
   */
  async searchWords(
    query: string,
    filters?: Omit<WordFilters, 'search'>,
  ): Promise<{
    words: Word[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      const params = { search: query, ...filters };
      return await this.get('/words/search', params);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tìm kiếm từ vựng',
      );
    }
  }

  /**
   * Import từ vựng từ file (Admin)
   */
  async importWords(
    file: File,
    userId?: string,
  ): Promise<{ imported: number; errors: string[] }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (userId) {
        formData.append('userId', userId);
      }
      return await this.post('/words/import', formData);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể import từ vựng',
      );
    }
  }

  /**
   * Export từ vựng (Admin)
   */
  async exportWords(
    filters?: WordFilters,
    userId?: string,
    format: 'csv' | 'json' = 'csv',
  ): Promise<Blob> {
    try {
      const response = await fetch(
        `${this.baseUrl}/words/export?format=${format}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ ...filters, userId }),
        },
      );
      return await response.blob();
    } catch (error: any) {
      throw new Error('Không thể export từ vựng');
    }
  }

  // User APIs (existing)
  /**
   * Lấy danh sách từ vựng của người dùng hiện tại
   */
  async getUserWords(filters?: WordFilters): Promise<Word[]> {
    try {
      return await this.get<Word[]>('/words', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải danh sách từ vựng',
      );
    }
  }

  /**
   * Lấy chi tiết từ vựng
   */
  async getWord(id: string): Promise<Word> {
    try {
      return await this.get<Word>(`/words/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải chi tiết từ vựng',
      );
    }
  }

  /**
   * Tạo từ vựng mới cho user hiện tại
   */
  async createWord(data: CreateWordRequest): Promise<Word> {
    try {
      return await this.post<Word>('/words', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo từ vựng mới',
      );
    }
  }

  /**
   * Cập nhật từ vựng của user hiện tại
   */
  async updateUserWord(
    id: string,
    data: Partial<CreateWordRequest>,
  ): Promise<Word> {
    try {
      return await this.patch<Word>(`/words/${id}`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật từ vựng',
      );
    }
  }

  /**
   * Xóa từ vựng của user hiện tại
   */
  async deleteUserWord(id: string): Promise<any> {
    try {
      return await this.delete(`/words/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể xóa từ vựng');
    }
  }

  /**
   * Tìm kiếm từ vựng của user hiện tại
   */
  async searchUserWords(
    query: string,
    filters?: Omit<WordFilters, 'search'>,
  ): Promise<Word[]> {
    try {
      const params = { search: query, ...filters };
      return await this.get<Word[]>('/words/search', params);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tìm kiếm từ vựng',
      );
    }
  }

  /**
   * Lấy từ vựng để ôn tập
   */
  async getWordsForReview(limit?: number): Promise<Word[]> {
    try {
      const params = limit ? { limit } : undefined;
      return await this.get<Word[]>('/words/review', params);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải từ vựng để ôn tập',
      );
    }
  }

  /**
   * Cập nhật tiến độ học từ vựng
   */
  async updateWordProgress(id: string, isCorrect: boolean): Promise<any> {
    try {
      return await this.post(`/words/${id}/progress`, { isCorrect });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật tiến độ',
      );
    }
  }

  /**
   * Lấy thống kê từ vựng
   */
  async getWordStats(): Promise<{
    totalWords: number;
    masteredWords: number;
    learningWords: number;
    notStartedWords: number;
    averageAccuracy: number;
  }> {
    try {
      return await this.get('/words/stats');
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải thống kê từ vựng',
      );
    }
  }

  /**
   * Import từ vựng từ file cho user hiện tại
   */
  async importUserWords(
    file: File,
  ): Promise<{ imported: number; errors: string[] }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      return await this.post('/words/import', formData);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể import từ vựng',
      );
    }
  }

  /**
   * Export từ vựng của user hiện tại
   */
  async exportUserWords(format: 'csv' | 'json' = 'csv'): Promise<Blob> {
    try {
      const response = await fetch(
        `${this.baseUrl}/words/export?format=${format}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      return await response.blob();
    } catch (error: any) {
      throw new Error('Không thể export từ vựng');
    }
  }
}

const wordsApi = new WordsApi();
export default wordsApi;
