import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectAdminFlashcards = (state: RootState) =>
  state.adminFlashcards || initialState;

export const selectAdminFlashcardsData = createSelector(
  [selectAdminFlashcards],
  state => state.list,
);
export const selectAdminFlashcardsLoading = createSelector(
  [selectAdminFlashcards],
  state => state.loading,
);
export const selectAdminFlashcardsPagination = createSelector(
  [selectAdminFlashcards],
  state => state.pagination,
);
