import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectRequestToken = createSelector(
  selectAuthState,
  (state) => state.requestToken
);

export const selectSessionId = createSelector(
  selectAuthState,
  (state) => state.sessionId
);

export const selectIsRequestTokenLoaded = createSelector(
  selectAuthState,
  (state) => state.isRequestTokenLoaded
);
