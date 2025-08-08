import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultAdminVocabulariesState } from './types';
import { createRoutine } from 'redux-saga-routines';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { adminVocabulariesSaga } from './saga';

export const ADMIN_VOCABULARIES_GET_LIST = createRoutine(
  'adminVocabularies/getList',
);

export const initialState: DefaultAdminVocabulariesState = {
  list: [],
  loading: false,
};

const adminVocabulariesSlice = createSlice({
  name: 'adminVocabularies',
  initialState,
  reducers: {
    createVocabulary: (state, actions) => {
      const crr = [...state.list];
      crr.unshift(actions.payload);

      state.list = crr;
    },
    updateVocabulary: (state, actions) => {
      const updatedVocabulary = actions.payload;
      const crr = state.list.map(vocabulary =>
        vocabulary._id === updatedVocabulary._id
          ? updatedVocabulary
          : vocabulary,
      );

      state.list = crr;
    },
    deleteVocabulary: (state, actions) => {
      const idToDelete = actions.payload?._id;

      const crr = state.list.filter(
        vocabulary => vocabulary._id !== idToDelete,
      );

      state.list = crr;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ADMIN_VOCABULARIES_GET_LIST.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        ADMIN_VOCABULARIES_GET_LIST.SUCCESS,
        (state, action: PayloadAction<any>) => {
          console.log('action', action);
          state.loading = false;
          state.pagination = action.payload?.pagination;
          state.list = action.payload?.items;
        },
      )
      .addCase(ADMIN_VOCABULARIES_GET_LIST.FAILURE, state => {
        state.loading = false;
      });
  },
});

export const { actions, reducer, name: sliceKey } = adminVocabulariesSlice;
export const useAdminVocabulariesSlice = () => {
  useInjectReducer({
    key: adminVocabulariesSlice.name,
    reducer: adminVocabulariesSlice.reducer,
  });
  useInjectSaga({
    key: adminVocabulariesSlice.name,
    saga: adminVocabulariesSaga,
  });
  return { actions: adminVocabulariesSlice.actions };
};
