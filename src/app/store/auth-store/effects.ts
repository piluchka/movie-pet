import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  createSessionIdFailure,
  createSessionIdSuccess,
  getAccountIdFailure,
  getAccountIdSuccess,
  getRequestToken,
  getRequestTokenFailure,
  getRequestTokenSuccess,
  hideAuthPopup,
  validateRequestToken,
  validateRequestTokenFailure,
  validateRequestTokenSuccess,
} from './actions';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAuthState,
  selectRequestToken,
  selectSessionId,
} from './selectors';
import {
  loadFavoriteMovies,
  loadWatchLaterMovies,
} from '../movie-store/actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  // Get a request token for user
  getRequestToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRequestToken),
      switchMap(() => {
        return this.authService.getRequestToken().pipe(
          map((requestToken) =>
            getRequestTokenSuccess({ requestToken: requestToken })
          ),
          catchError((error) => of(getRequestTokenFailure({ error: error })))
        );
      })
    )
  );

  //   Validate a request token
  validateRequestToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(validateRequestToken),
      withLatestFrom(this.authStore.select(selectRequestToken)),
      switchMap(([props, requestToken]) => {
        return this.authService
          .validateRequestToken(props.userName, props.password, requestToken)
          .pipe(
            map(() => validateRequestTokenSuccess()),
            catchError((error) => {
              console.error('Caught in effect:', error);
              return of(validateRequestTokenFailure({ error: error }));
            })
          );
      })
    )
  );

  createSessionId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(validateRequestTokenSuccess),
      withLatestFrom(this.authStore.select(selectRequestToken)),
      switchMap(([actions, requestToken]) => {
        return this.authService.createSession(requestToken).pipe(
          map((sessionId) => createSessionIdSuccess({ sessionId: sessionId })),
          catchError((error) => of(createSessionIdFailure({ error: error })))
        );
      })
    )
  );

  getAccountId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createSessionIdSuccess),
      withLatestFrom(this.authStore.select(selectSessionId)),
      switchMap(([actions, sessionId]) => {
        return this.authService.getAccountId(sessionId).pipe(
          map((accountId) => {
            return getAccountIdSuccess({ accountId: accountId.id });
          }),
          catchError((error) => of(getAccountIdFailure({ error: error })))
        );
      })
    )
  );

  closeAuthPopup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAccountIdSuccess),
      withLatestFrom(this.authStore.select(selectAuthState)),
      tap(([_, authState]) => {
        this.movieStore.dispatch(loadFavoriteMovies());
        this.movieStore.dispatch(loadWatchLaterMovies());

        if (authState.redirectUrl) {
          this.router.navigate([authState.redirectUrl]);
        }
      }),
      map(() => hideAuthPopup())
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authStore: Store,
    private movieStore: Store,
    private router: Router
  ) {}
}
