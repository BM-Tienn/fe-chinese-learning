/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';

import { InjectedReducersType } from 'utils/types/injector-typings';
import { reducer as notificationsReducer } from 'reapop';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Always include notifications reducer, then add any injected reducers
  return combineReducers({
    notifications: notificationsReducer(),
    ...injectedReducers,
  });
}
