export interface AuthState {
  userName: string | null;
  requestToken: string | null;
  isRequestTokenLoaded: boolean;
  sessionId: string | null;
  accountId: string | null;
  isAuthPopupVisible: boolean;
  error: any;
  redirectUrl?: string;
}

export const initialState: AuthState = {
  userName: null,
  requestToken: null,
  isRequestTokenLoaded: false,
  sessionId: null,
  accountId: null,
  isAuthPopupVisible: false,
  error: null,
  redirectUrl: '',
};
