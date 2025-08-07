import { BaseApi } from './baseApi';
import { API_ENDPOINTS } from '../config/api';

export interface Vocabulary {
  _id: string;
  chinese: string;
  pinyin: string;
  vietnameseReading?: string;
  meaning: {
    primary: string;
    secondary?: string[];
    partOfSpeech?: string;
  };
  grammar: {
    level?: string;
    frequency?: number;
    formality?: string;
  };
  examples: Array<{
    chinese: string;
    pinyin: string;
    vietnamese: string;
  }>;
  related: {
    synonyms?: string[];
    antonyms?: string[];
    compounds?: string[];
  };
  hskLevel?: number;
  category:
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
  createdAt: string;
  updatedAt: string;
}

export interface CreateVocabularyRequest {
  chinese: string;
  pinyin: string;
  vietnameseReading?: string;
  meaning: {
    primary: string;
    secondary?: string[];
    partOfSpeech?: string;
  };
  grammar?: {
    level?: string;
    frequency?: number;
    formality?: string;
  };
  examples?: Array<{
    chinese: string;
    pinyin: string;
    vietnamese: string;
  }>;
  related?: {
    synonyms?: string[];
    antonyms?: string[];
    compounds?: string[];
  };
  hskLevel?: number;
  category?: Vocabulary['category'];
}

export interface UpdateVocabularyRequest {
  chinese?: string;
  pinyin?: string;
  vietnameseReading?: string;
  meaning?: {
    primary?: string;
    secondary?: string[];
    partOfSpeech?: string;
  };
  grammar?: {
    level?: string;
    frequency?: number;
    formality?: string;
  };
  examples?: Array<{
    chinese: string;
    pinyin: string;
    vietnamese: string;
  }>;
  related?: {
    synonyms?: string[];
    antonyms?: string[];
    compounds?: string[];
  };
  hskLevel?: number;
  category?: Vocabulary['category'];
}

export interface VocabularyFilters {
  category?: Vocabulary['category'];
  hskLevel?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export class VocabulariesApi extends BaseApi {
  constructor() {
    super(API_ENDPOINTS.VOCABULARIES.LIST.replace('/vocabularies', ''));
  }

  // Admin APIs
  /**
   * Lấy tất cả từ vựng (Admin)
   */
  async getAllVocabularies(filters?: VocabularyFilters): Promise<{
    vocabularies: Vocabulary[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get('/vocabularies', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải danh sách từ vựng',
      );
    }
  }

  /**
   * Lấy chi tiết từ vựng theo ID (Admin)
   */
  async getVocabularyById(id: string): Promise<Vocabulary> {
    try {
      return await this.get<Vocabulary>(`/vocabularies/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải chi tiết từ vựng',
      );
    }
  }

  /**
   * Tạo từ vựng mới (Admin)
   */
  async createVocabulary(data: CreateVocabularyRequest): Promise<Vocabulary> {
    try {
      return await this.post<Vocabulary>('/vocabularies', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo từ vựng mới',
      );
    }
  }

  /**
   * Cập nhật từ vựng (Admin)
   */
  async updateVocabulary(
    id: string,
    data: UpdateVocabularyRequest,
  ): Promise<Vocabulary> {
    try {
      return await this.patch<Vocabulary>(`/vocabularies/${id}`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật từ vựng',
      );
    }
  }

  /**
   * Xóa từ vựng (Admin)
   */
  async deleteVocabulary(id: string): Promise<any> {
    try {
      return await this.delete(`/vocabularies/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể xóa từ vựng');
    }
  }

  /**
   * Tìm kiếm từ vựng (Admin)
   */
  async searchVocabularies(
    query: string,
    filters?: Omit<VocabularyFilters, 'search'>,
  ): Promise<{
    vocabularies: Vocabulary[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      const params = { search: query, ...filters };
      return await this.get('/vocabularies/search', params);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tìm kiếm từ vựng',
      );
    }
  }

  /**
   * Lấy từ vựng theo danh mục (Admin)
   */
  async getVocabulariesByCategory(
    category: string,
    filters?: VocabularyFilters,
  ): Promise<{
    vocabularies: Vocabulary[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get(`/vocabularies/category/${category}`, filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải từ vựng theo danh mục',
      );
    }
  }

  /**
   * Lấy từ vựng theo level (Admin)
   */
  async getVocabulariesByLevel(
    level: string,
    filters?: VocabularyFilters,
  ): Promise<{
    vocabularies: Vocabulary[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get(`/vocabularies/level/${level}`, filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải từ vựng theo level',
      );
    }
  }

  /**
   * Import từ vựng từ file (Admin)
   */
  async importVocabulary(
    file: File,
    metadata?: {
      category?: string;
      hskLevel?: number;
    },
  ): Promise<{
    imported: number;
    errors: string[];
  }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (metadata) {
        formData.append('metadata', JSON.stringify(metadata));
      }
      return await this.post('/vocabularies/import', formData);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể import từ vựng',
      );
    }
  }

  /**
   * Export từ vựng (Admin)
   */
  async exportVocabulary(
    filters?: VocabularyFilters,
    format: 'csv' | 'json' = 'csv',
  ): Promise<Blob> {
    try {
      const response = await fetch(
        `${this.baseUrl}/vocabularies/export?format=${format}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(filters),
        },
      );
      return await response.blob();
    } catch (error: any) {
      throw new Error('Không thể export từ vựng');
    }
  }

  // User APIs (existing)
  /**
   * Lấy từ vựng cho user
   */
  async getVocabulary(id: string): Promise<Vocabulary> {
    try {
      return await this.get<Vocabulary>(`/vocabularies/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải chi tiết từ vựng',
      );
    }
  }

  /**
   * Tìm kiếm từ vựng cho user
   */
  async searchVocabulary(query: string): Promise<Vocabulary[]> {
    try {
      return await this.get<Vocabulary[]>(`/vocabularies/search?q=${query}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tìm kiếm từ vựng',
      );
    }
  }

  /**
   * Lấy từ vựng phổ biến cho user
   */
  async getPopularVocabularies(limit?: number): Promise<Vocabulary[]> {
    try {
      const params = limit ? { limit } : undefined;
      return await this.get<Vocabulary[]>('/vocabularies/popular', params);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải từ vựng phổ biến',
      );
    }
  }
}

const vocabulariesApi = new VocabulariesApi();
export default vocabulariesApi;
