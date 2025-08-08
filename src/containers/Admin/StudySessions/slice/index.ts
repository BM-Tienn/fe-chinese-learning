import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultAdminStudySessionsState } from './types';
import { createRoutine } from 'redux-saga-routines';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { adminStudySessionsSaga } from './saga';

export const ADMIN_STUDY_SESSIONS_GET_LIST = createRoutine(
  'adminStudySessions/getList',
);

export const initialState: DefaultAdminStudySessionsState = {
  list: [],
  loading: false,
};

const adminStudySessionsSlice = createSlice({
  name: 'adminStudySessions',
  initialState,
  reducers: {
    createStudySession: (state, actions) => {
      const crr = [...state.list];
      crr.unshift(actions.payload);

      state.list = crr;
    },
    updateStudySession: (state, actions) => {
      const updatedStudySession = actions.payload;
      const crr = state.list.map(studySession =>
        studySession._id === updatedStudySession._id
          ? updatedStudySession
          : studySession,
      );

      state.list = crr;
    },
    deleteStudySession: (state, actions) => {
      const idToDelete = actions.payload?._id;

      const crr = state.list.filter(
        studySession => studySession._id !== idToDelete,
      );

      state.list = crr;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ADMIN_STUDY_SESSIONS_GET_LIST.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        ADMIN_STUDY_SESSIONS_GET_LIST.SUCCESS,
        (state, action: PayloadAction<any>) => {
          console.log('action', action);
          state.loading = false;
          state.pagination = action.payload?.pagination;
          state.list = action.payload?.items;
        },
      )
      .addCase(ADMIN_STUDY_SESSIONS_GET_LIST.FAILURE, state => {
        state.loading = false;
      });
  },
});

export const { actions, reducer, name: sliceKey } = adminStudySessionsSlice;
export const useAdminStudySessionsSlice = () => {
  useInjectReducer({
    key: adminStudySessionsSlice.name,
    reducer: adminStudySessionsSlice.reducer,
  });
  useInjectSaga({
    key: adminStudySessionsSlice.name,
    saga: adminStudySessionsSaga,
  });
  return { actions: adminStudySessionsSlice.actions };
};
