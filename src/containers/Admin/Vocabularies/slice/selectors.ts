import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectAdminVocabularies = (state: RootState) =>
  state.adminVocabularies || initialState;

export const selectAdminVocabulariesData = createSelector(
  [selectAdminVocabularies],
  state => state.list,
);
export const selectAdminVocabulariesLoading = createSelector(
  [selectAdminVocabularies],
  state => state.loading,
);
export const selectAdminVocabulariesPagination = createSelector(
  [selectAdminVocabularies],
  state => state.pagination,
);
