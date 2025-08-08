import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectAdminLessons = (state: RootState) =>
  state.adminLessons || initialState;

export const selectAdminLessonsData = createSelector(
  [selectAdminLessons],
  state => state.list,
);
export const selectAdminLessonsLoading = createSelector(
  [selectAdminLessons],
  state => state.loading,
);
export const selectAdminLessonsPagination = createSelector(
  [selectAdminLessons],
  state => state.pagination,
);
