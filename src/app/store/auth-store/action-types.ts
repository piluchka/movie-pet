export enum AuthTypes {
  REQUEST_TOKEN = '[Auth] Get Request Token',
  REQUEST_TOKEN_SUCCESS = '[Auth] Get Request Token Success',
  REQUEST_TOKEN_FAILURE = '[Auth] Get Request Token Failure',
  TOKEN_VALIDATION = '[Auth] Validate Request Token',
  TOKEN_VALIDATION_SUCCESS = '[Auth] Validate Request Token Success',
  TOKEN_VALIDATION_FAILURE = '[Auth] Validate Request Token Failure',
  SESSION_ID_CREATION = '[Auth] Create Session Id',
  SESSION_ID_CREATION_SUCCESS = '[Auth] Create Session Id Success',
  SESSION_ID_CREATION_FAILURE = '[Auth] Create Session Id Failure',
  ACCOUNT_ID_GETTER = '[Auth] Get Account Id',
  ACCOUNT_ID_GETTER_SUCCESS = '[Auth] Get Account Id Success',
  ACCOUNT_ID_GETTER_FAILURE = '[Auth] Get Account Id Failure',
}
