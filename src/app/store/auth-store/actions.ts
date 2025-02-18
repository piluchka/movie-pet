import { createAction, props } from '@ngrx/store';
import { AuthTypes } from './action-types';

// Request Token block
export const getRequestToken = createAction(AuthTypes.REQUEST_TOKEN);

export const getRequestTokenSuccess = createAction(
  AuthTypes.REQUEST_TOKEN_SUCCESS,
  props<{ requestToken: string }>()
);
export const getRequestTokenFailure = createAction(
  AuthTypes.REQUEST_TOKEN_FAILURE,
  props<{ error: any }>()
);

// Validation Token block
export const validateRequestToken = createAction(
  AuthTypes.TOKEN_VALIDATION,
  props<{ userName: string; password: string }>()
);

export const validateRequestTokenSuccess = createAction(
  AuthTypes.TOKEN_VALIDATION_SUCCESS
);
export const validateRequestTokenFailure = createAction(
  AuthTypes.TOKEN_VALIDATION_FAILURE,
  props<{ error: any }>()
);

// Create session id
export const createSessionId = createAction(AuthTypes.SESSION_ID_CREATION);

export const createSessionIdSuccess = createAction(
  AuthTypes.SESSION_ID_CREATION_SUCCESS,
  props<{ sessionId: string }>()
);
export const createSessionIdFailure = createAction(
  AuthTypes.SESSION_ID_CREATION_FAILURE,
  props<{ error: any }>()
);

// Get account id
export const getAccountId = createAction(AuthTypes.ACCOUNT_ID_GETTER);

export const getAccountIdSuccess = createAction(
  AuthTypes.ACCOUNT_ID_GETTER_SUCCESS,
  props<{ accountId: string }>()
);
export const getAccountIdFailure = createAction(
  AuthTypes.ACCOUNT_ID_GETTER_FAILURE,
  props<{ error: any }>()
);

// Popup
export const showAuthPopup = createAction(
  AuthTypes.SHOW_AUTH_POPUP,
  props<{ redirectUrl?: string }>()
);
export const hideAuthPopup = createAction(AuthTypes.HIDE_AUTH_POPUP);
