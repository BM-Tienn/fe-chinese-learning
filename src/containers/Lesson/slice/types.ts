import { I_Lesson } from 'types/shared/lesson';
import { I_Vocabulary } from 'types/shared/vocabulary';

export interface LessonState {
  lesson: I_Lesson | null;
  vocabulary: I_Vocabulary[];
  currentSection: 'content' | 'vocabulary' | 'practice';
  loading: boolean;
  error: string | null;
  progress: {
    currentStep: number;
    totalSteps: number;
    completedSteps: number[];
  };
  userAnswers: Record<string, any>;
  isCompleted: boolean;
}

export type DefaultLessonState = LessonState;
