import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectAdminWords = (state: RootState) => state.adminWords || initialState;

export const selectAdminWordsData = createSelector(
  [selectAdminWords],
  state => state.list,
);
export const selectAdminWordsLoading = createSelector(
  [selectAdminWords],
  state => state.loading,
);
export const selectAdminWordsPagination = createSelector(
  [selectAdminWords],
  state => state.pagination,
);
