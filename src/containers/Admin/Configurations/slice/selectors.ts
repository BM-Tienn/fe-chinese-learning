import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectAdminConfigurations = (state: RootState) =>
  state.adminConfigurations || initialState;

export const selectAdminConfigurationsData = createSelector(
  [selectAdminConfigurations],
  state => state.list,
);
export const selectAdminConfigurationsLoading = createSelector(
  [selectAdminConfigurations],
  state => state.loading,
);
export const selectAdminConfigurationsPagination = createSelector(
  [selectAdminConfigurations],
  state => state.pagination,
);
