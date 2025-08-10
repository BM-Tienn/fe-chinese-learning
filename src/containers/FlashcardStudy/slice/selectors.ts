import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectFlashcardStudy = (state: RootState) =>
  state.flashcardStudy || initialState;

export const selectFlashcardStudyCurrentCard = createSelector(
  [selectFlashcardStudy],
  state => state.currentCard,
);

export const selectFlashcardStudyCurrentCardIndex = createSelector(
  [selectFlashcardStudy],
  state => state.currentCardIndex,
);

export const selectFlashcardStudyCards = createSelector(
  [selectFlashcardStudy],
  state => state.cards,
);

export const selectFlashcardStudyIsFlipped = createSelector(
  [selectFlashcardStudy],
  state => state.isFlipped,
);

export const selectFlashcardStudySession = createSelector(
  [selectFlashcardStudy],
  state => state.studySession,
);

export const selectFlashcardStudyLoading = createSelector(
  [selectFlashcardStudy],
  state => state.loading,
);

export const selectFlashcardStudyError = createSelector(
  [selectFlashcardStudy],
  state => state.error,
);

export const selectFlashcardStudyProgress = createSelector(
  [selectFlashcardStudy],
  state => state.progress,
);

export const selectFlashcardStudyIsCompleted = createSelector(
  [selectFlashcardStudy],
  state => state.isCompleted,
);
