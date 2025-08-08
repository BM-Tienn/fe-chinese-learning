import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultAdminUserProgressState } from './types';
import { createRoutine } from 'redux-saga-routines';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { adminUserProgressSaga } from './saga';

export const ADMIN_USER_PROGRESS_GET_LIST = createRoutine(
  'adminUserProgress/getList',
);

export const initialState: DefaultAdminUserProgressState = {
  list: [],
  loading: false,
};

const adminUserProgressSlice = createSlice({
  name: 'adminUserProgress',
  initialState,
  reducers: {
    createUserProgress: (state, actions) => {
      const crr = [...state.list];
      crr.unshift(actions.payload);

      state.list = crr;
    },
    updateUserProgress: (state, actions) => {
      const updatedUserProgress = actions.payload;
      const crr = state.list.map(userProgress =>
        userProgress._id === updatedUserProgress._id
          ? updatedUserProgress
          : userProgress,
      );

      state.list = crr;
    },
    deleteUserProgress: (state, actions) => {
      const idToDelete = actions.payload?._id;

      const crr = state.list.filter(
        userProgress => userProgress._id !== idToDelete,
      );

      state.list = crr;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ADMIN_USER_PROGRESS_GET_LIST.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        ADMIN_USER_PROGRESS_GET_LIST.SUCCESS,
        (state, action: PayloadAction<any>) => {
          console.log('action', action);
          state.loading = false;
          state.pagination = action.payload?.pagination;
          state.list = action.payload?.items;
        },
      )
      .addCase(ADMIN_USER_PROGRESS_GET_LIST.FAILURE, state => {
        state.loading = false;
      });
  },
});

export const { actions, reducer, name: sliceKey } = adminUserProgressSlice;
export const useAdminUserProgressSlice = () => {
  useInjectReducer({
    key: adminUserProgressSlice.name,
    reducer: adminUserProgressSlice.reducer,
  });
  useInjectSaga({
    key: adminUserProgressSlice.name,
    saga: adminUserProgressSaga,
  });
  return { actions: adminUserProgressSlice.actions };
};
