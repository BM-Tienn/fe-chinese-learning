import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultAdminUsersState } from './types';
import { createRoutine } from 'redux-saga-routines';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { adminUsersSaga } from './saga';

export const ADMIN_USERS_GET_LIST = createRoutine('adminUsers/getList');

export const initialState: DefaultAdminUsersState = {
  list: [],
  loading: false,
};

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {
    createUser: (state, actions) => {
      const crr = [...state.list];
      crr.unshift(actions.payload);

      state.list = crr;
    },
    updateUser: (state, actions) => {
      const updatedUser = actions.payload;
      const crr = state.list.map(user =>
        user._id === updatedUser._id ? updatedUser : user,
      );

      state.list = crr;
    },
    deleteUser: (state, actions) => {
      const idToDelete = actions.payload?._id;

      const crr = state.list.filter(user => user._id !== idToDelete);

      state.list = crr;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ADMIN_USERS_GET_LIST.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        ADMIN_USERS_GET_LIST.SUCCESS,
        (state, action: PayloadAction<any>) => {
          console.log('action', action);
          state.loading = false;
          state.pagination = action.payload?.pagination;
          state.list = action.payload?.items;
        },
      )
      .addCase(ADMIN_USERS_GET_LIST.FAILURE, state => {
        state.loading = false;
      });
  },
});

export const { actions, reducer, name: sliceKey } = adminUsersSlice;
export const useAdminUsersSlice = () => {
  useInjectReducer({
    key: adminUsersSlice.name,
    reducer: adminUsersSlice.reducer,
  });
  useInjectSaga({ key: adminUsersSlice.name, saga: adminUsersSaga });
  return { actions: adminUsersSlice.actions };
};
