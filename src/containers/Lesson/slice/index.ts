import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultLessonState } from './types';
import { createRoutine } from 'redux-saga-routines';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { lessonSaga } from './saga';

export const LESSON_GET_LESSON = createRoutine('lesson/getLesson');
export const LESSON_GET_VOCABULARY = createRoutine('lesson/getVocabulary');
export const LESSON_SUBMIT_ANSWER = createRoutine('lesson/submitAnswer');
export const LESSON_COMPLETE_LESSON = createRoutine('lesson/completeLesson');

export const initialState: DefaultLessonState = {
  lesson: null,
  vocabulary: [],
  currentSection: 'content',
  loading: false,
  error: null,
  progress: {
    currentStep: 0,
    totalSteps: 0,
    completedSteps: [],
  },
  userAnswers: {},
  isCompleted: false,
};

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setLesson: (state, action: PayloadAction<any>) => {
      state.lesson = action.payload;
      if (action.payload?.steps) {
        state.progress.totalSteps = action.payload.steps.length;
      }
    },
    setVocabulary: (state, action: PayloadAction<any[]>) => {
      state.vocabulary = action.payload;
    },
    setCurrentSection: (
      state,
      action: PayloadAction<'content' | 'vocabulary' | 'practice'>,
    ) => {
      state.currentSection = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.progress.currentStep = action.payload;
    },
    completeStep: (state, action: PayloadAction<number>) => {
      if (!state.progress.completedSteps.includes(action.payload)) {
        state.progress.completedSteps.push(action.payload);
      }
    },
    setUserAnswer: (
      state,
      action: PayloadAction<{ stepId: string; answer: any }>,
    ) => {
      state.userAnswers[action.payload.stepId] = action.payload.answer;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    setCompleted: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action.payload;
    },
    resetState: state => {
      state.lesson = null;
      state.vocabulary = [];
      state.currentSection = 'content';
      state.loading = false;
      state.error = null;
      state.progress = {
        currentStep: 0,
        totalSteps: 0,
        completedSteps: [],
      };
      state.userAnswers = {};
      state.isCompleted = false;
    },
  },
  extraReducers: builder => {
    builder
      // Get Lesson
      .addCase(LESSON_GET_LESSON.TRIGGER, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        LESSON_GET_LESSON.SUCCESS,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.lesson = action.payload;
          if (action.payload?.steps) {
            state.progress.totalSteps = action.payload.steps.length;
          }
        },
      )
      .addCase(
        LESSON_GET_LESSON.FAILURE,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload?.message || 'Không thể tải bài học';
        },
      )
      // Get Vocabulary
      .addCase(LESSON_GET_VOCABULARY.TRIGGER, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        LESSON_GET_VOCABULARY.SUCCESS,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.vocabulary = action.payload?.items || [];
        },
      )
      .addCase(
        LESSON_GET_VOCABULARY.FAILURE,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload?.message || 'Không thể tải từ vựng';
        },
      )
      // Submit Answer
      .addCase(LESSON_SUBMIT_ANSWER.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        LESSON_SUBMIT_ANSWER.SUCCESS,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // Answer will be updated by the reducer
        },
      )
      .addCase(
        LESSON_SUBMIT_ANSWER.FAILURE,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload?.message || 'Không thể gửi câu trả lời';
        },
      )
      // Complete Lesson
      .addCase(LESSON_COMPLETE_LESSON.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        LESSON_COMPLETE_LESSON.SUCCESS,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.isCompleted = true;
        },
      )
      .addCase(
        LESSON_COMPLETE_LESSON.FAILURE,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error =
            action.payload?.message || 'Không thể hoàn thành bài học';
        },
      );
  },
});

export const { actions, reducer, name: sliceKey } = lessonSlice;

// Export saga for root saga
export { lessonSaga } from './saga';

export const useLessonSlice = () => {
  useInjectReducer({
    key: lessonSlice.name,
    reducer: lessonSlice.reducer,
  });
  useInjectSaga({
    key: lessonSlice.name,
    saga: lessonSaga,
  });
  return { actions: lessonSlice.actions };
};
