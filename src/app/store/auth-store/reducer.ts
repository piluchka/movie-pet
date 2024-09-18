import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import {
  createSessionIdFailure,
  createSessionIdSuccess,
  getAccountIdFailure,
  getAccountIdSuccess,
  getRequestTokenFailure,
  getRequestTokenSuccess,
  hideAuthPopup,
  showAuthPopup,
  validateRequestTokenFailure,
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

  // Validation
  on(validateRequestTokenFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  //   Session Id
  on(createSessionIdSuccess, (state, { sessionId }) => {
    return {
      ...state,
      sessionId: sessionId,
      error: null,
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
      error: null,
    };
  }),

  on(getAccountIdFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  // Popup
  on(showAuthPopup, (state) => {
    return {
      ...state,
      isAuthPopupVisible: true,
    };
  }),

  on(hideAuthPopup, (state) => {
    return {
      ...state,
      isAuthPopupVisible: false,
    };
  })
);
