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

// Account Id
export const selectAccountId = createSelector(
  selectAuthState,
  (state) => state.accountId
);

// Popup Visibility
export const selectIsAuthPopupVisible = createSelector(
  selectAuthState,
  (state) => state.isAuthPopupVisible
);

// Error
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
