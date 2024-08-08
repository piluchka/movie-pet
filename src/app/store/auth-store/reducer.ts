import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import {
  createSessionIdFailure,
  createSessionIdSuccess,
  getAccountIdFailure,
  getAccountIdSuccess,
  getRequestTokenFailure,
  getRequestTokenSuccess,
} from './actions';

export const AuthReducer = createReducer(
  initialState,

  //   Request token
  on(getRequestTokenSuccess, (state, { requestToken }) => {
    return {
      ...state,
      requestToken: requestToken,
      isRequestTokenLoaded: true,
    };
  }),

  on(getRequestTokenFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
      requestToken: null,
      isRequestTokenLoaded: false,
    };
  }),

  //   Session Id
  on(createSessionIdSuccess, (state, { sessionId }) => {
    return {
      ...state,
      sessionId: sessionId,
    };
  }),

  on(createSessionIdFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  //   Account Id
  on(getAccountIdSuccess, (state, { accountId }) => {
    return {
      ...state,
      accountId: accountId,
    };
  }),

  on(getAccountIdFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  })
);
