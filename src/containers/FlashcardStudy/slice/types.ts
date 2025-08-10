import { I_Flashcard } from 'types/shared/flashcard';
import { I_StudySession } from 'types/shared/studySession';

export interface FlashcardStudyState {
  currentCard: I_Flashcard | null;
  currentCardIndex: number;
  cards: I_Flashcard[];
  isFlipped: boolean;
  studySession: I_StudySession | null;
  loading: boolean;
  error: string | null;
  progress: {
    total: number;
    current: number;
    correct: number;
    incorrect: number;
  };
  isCompleted: boolean;
}

export type DefaultFlashcardStudyState = FlashcardStudyState;
