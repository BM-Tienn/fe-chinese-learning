import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectAdminUsers = (state: RootState) => state.adminUsers || initialState;

export const selectAdminUsersData = createSelector(
  [selectAdminUsers],
  state => state.list,
);
export const selectAdminUsersLoading = createSelector(
  [selectAdminUsers],
  state => state.loading,
);
export const selectAdminUsersPagination = createSelector(
  [selectAdminUsers],
  state => state.pagination,
);
