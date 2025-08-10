import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultFlashcardsState } from './types';
import { createRoutine } from 'redux-saga-routines';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { flashcardsSaga } from './saga';
import { I_FlashcardSetSimple, I_Configuration } from 'types/shared';

export const FLASHCARDS_GET_SETS = createRoutine('flashcards/getSets');
export const FLASHCARDS_GET_TOPICS = createRoutine('flashcards/getTopics');
export const FLASHCARDS_GET_WORD_TYPES = createRoutine(
  'flashcards/getWordTypes',
);

export const initialState: DefaultFlashcardsState = {
  flashcardSets: [],
  topics: [],
  wordTypes: [],
  loading: false,
  error: null,
  filters: {},
  pagination: undefined,
};

const flashcardsSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {
    setFlashcardSets: (
      state,
      action: PayloadAction<I_FlashcardSetSimple[]>,
    ) => {
      state.flashcardSets = action.payload;
    },
    setTopics: (state, action: PayloadAction<I_Configuration[]>) => {
      state.topics = action.payload;
    },
    setWordTypes: (state, action: PayloadAction<I_Configuration[]>) => {
      state.wordTypes = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<DefaultFlashcardsState['filters']>>,
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: state => {
      state.filters = {};
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    resetState: state => {
      state.flashcardSets = [];
      state.topics = [];
      state.wordTypes = [];
      state.loading = false;
      state.error = null;
      state.filters = {};
      state.pagination = undefined;
    },
  },
  extraReducers: builder => {
    builder
      // Get Flashcard Sets
      .addCase(FLASHCARDS_GET_SETS.TRIGGER, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        FLASHCARDS_GET_SETS.SUCCESS,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.flashcardSets = action.payload?.items || [];
          state.pagination = action.payload?.pagination;
        },
      )
      .addCase(
        FLASHCARDS_GET_SETS.FAILURE,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error =
            action.payload?.message || 'Không thể tải danh sách flashcard';
        },
      )
      // Get Topics
      .addCase(FLASHCARDS_GET_TOPICS.TRIGGER, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        FLASHCARDS_GET_TOPICS.SUCCESS,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.topics = action.payload?.items || [];
        },
      )
      .addCase(
        FLASHCARDS_GET_TOPICS.FAILURE,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error =
            action.payload?.message || 'Không thể tải danh sách chủ đề';
        },
      )
      // Get Word Types
      .addCase(FLASHCARDS_GET_WORD_TYPES.TRIGGER, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        FLASHCARDS_GET_WORD_TYPES.SUCCESS,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.wordTypes = action.payload?.items || [];
        },
      )
      .addCase(
        FLASHCARDS_GET_WORD_TYPES.FAILURE,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error =
            action.payload?.message || 'Không thể tải danh sách loại từ';
        },
      );
  },
});

export const { actions, reducer, name: sliceKey } = flashcardsSlice;

// Export saga for root saga
export { flashcardsSaga } from './saga';

export const useFlashcardsSlice = () => {
  useInjectReducer({
    key: flashcardsSlice.name,
    reducer: flashcardsSlice.reducer,
  });
  useInjectSaga({
    key: flashcardsSlice.name,
    saga: flashcardsSaga,
  });
  return { actions: flashcardsSlice.actions };
};
