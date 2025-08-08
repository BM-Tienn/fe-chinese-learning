import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultAdminLessonsState } from './types';
import { createRoutine } from 'redux-saga-routines';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { adminLessonsSaga } from './saga';

export const ADMIN_LESSONS_GET_LIST = createRoutine('adminLessons/getList');

export const initialState: DefaultAdminLessonsState = {
  list: [],
  loading: false,
};

const adminLessonsSlice = createSlice({
  name: 'adminLessons',
  initialState,
  reducers: {
    createLesson: (state, actions) => {
      const crr = [...state.list];
      crr.unshift(actions.payload);

      state.list = crr;
    },
    updateLesson: (state, actions) => {
      const updatedLesson = actions.payload;
      const crr = state.list.map(lesson =>
        lesson._id === updatedLesson._id ? updatedLesson : lesson,
      );

      state.list = crr;
    },
    deleteLesson: (state, actions) => {
      const idToDelete = actions.payload?._id;

      const crr = state.list.filter(lesson => lesson._id !== idToDelete);

      state.list = crr;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ADMIN_LESSONS_GET_LIST.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        ADMIN_LESSONS_GET_LIST.SUCCESS,
        (state, action: PayloadAction<any>) => {
          console.log('action', action);
          state.loading = false;
          state.pagination = action.payload?.pagination;
          state.list = action.payload?.items;
        },
      )
      .addCase(ADMIN_LESSONS_GET_LIST.FAILURE, state => {
        state.loading = false;
      });
  },
});

export const { actions, reducer, name: sliceKey } = adminLessonsSlice;
export const useAdminLessonsSlice = () => {
  useInjectReducer({
    key: adminLessonsSlice.name,
    reducer: adminLessonsSlice.reducer,
  });
  useInjectSaga({ key: adminLessonsSlice.name, saga: adminLessonsSaga });
  return { actions: adminLessonsSlice.actions };
};
