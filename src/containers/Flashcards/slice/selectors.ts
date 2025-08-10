import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectFlashcards = (state: RootState) => state.flashcards || initialState;

export const selectFlashcardsData = createSelector(
  [selectFlashcards],
  state => state.flashcardSets,
);

export const selectFlashcardsTopics = createSelector(
  [selectFlashcards],
  state => state.topics,
);

export const selectFlashcardsWordTypes = createSelector(
  [selectFlashcards],
  state => state.wordTypes,
);

export const selectFlashcardsLoading = createSelector(
  [selectFlashcards],
  state => state.loading,
);

export const selectFlashcardsError = createSelector(
  [selectFlashcards],
  state => state.error,
);

export const selectFlashcardsFilters = createSelector(
  [selectFlashcards],
  state => state.filters,
);

export const selectFlashcardsPagination = createSelector(
  [selectFlashcards],
  state => state.pagination,
);
