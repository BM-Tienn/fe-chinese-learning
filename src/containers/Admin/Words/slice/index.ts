import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultAdminWordsState } from './types';
import { createRoutine } from 'redux-saga-routines';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { adminWordsSaga } from './saga';

export const ADMIN_WORDS_GET_LIST = createRoutine('adminWords/getList');

export const initialState: DefaultAdminWordsState = {
  list: [],
  loading: false,
};

const adminWordsSlice = createSlice({
  name: 'adminWords',
  initialState,
  reducers: {
    createWord: (state, actions) => {
      const crr = [...state.list];
      crr.unshift(actions.payload);

      state.list = crr;
    },
    updateWord: (state, actions) => {
      const updatedWord = actions.payload;
      const crr = state.list.map(word =>
        word._id === updatedWord._id ? updatedWord : word,
      );

      state.list = crr;
    },
    deleteWord: (state, actions) => {
      const idToDelete = actions.payload?._id;

      const crr = state.list.filter(word => word._id !== idToDelete);

      state.list = crr;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ADMIN_WORDS_GET_LIST.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        ADMIN_WORDS_GET_LIST.SUCCESS,
        (state, action: PayloadAction<any>) => {
          console.log('action', action);
          state.loading = false;
          state.pagination = action.payload?.pagination;
          state.list = action.payload?.items;
        },
      )
      .addCase(ADMIN_WORDS_GET_LIST.FAILURE, state => {
        state.loading = false;
      });
  },
});

export const { actions, reducer, name: sliceKey } = adminWordsSlice;
export const useAdminWordsSlice = () => {
  useInjectReducer({
    key: adminWordsSlice.name,
    reducer: adminWordsSlice.reducer,
  });
  useInjectSaga({ key: adminWordsSlice.name, saga: adminWordsSaga });
  return { actions: adminWordsSlice.actions };
};
