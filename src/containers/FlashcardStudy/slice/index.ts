import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultFlashcardStudyState } from './types';
import { createRoutine } from 'redux-saga-routines';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { flashcardStudySaga } from './saga';

export const FLASHCARD_STUDY_GET_SESSION = createRoutine(
  'flashcardStudy/getSession',
);
export const FLASHCARD_STUDY_SUBMIT_ANSWER = createRoutine(
  'flashcardStudy/submitAnswer',
);
export const FLASHCARD_STUDY_COMPLETE_SESSION = createRoutine(
  'flashcardStudy/completeSession',
);

export const initialState: DefaultFlashcardStudyState = {
  currentCard: null,
  currentCardIndex: 0,
  cards: [],
  isFlipped: false,
  studySession: null,
  loading: false,
  error: null,
  progress: {
    total: 0,
    current: 0,
    correct: 0,
    incorrect: 0,
  },
  isCompleted: false,
};

const flashcardStudySlice = createSlice({
  name: 'flashcardStudy',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<any[]>) => {
      state.cards = action.payload;
      state.progress.total = action.payload.length;
      state.currentCard = action.payload[0] || null;
      state.currentCardIndex = 0;
    },
    setCurrentCard: (state, action: PayloadAction<any>) => {
      state.currentCard = action.payload;
    },
    setCurrentCardIndex: (state, action: PayloadAction<number>) => {
      state.currentCardIndex = action.payload;
      if (state.cards[action.payload]) {
        state.currentCard = state.cards[action.payload];
      }
    },
    flipCard: state => {
      state.isFlipped = !state.isFlipped;
    },
    nextCard: state => {
      if (state.currentCardIndex < state.cards.length - 1) {
        state.currentCardIndex += 1;
        state.currentCard = state.cards[state.currentCardIndex];
        state.isFlipped = false;
      } else {
        state.isCompleted = true;
      }
    },
    updateProgress: (state, action: PayloadAction<{ isCorrect: boolean }>) => {
      state.progress.current += 1;
      if (action.payload.isCorrect) {
        state.progress.correct += 1;
      } else {
        state.progress.incorrect += 1;
      }
    },
    setStudySession: (state, action: PayloadAction<any>) => {
      state.studySession = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    resetState: state => {
      state.currentCard = null;
      state.currentCardIndex = 0;
      state.cards = [];
      state.isFlipped = false;
      state.studySession = null;
      state.loading = false;
      state.error = null;
      state.progress = {
        total: 0,
        current: 0,
        correct: 0,
        incorrect: 0,
      };
      state.isCompleted = false;
    },
  },
  extraReducers: builder => {
    builder
      // Get Study Session
      .addCase(FLASHCARD_STUDY_GET_SESSION.TRIGGER, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        FLASHCARD_STUDY_GET_SESSION.SUCCESS,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.studySession = action.payload;
          if (action.payload?.cards) {
            state.cards = action.payload.cards;
            state.progress.total = action.payload.cards.length;
            state.currentCard = action.payload.cards[0] || null;
          }
        },
      )
      .addCase(
        FLASHCARD_STUDY_GET_SESSION.FAILURE,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error =
            action.payload?.message || 'Không thể tải phiên học tập';
        },
      )
      // Submit Answer
      .addCase(FLASHCARD_STUDY_SUBMIT_ANSWER.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        FLASHCARD_STUDY_SUBMIT_ANSWER.SUCCESS,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // Progress will be updated by the reducer
        },
      )
      .addCase(
        FLASHCARD_STUDY_SUBMIT_ANSWER.FAILURE,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload?.message || 'Không thể gửi câu trả lời';
        },
      )
      // Complete Session
      .addCase(FLASHCARD_STUDY_COMPLETE_SESSION.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        FLASHCARD_STUDY_COMPLETE_SESSION.SUCCESS,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.isCompleted = true;
        },
      )
      .addCase(
        FLASHCARD_STUDY_COMPLETE_SESSION.FAILURE,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error =
            action.payload?.message || 'Không thể hoàn thành phiên học tập';
        },
      );
  },
});

export const { actions, reducer, name: sliceKey } = flashcardStudySlice;

// Export saga for root saga
export { flashcardStudySaga } from './saga';

export const useFlashcardStudySlice = () => {
  useInjectReducer({
    key: flashcardStudySlice.name,
    reducer: flashcardStudySlice.reducer,
  });
  useInjectSaga({
    key: flashcardStudySlice.name,
    saga: flashcardStudySaga,
  });
  return { actions: flashcardStudySlice.actions };
};
