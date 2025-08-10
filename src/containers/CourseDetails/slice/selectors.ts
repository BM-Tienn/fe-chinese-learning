import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectCourseDetails = (state: RootState) =>
  state.courseDetails || initialState;

export const selectCourseDetailsData = createSelector(
  [selectCourseDetails],
  state => state.course,
);

export const selectCourseDetailsLessons = createSelector(
  [selectCourseDetails],
  state => state.lessons,
);

export const selectCourseDetailsLoading = createSelector(
  [selectCourseDetails],
  state => state.loading,
);

export const selectCourseDetailsError = createSelector(
  [selectCourseDetails],
  state => state.error,
);

export const selectCourseDetailsProgress = createSelector(
  [selectCourseDetails],
  state => state.progress,
);

export const selectCourseDetailsCompletedLessons = createSelector(
  [selectCourseDetails],
  state => state.completedLessons,
);

export const selectCourseDetailsTotalLessons = createSelector(
  [selectCourseDetails],
  state => state.totalLessons,
);
