export interface AuthState {
  userName: string | null;
  requestToken: string | null;
  isRequestTokenLoaded: boolean;
  sessionId: string | null;
  accountId: string | null;
  error: any;
}

export const initialState: AuthState = {
  userName: null,
  requestToken: null,
  isRequestTokenLoaded: false,
  sessionId: null,
  accountId: null,
  error: null,
};
