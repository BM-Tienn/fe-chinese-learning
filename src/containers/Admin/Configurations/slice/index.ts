import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultAdminConfigurationsState } from './types';
import { createRoutine } from 'redux-saga-routines';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { adminConfigurationsSaga } from './saga';

export const ADMIN_CONFIGURATIONS_GET_LIST = createRoutine(
  'adminConfigurations/getList',
);

export const initialState: DefaultAdminConfigurationsState = {
  list: [],
  loading: false,
};

const adminConfigurationsSlice = createSlice({
  name: 'adminConfigurations',
  initialState,
  reducers: {
    createConfiguration: (state, actions) => {
      const crr = [...state.list];
      crr.unshift(actions.payload);

      state.list = crr;
    },
    updateConfiguration: (state, actions) => {
      const updatedConfiguration = actions.payload;
      const crr = state.list.map(configuration =>
        configuration._id === updatedConfiguration._id
          ? updatedConfiguration
          : configuration,
      );

      state.list = crr;
    },
    deleteConfiguration: (state, actions) => {
      const idToDelete = actions.payload?._id;

      const crr = state.list.filter(
        configuration => configuration._id !== idToDelete,
      );

      state.list = crr;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ADMIN_CONFIGURATIONS_GET_LIST.TRIGGER, state => {
        state.loading = true;
      })
      .addCase(
        ADMIN_CONFIGURATIONS_GET_LIST.SUCCESS,
        (state, action: PayloadAction<any>) => {
          console.log('action', action);
          state.loading = false;
          state.pagination = action.payload?.pagination;
          state.list = action.payload?.items;
        },
      )
      .addCase(ADMIN_CONFIGURATIONS_GET_LIST.FAILURE, state => {
        state.loading = false;
      });
  },
});

export const { actions, reducer, name: sliceKey } = adminConfigurationsSlice;
export const useAdminConfigurationsSlice = () => {
  useInjectReducer({
    key: adminConfigurationsSlice.name,
    reducer: adminConfigurationsSlice.reducer,
  });
  useInjectSaga({
    key: adminConfigurationsSlice.name,
    saga: adminConfigurationsSaga,
  });
  return { actions: adminConfigurationsSlice.actions };
};
