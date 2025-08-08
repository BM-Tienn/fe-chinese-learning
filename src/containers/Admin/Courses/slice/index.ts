import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultAdminCoursesState } from './types';
import { createRoutine } from 'redux-saga-routines';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { adminCoursesSaga } from './saga';

export const ADMIN_COURSES_GET_LIST = createRoutine('adminCourses/getList');

export const initialState: DefaultAdminCoursesState = {
  list: [],
  loading: false,
};

const adminCoursesSlice = createSlice({
  name: 'adminCourses',
  initialState,
  reducers: {
    createCourse: (state, actions) => {
      const crr = [...state.list];
      crr.unshift(actions.payload);

      state.list = crr;
    },
    updateCourse: (state, actions) => {
      const updatedCourse = actions.payload;
      const crr = state.list.map(course =>
        course._id === updatedCourse._id ? updatedCourse : course,
      );

      state.list = crr;
    },
    deleteCourse: (state, actions) => {
      const idToDelete = actions.payload?._id;

      const crr = state.list.filter(course => course._id !== idToDelete);

      state.list = crr;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ADMIN_COURSES_GET_LIST.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        ADMIN_COURSES_GET_LIST.SUCCESS,
        (state, action: PayloadAction<any>) => {
          console.log('action', action);
          state.loading = false;
          state.pagination = action.payload?.pagination;
          state.list = action.payload?.items;
        },
      )
      .addCase(ADMIN_COURSES_GET_LIST.FAILURE, state => {
        state.loading = false;
      });
  },
});

export const { actions, reducer, name: sliceKey } = adminCoursesSlice;
export const useAdminCoursesSlice = () => {
  useInjectReducer({
    key: adminCoursesSlice.name,
    reducer: adminCoursesSlice.reducer,
  });
  useInjectSaga({ key: adminCoursesSlice.name, saga: adminCoursesSaga });
  return { actions: adminCoursesSlice.actions };
};
