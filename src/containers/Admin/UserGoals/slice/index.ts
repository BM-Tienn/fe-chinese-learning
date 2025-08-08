import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultAdminUserGoalsState } from './types';
import { createRoutine } from 'redux-saga-routines';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { adminUserGoalsSaga } from './saga';

export const ADMIN_USER_GOALS_GET_LIST = createRoutine(
  'adminUserGoals/getList',
);

export const initialState: DefaultAdminUserGoalsState = {
  list: [],
  loading: false,
};

const adminUserGoalsSlice = createSlice({
  name: 'adminUserGoals',
  initialState,
  reducers: {
    createUserGoal: (state, actions) => {
      const crr = [...state.list];
      crr.unshift(actions.payload);

      state.list = crr;
    },
    updateUserGoal: (state, actions) => {
      const updatedUserGoal = actions.payload;
      const crr = state.list.map(userGoal =>
        userGoal._id === updatedUserGoal._id ? updatedUserGoal : userGoal,
      );

      state.list = crr;
    },
    deleteUserGoal: (state, actions) => {
      const idToDelete = actions.payload?._id;

      const crr = state.list.filter(userGoal => userGoal._id !== idToDelete);

      state.list = crr;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ADMIN_USER_GOALS_GET_LIST.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        ADMIN_USER_GOALS_GET_LIST.SUCCESS,
        (state, action: PayloadAction<any>) => {
          console.log('action', action);
          state.loading = false;
          state.pagination = action.payload?.pagination;
          state.list = action.payload?.items;
        },
      )
      .addCase(ADMIN_USER_GOALS_GET_LIST.FAILURE, state => {
        state.loading = false;
      });
  },
});

export const { actions, reducer, name: sliceKey } = adminUserGoalsSlice;
export const useAdminUserGoalsSlice = () => {
  useInjectReducer({
    key: adminUserGoalsSlice.name,
    reducer: adminUserGoalsSlice.reducer,
  });
  useInjectSaga({ key: adminUserGoalsSlice.name, saga: adminUserGoalsSaga });
  return { actions: adminUserGoalsSlice.actions };
};
