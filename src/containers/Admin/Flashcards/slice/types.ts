import { PaginationType } from 'utils/constants';
import { I_FlashcardSet } from 'types/shared/flashcard';

export interface AdminFlashcardsState {
  list: I_FlashcardSet[];
  loading: boolean;
  pagination?: PaginationType;
}

export type DefaultAdminFlashcardsState = AdminFlashcardsState;
