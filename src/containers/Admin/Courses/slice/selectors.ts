import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectAdminCourses = (state: RootState) =>
  state.adminCourses || initialState;

export const selectAdminCoursesData = createSelector(
  [selectAdminCourses],
  state => state.list,
);
export const selectAdminCoursesLoading = createSelector(
  [selectAdminCourses],
  state => state.loading,
);
export const selectAdminCoursesPagination = createSelector(
  [selectAdminCourses],
  state => state.pagination,
);
