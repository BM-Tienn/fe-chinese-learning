/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';

import { InjectedReducersType } from 'utils/types/injector-typings';
import { reducer as notificationsReducer } from 'reapop';

/**
 * Root reducer that can handle reset action
 */
const rootReducer = (injectedReducers: InjectedReducersType = {}) => {
  const appReducer = combineReducers({
    notifications: notificationsReducer(),
    ...injectedReducers,
  });

  return (state: any, action: any) => {
    // If the action is to reset the entire state
    if (action.type === 'RESET_STATE') {
      // Return initial state for all reducers
      const initialState = appReducer(undefined, action);
      return initialState;
    }

    return appReducer(state, action);
  };
};

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Always include notifications reducer, then add any injected reducers
  return rootReducer(injectedReducers);
}
