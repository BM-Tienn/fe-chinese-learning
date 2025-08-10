import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectLesson = (state: RootState) => state.lesson || initialState;

export const selectLessonData = createSelector(
  [selectLesson],
  state => state.lesson,
);

export const selectLessonVocabulary = createSelector(
  [selectLesson],
  state => state.vocabulary,
);

export const selectLessonCurrentSection = createSelector(
  [selectLesson],
  state => state.currentSection,
);

export const selectLessonLoading = createSelector(
  [selectLesson],
  state => state.loading,
);

export const selectLessonError = createSelector(
  [selectLesson],
  state => state.error,
);

export const selectLessonProgress = createSelector(
  [selectLesson],
  state => state.progress,
);

export const selectLessonUserAnswers = createSelector(
  [selectLesson],
  state => state.userAnswers,
);

export const selectLessonIsCompleted = createSelector(
  [selectLesson],
  state => state.isCompleted,
);
