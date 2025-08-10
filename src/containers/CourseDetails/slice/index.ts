import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultCourseDetailsState } from './types';
import { createRoutine } from 'redux-saga-routines';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { courseDetailsSaga } from './saga';

export const COURSE_DETAILS_GET_COURSE = createRoutine(
  'courseDetails/getCourse',
);
export const COURSE_DETAILS_GET_LESSONS = createRoutine(
  'courseDetails/getLessons',
);
export const COURSE_DETAILS_UPDATE_PROGRESS = createRoutine(
  'courseDetails/updateProgress',
);

export const initialState: DefaultCourseDetailsState = {
  course: null,
  lessons: [],
  loading: false,
  error: null,
  progress: 0,
  completedLessons: 0,
  totalLessons: 0,
};

const courseDetailsSlice = createSlice({
  name: 'courseDetails',
  initialState,
  reducers: {
    setCourse: (state, action: PayloadAction<any>) => {
      state.course = action.payload;
      state.totalLessons = action.payload?.totalLessons || 0;
    },
    setLessons: (state, action: PayloadAction<any[]>) => {
      state.lessons = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setCompletedLessons: (state, action: PayloadAction<number>) => {
      state.completedLessons = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    resetState: state => {
      state.course = null;
      state.lessons = [];
      state.loading = false;
      state.error = null;
      state.progress = 0;
      state.completedLessons = 0;
      state.totalLessons = 0;
    },
  },
  extraReducers: builder => {
    builder
      // Get Course
      .addCase(COURSE_DETAILS_GET_COURSE.TRIGGER, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        COURSE_DETAILS_GET_COURSE.SUCCESS,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.course = action.payload;
          state.totalLessons = action.payload?.totalLessons || 0;
        },
      )
      .addCase(
        COURSE_DETAILS_GET_COURSE.FAILURE,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error =
            action.payload?.message || 'Không thể tải chi tiết khóa học';
        },
      )
      // Get Lessons
      .addCase(COURSE_DETAILS_GET_LESSONS.TRIGGER, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        COURSE_DETAILS_GET_LESSONS.SUCCESS,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.lessons = action.payload?.items || [];
        },
      )
      .addCase(
        COURSE_DETAILS_GET_LESSONS.FAILURE,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error =
            action.payload?.message || 'Không thể tải danh sách bài học';
        },
      )
      // Update Progress
      .addCase(COURSE_DETAILS_UPDATE_PROGRESS.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        COURSE_DETAILS_UPDATE_PROGRESS.SUCCESS,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.progress = action.payload?.progress || 0;
          state.completedLessons = action.payload?.completedLessons || 0;
        },
      )
      .addCase(
        COURSE_DETAILS_UPDATE_PROGRESS.FAILURE,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload?.message || 'Không thể cập nhật tiến độ';
        },
      );
  },
});

export const { actions, reducer, name: sliceKey } = courseDetailsSlice;

// Export saga for root saga
export { courseDetailsSaga } from './saga';

export const useCourseDetailsSlice = () => {
  useInjectReducer({
    key: courseDetailsSlice.name,
    reducer: courseDetailsSlice.reducer,
  });
  useInjectSaga({
    key: courseDetailsSlice.name,
    saga: courseDetailsSaga,
  });
  return { actions: courseDetailsSlice.actions };
};
