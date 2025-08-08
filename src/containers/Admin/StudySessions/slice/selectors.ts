import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectAdminStudySessions = (state: RootState) =>
  state.adminStudySessions || initialState;

export const selectAdminStudySessionsData = createSelector(
  [selectAdminStudySessions],
  state => state.list,
);
export const selectAdminStudySessionsLoading = createSelector(
  [selectAdminStudySessions],
  state => state.loading,
);
export const selectAdminStudySessionsPagination = createSelector(
  [selectAdminStudySessions],
  state => state.pagination,
);
