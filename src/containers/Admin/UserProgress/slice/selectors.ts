import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectAdminUserProgress = (state: RootState) =>
  state.adminUserProgress || initialState;

export const selectAdminUserProgressData = createSelector(
  [selectAdminUserProgress],
  state => state.list,
);
export const selectAdminUserProgressLoading = createSelector(
  [selectAdminUserProgress],
  state => state.loading,
);
export const selectAdminUserProgressPagination = createSelector(
  [selectAdminUserProgress],
  state => state.pagination,
);
