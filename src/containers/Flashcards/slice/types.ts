import { PaginationType } from 'utils/constants';
import { I_FlashcardSetSimple } from 'types/shared/flashcard';
import { I_Configuration } from 'types/shared/configuration';

export interface FlashcardsState {
  flashcardSets: I_FlashcardSetSimple[];
  topics: I_Configuration[];
  wordTypes: I_Configuration[];
  loading: boolean;
  error: string | null;
  filters: {
    topic?: string;
    wordType?: string;
    level?: string;
    difficulty?: string;
  };
  pagination?: PaginationType;
}

export type DefaultFlashcardsState = FlashcardsState;
