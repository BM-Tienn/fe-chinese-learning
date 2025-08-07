import { BaseApi } from './baseApi';
import { API_ENDPOINTS } from '../config/api';

export interface Flashcard {
  _id: string;
  front: string;
  back: string;
  pronunciation?: string;
  example?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: string;
  reviewCount: number;
  correctCount: number;
  incorrectCount: number;
  nextReview?: string;
}

export interface FlashcardSet {
  _id: string;
  title: string;
  description: string;
  category:
    | 'greetings'
    | 'food'
    | 'family'
    | 'numbers'
    | 'colors'
    | 'animals'
    | 'weather'
    | 'travel'
    | 'business'
    | 'other';
  type:
    | 'noun'
    | 'verb'
    | 'adjective'
    | 'adverb'
    | 'pronoun'
    | 'preposition'
    | 'conjunction'
    | 'interjection'
    | 'mixed';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  color: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'pink';
  icon: string; // Lucide icon name
  cards: Array<{
    vocabulary: string; // Vocabulary ID
    order: number;
    isActive: boolean;
  }>;
  cardCount: number;
  timeEstimate: string; // e.g., "10 phút", "15 phút"
  isNewSet: boolean;
  isRecommended: boolean;
  isActive: boolean;
  level: 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6';
  metadata: {
    tags: string[];
    learningObjectives: string[];
    prerequisites: string[]; // Array of flashcard set IDs
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateFlashcardSetRequest {
  title: string;
  description: string;
  category: FlashcardSet['category'];
  type?: FlashcardSet['type'];
  difficulty?: FlashcardSet['difficulty'];
  color?: FlashcardSet['color'];
  icon?: string;
  level?: FlashcardSet['level'];
  timeEstimate?: string;
  isNewSet?: boolean;
  isRecommended?: boolean;
  isActive?: boolean;
  metadata?: {
    tags?: string[];
    learningObjectives?: string[];
    prerequisites?: string[];
  };
}

export interface UpdateFlashcardSetRequest {
  title?: string;
  description?: string;
  category?: FlashcardSet['category'];
  type?: FlashcardSet['type'];
  difficulty?: FlashcardSet['difficulty'];
  color?: FlashcardSet['color'];
  icon?: string;
  level?: FlashcardSet['level'];
  timeEstimate?: string;
  isNewSet?: boolean;
  isRecommended?: boolean;
  isActive?: boolean;
  metadata?: {
    tags?: string[];
    learningObjectives?: string[];
    prerequisites?: string[];
  };
}

export interface FlashcardSetFilters {
  category?: FlashcardSet['category'];
  type?: FlashcardSet['type'];
  difficulty?: FlashcardSet['difficulty'];
  level?: FlashcardSet['level'];
  isActive?: boolean;
  isRecommended?: boolean;
  isNewSet?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface StudySession {
  setId: string;
  cards: Flashcard[];
  totalCards: number;
  currentIndex: number;
  sessionId: string;
}

export interface ProgressUpdate {
  cardId: string;
  isCorrect: boolean;
  responseTime?: number;
}

export interface StudyProgress {
  cardId: string;
  isCorrect: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  nextReview: string;
  reviewCount: number;
}

export class FlashcardsApi extends BaseApi {
  constructor() {
    super(API_ENDPOINTS.FLASHCARDS.LIST.replace('/flashcards', ''));
  }

  // Admin APIs
  /**
   * Lấy tất cả bộ thẻ (Admin)
   */
  async getAllFlashcardSets(filters?: FlashcardSetFilters): Promise<{
    flashcardSets: FlashcardSet[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      return await this.get('/flashcards', filters);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải danh sách bộ thẻ',
      );
    }
  }

  /**
   * Lấy chi tiết bộ thẻ theo ID (Admin)
   */
  async getFlashcardSetById(id: string): Promise<FlashcardSet> {
    try {
      return await this.get<FlashcardSet>(`/flashcards/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải chi tiết bộ thẻ',
      );
    }
  }

  /**
   * Tạo bộ thẻ mới (Admin)
   */
  async createFlashcardSet(
    data: CreateFlashcardSetRequest,
  ): Promise<FlashcardSet> {
    try {
      return await this.post<FlashcardSet>('/flashcards', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo bộ thẻ mới',
      );
    }
  }

  /**
   * Cập nhật bộ thẻ (Admin)
   */
  async updateFlashcardSet(
    id: string,
    data: UpdateFlashcardSetRequest,
  ): Promise<FlashcardSet> {
    try {
      return await this.patch<FlashcardSet>(`/flashcards/${id}`, data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật bộ thẻ',
      );
    }
  }

  /**
   * Xóa bộ thẻ (Admin)
   */
  async deleteFlashcardSet(id: string): Promise<any> {
    try {
      return await this.delete(`/flashcards/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể xóa bộ thẻ');
    }
  }

  /**
   * Kích hoạt/vô hiệu hóa bộ thẻ (Admin)
   */
  async toggleFlashcardSetStatus(
    id: string,
    isActive: boolean,
  ): Promise<FlashcardSet> {
    try {
      return await this.patch<FlashcardSet>(`/flashcards/${id}/status`, {
        isActive,
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể thay đổi trạng thái bộ thẻ',
      );
    }
  }

  /**
   * Thêm từ vựng vào bộ thẻ (Admin)
   */
  async addVocabularyToSet(
    setId: string,
    vocabularyId: string,
    order?: number,
  ): Promise<any> {
    try {
      return await this.post(`/flashcards/${setId}/vocabulary`, {
        vocabularyId,
        order,
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể thêm từ vựng vào bộ thẻ',
      );
    }
  }

  /**
   * Xóa từ vựng khỏi bộ thẻ (Admin)
   */
  async removeVocabularyFromSet(
    setId: string,
    vocabularyId: string,
  ): Promise<any> {
    try {
      return await this.delete(
        `/flashcards/${setId}/vocabulary/${vocabularyId}`,
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể xóa từ vựng khỏi bộ thẻ',
      );
    }
  }

  // User APIs (existing)
  /**
   * Lấy danh sách bộ thẻ của người dùng
   */
  async getUserFlashcardSets(params?: any): Promise<FlashcardSet[]> {
    try {
      return await this.get<FlashcardSet[]>('/flashcards/user', params);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải danh sách bộ thẻ',
      );
    }
  }

  /**
   * Lấy chi tiết bộ thẻ
   */
  async getFlashcardSet(
    setId: string,
  ): Promise<FlashcardSet & { cards: Flashcard[] }> {
    try {
      return await this.get<FlashcardSet & { cards: Flashcard[] }>(
        `/flashcards/${setId}`,
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải chi tiết bộ thẻ',
      );
    }
  }

  /**
   * Lấy thẻ để học
   */
  async getFlashcardsForStudy(
    setId: string,
    limit?: number,
  ): Promise<StudySession> {
    try {
      const params = { setId, ...(limit && { limit }) };
      return await this.get<StudySession>('/flashcards/study', params);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải thẻ để học',
      );
    }
  }

  /**
   * Cập nhật tiến độ học
   */
  async updateProgress(
    setId: string,
    cardId: string,
    isCorrect: boolean,
  ): Promise<StudyProgress> {
    try {
      return await this.post<StudyProgress>(`/flashcards/${setId}/progress`, {
        cardId,
        isCorrect,
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể cập nhật tiến độ',
      );
    }
  }

  /**
   * Tạo bộ thẻ mới cho user
   */
  async createUserFlashcardSet(data: {
    title: string;
    description: string;
    category: string;
    level: string;
  }): Promise<FlashcardSet> {
    try {
      return await this.post<FlashcardSet>('/flashcards/user', data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tạo bộ thẻ mới',
      );
    }
  }

  /**
   * Thêm thẻ vào bộ thẻ
   */
  async addFlashcard(
    setId: string,
    data: {
      front: string;
      back: string;
      pronunciation?: string;
      example?: string;
    },
  ): Promise<Flashcard> {
    try {
      return await this.post<Flashcard>(`/flashcards/${setId}/cards`, data);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể thêm thẻ');
    }
  }

  /**
   * Xóa bộ thẻ của user
   */
  async deleteUserFlashcardSet(setId: string): Promise<any> {
    try {
      return await this.delete(`/flashcards/user/${setId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể xóa bộ thẻ');
    }
  }

  /**
   * Lấy thống kê học tập
   */
  async getStudyStats(setId: string): Promise<{
    totalCards: number;
    masteredCards: number;
    learningCards: number;
    notStartedCards: number;
    averageAccuracy: number;
  }> {
    try {
      return await this.get(`/flashcards/${setId}/stats`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Không thể tải thống kê học tập',
      );
    }
  }
}

const flashcardsApi = new FlashcardsApi();
export default flashcardsApi;
