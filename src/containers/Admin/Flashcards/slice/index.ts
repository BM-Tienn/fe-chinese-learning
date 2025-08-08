import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultAdminFlashcardsState } from './types';
import { createRoutine } from 'redux-saga-routines';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { adminFlashcardsSaga } from './saga';

export const ADMIN_FLASHCARDS_GET_LIST = createRoutine(
  'adminFlashcards/getList',
);

export const initialState: DefaultAdminFlashcardsState = {
  list: [],
  loading: false,
};

const adminFlashcardsSlice = createSlice({
  name: 'adminFlashcards',
  initialState,
  reducers: {
    createFlashcardSet: (state, actions) => {
      const crr = [...state.list];
      crr.unshift(actions.payload);

      state.list = crr;
    },
    updateFlashcardSet: (state, actions) => {
      const updatedFlashcardSet = actions.payload;
      const crr = state.list.map(flashcardSet =>
        flashcardSet._id === updatedFlashcardSet._id
          ? updatedFlashcardSet
          : flashcardSet,
      );

      state.list = crr;
    },
    deleteFlashcardSet: (state, actions) => {
      const idToDelete = actions.payload?._id;

      const crr = state.list.filter(
        flashcardSet => flashcardSet._id !== idToDelete,
      );

      state.list = crr;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ADMIN_FLASHCARDS_GET_LIST.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        ADMIN_FLASHCARDS_GET_LIST.SUCCESS,
        (state, action: PayloadAction<any>) => {
          console.log('action', action);
          state.loading = false;
          state.pagination = action.payload?.pagination;
          state.list = action.payload?.items;
        },
      )
      .addCase(ADMIN_FLASHCARDS_GET_LIST.FAILURE, state => {
        state.loading = false;
      });
  },
});

export const { actions, reducer, name: sliceKey } = adminFlashcardsSlice;
export const useAdminFlashcardsSlice = () => {
  useInjectReducer({
    key: adminFlashcardsSlice.name,
    reducer: adminFlashcardsSlice.reducer,
  });
  useInjectSaga({ key: adminFlashcardsSlice.name, saga: adminFlashcardsSaga });
  return { actions: adminFlashcardsSlice.actions };
};
