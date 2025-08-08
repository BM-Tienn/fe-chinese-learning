import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectAdminUserGoals = (state: RootState) =>
  state.adminUserGoals || initialState;

export const selectAdminUserGoalsData = createSelector(
  [selectAdminUserGoals],
  state => state.list,
);
export const selectAdminUserGoalsLoading = createSelector(
  [selectAdminUserGoals],
  state => state.loading,
);
export const selectAdminUserGoalsPagination = createSelector(
  [selectAdminUserGoals],
  state => state.pagination,
);
