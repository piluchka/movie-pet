import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Request token
export const selectRequestToken = createSelector(
  selectAuthState,
  (state) => state.requestToken
);

// Session id
export const selectSessionId = createSelector(
  selectAuthState,
  (state) => state.sessionId
);

// Is token loaded yet
export const selectIsRequestTokenLoaded = createSelector(
  selectAuthState,
  (state) => state.isRequestTokenLoaded
);

export const selectAccountId = createSelector(
  selectAuthState,
  (state) => state.accountId
);
