import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import {
  deleteMovieFromFavoriteMovies,
  deleteMovieFromFavoriteMoviesFailure,
  deleteMovieFromFavoriteMoviesSuccess,
  deleteMovieFromWatchLaterMovies,
  deleteMovieFromWatchLaterMoviesFailure,
  deleteMovieFromWatchLaterMoviesSuccess,
  loadAllMovies,
  loadAllMoviesFailure,
  loadAllMoviesSuccess,
  loadFavoriteMovies,
  loadFavoriteMoviesFailure,
  loadFavoriteMoviesSuccess,
  loadMovieById,
  loadMovieByIdFailure,
  loadMovieByIdSuccess,
  loadNowPlayingMovies,
  loadNowPlayingMoviesFailure,
  loadNowPlayingMoviesSuccess,
  loadPopularMovies,
  loadPopularMoviesFailure,
  loadPopularMoviesSuccess,
  loadSearchingMovies,
  loadTopRatedMovies,
  loadTopRatedMoviesFailure,
  loadTopRatedMoviesSuccess,
  loadUpcomingMovies,
  loadUpcomingMoviesFailure,
  loadUpcomingMoviesSuccess,
  loadWatchLaterMovies,
  loadWatchLaterMoviesFailure,
  loadWatchLaterMoviesSuccess,
  setMovieToFavoriteMovies,
  setMovieToFavoriteMoviesFailure,
  setMovieToFavoriteMoviesSuccess,
  setMovieToWatchLaterMovies,
  setMovieToWatchLaterMoviesFailure,
  setMovieToWatchLaterMoviesSuccess,
} from './actions';
import { MovieService } from '../../services/movie/movie.service';
import { Store } from '@ngrx/store';
import { selectAccountId, selectSessionId } from '../auth-store/selectors';
import {
  selectNowPlayingMovies,
  selectPopularMovies,
  selectTopRatedMovies,
  selectUpcomingMovies,
} from './selectors';

@Injectable()
export class MovieEffects {
  // For loading Popular movies
  loadPopularMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPopularMovies),
      mergeMap(() => {
        return this.movieService.getPopularMovies().pipe(
          map((movieList) =>
            loadPopularMoviesSuccess({
              popularMoviesList: movieList,
            })
          ),
          catchError((error) =>
            of(
              loadPopularMoviesFailure({
                error,
              })
            )
          )
        );
      })
    )
  );

  // For loading Now Playing movies
  loadNowPlayingMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNowPlayingMovies),
      mergeMap(() => {
        return this.movieService.getNowPlayingMovies().pipe(
          map((movieList) =>
            loadNowPlayingMoviesSuccess({
              nowPlayingMoviesList: movieList,
            })
          ),
          catchError((error) =>
            of(
              loadNowPlayingMoviesFailure({
                error,
              })
            )
          )
        );
      })
    )
  );

  // For loading Top Rated movies
  loadTopRatedMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTopRatedMovies),
      mergeMap(() => {
        return this.movieService.getTopRatedMovies().pipe(
          map((movieList) =>
            loadTopRatedMoviesSuccess({
              topRatedMoviesList: movieList,
            })
          ),
          catchError((error) =>
            of(
              loadTopRatedMoviesFailure({
                error,
              })
            )
          )
        );
      })
    )
  );

  // For loading Upcoming movies
  loadUpcomingMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUpcomingMovies),
      mergeMap(() => {
        return this.movieService.getUpcomingMovies().pipe(
          map((movieList) =>
            loadUpcomingMoviesSuccess({
              upcomingMoviesList: movieList,
            })
          ),
          catchError((error) =>
            of(
              loadUpcomingMoviesFailure({
                error,
              })
            )
          )
        );
      })
    )
  );

  // For loading All Movies
  loadAllMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllMovies), 
      switchMap(() => {
        this.movieStore.dispatch(loadNowPlayingMovies());
        this.movieStore.dispatch(loadPopularMovies());
        this.movieStore.dispatch(loadTopRatedMovies());
        this.movieStore.dispatch(loadUpcomingMovies());

        return forkJoin([
          this.movieStore.select(selectNowPlayingMovies).pipe(
            filter((data) => !!data),
            take(1),
            catchError((error) => of([]))
          ),
          this.movieStore.select(selectPopularMovies).pipe(
            filter((data) => !!data),
            take(1),
            catchError((error) => of([]))
          ),
          this.movieStore.select(selectTopRatedMovies).pipe(
            filter((data) => !!data),
            take(1),
            catchError((error) => of([]))
          ),
          this.movieStore.select(selectUpcomingMovies).pipe(
            filter((data) => !!data),
            take(1),
            catchError((error) => of([]))
          ),
        ]).pipe(
          map(([nowPlaying, popular, topRated, upcoming]) => {
            const combinedMovies = [
              ...(nowPlaying || []),
              ...(popular || []),
              ...(topRated || []),
              ...(upcoming || []),
            ];
            return loadAllMoviesSuccess({ allMoviesList: combinedMovies });
          }),
          catchError((error) => of(loadAllMoviesFailure({ error: error })))
        );
      })
    )
  );

  // For loading Movie By Id
  loadMovieById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMovieById),
      mergeMap((props) => {
        return this.movieService.getMovieById(props.id).pipe(
          map((movie) =>
            loadMovieByIdSuccess({
              selectedMovie: movie,
            })
          ),
          catchError((error) =>
            of(
              loadMovieByIdFailure({
                error: error,
              })
            )
          )
        );
      })
    )
  );

  // For loading Favorite Movies
  loadFavoriteMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFavoriteMovies),
      withLatestFrom(
        this.authStore.select(selectAccountId),
        this.authStore.select(selectSessionId)
      ),
      switchMap(([actions, accountId, sessionId]) => {
        if (accountId && sessionId) {
          return this.movieService
            .getMovieFavoriteList(accountId, sessionId)
            .pipe(
              map((movies) =>
                loadFavoriteMoviesSuccess({
                  favoriteMoviesList: movies,
                })
              ),
              catchError((error) =>
                of(
                  loadFavoriteMoviesFailure({
                    error: error,
                  })
                )
              )
            );
        } else {
          return of(
            loadFavoriteMoviesFailure({
              error: 'Account Id or Session Id is missing',
            })
          );
        }
      })
    )
  );

  // For setting Movie to Favorite Movies
  setMovieToFavoriteMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setMovieToFavoriteMovies),
      withLatestFrom(
        this.authStore.select(selectAccountId),
        this.authStore.select(selectSessionId)
      ),
      switchMap(([props, accountId, sessionId]) => {
        if (accountId && sessionId) {
          return this.movieService
            .setMovieToFavoriteMovieList(accountId, sessionId, props.id)
            .pipe(
              map(() => setMovieToFavoriteMoviesSuccess()),
              catchError((error) =>
                of(setMovieToFavoriteMoviesFailure({ error: error }))
              )
            );
        } else {
          return of(
            loadFavoriteMoviesFailure({
              error: 'Account Id or Session Id is missing',
            })
          );
        }
      })
    )
  );

  // For deleting Movie from Favorite Movies
  deleteMovieFromFavoriteMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteMovieFromFavoriteMovies),
      withLatestFrom(
        this.authStore.select(selectAccountId),
        this.authStore.select(selectSessionId)
      ),
      switchMap(([props, accountId, sessionId]) => {
        if (accountId && sessionId) {
          return this.movieService
            .deleteMovieFromFavoriteMovieList(accountId, sessionId, props.id)
            .pipe(
              switchMap(() => {
                const actions = [];
                if (props.path === 'favorite') {
                  actions.push(loadFavoriteMovies());
                }
                actions.push(deleteMovieFromFavoriteMoviesSuccess());
                return of(...actions);
              }),
              catchError((error) =>
                of(deleteMovieFromFavoriteMoviesFailure({ error: error }))
              )
            );
        } else {
          return of(
            loadFavoriteMoviesFailure({
              error: 'Account Id or Session Id is missing',
            })
          );
        }
      })
    )
  );

  // For loading Watch Later Movies
  loadWatchLaterMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWatchLaterMovies),
      withLatestFrom(
        this.authStore.select(selectAccountId),
        this.authStore.select(selectSessionId)
      ),
      switchMap(([actions, accountId, sessionId]) => {
        if (accountId && sessionId) {
          return this.movieService
            .getWatchLaterMovieList(accountId, sessionId)
            .pipe(
              map((movies) =>
                loadWatchLaterMoviesSuccess({
                  watchLaterMoviesList: movies,
                })
              ),
              catchError((error) =>
                of(
                  loadWatchLaterMoviesFailure({
                    error: error,
                  })
                )
              )
            );
        } else {
          return of(
            loadFavoriteMoviesFailure({
              error: 'Account Id or Session Id is missing',
            })
          );
        }
      })
    )
  );

  // For setting Movie from Watch Later Movies
  setMovieToWatchLaterMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setMovieToWatchLaterMovies),
      withLatestFrom(
        this.authStore.select(selectAccountId),
        this.authStore.select(selectSessionId)
      ),
      switchMap(([props, accountId, sessionId]) => {
        if (accountId && sessionId) {
          return this.movieService
            .setToWatchLaterMovieList(accountId, sessionId, props.id)
            .pipe(
              map(() => setMovieToWatchLaterMoviesSuccess()),
              catchError((error) =>
                of(setMovieToWatchLaterMoviesFailure({ error: error }))
              )
            );
        } else {
          return of(
            loadFavoriteMoviesFailure({
              error: 'Account Id or Session Id is missing',
            })
          );
        }
      })
    )
  );

  // For deleting Movie from Watch Later Movies
  deleteMovieFromWatchLaterMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteMovieFromWatchLaterMovies),
      withLatestFrom(
        this.authStore.select(selectAccountId),
        this.authStore.select(selectSessionId)
      ),
      switchMap(([props, accountId, sessionId]) => {
        if (accountId && sessionId) {
          return this.movieService
            .deleteMovieWatchLaterMovieList(accountId, sessionId, props.id)
            .pipe(
              switchMap(() => {
                const actions = [];
                if (props.path === 'watch-later') {
                  actions.push(loadWatchLaterMovies());
                }
                actions.push(deleteMovieFromWatchLaterMoviesSuccess());
                return of(...actions);
              }),
              catchError((error) =>
                of(deleteMovieFromWatchLaterMoviesFailure({ error: error }))
              )
            );
        } else {
          return of(
            loadFavoriteMoviesFailure({
              error: 'Account Id or Session Id is missing',
            })
          );
        }
      })
    );
  });

  // For loading Searching Movies
  loadSearchingMovies$ = createEffect(() => {
    return this.actions$.pipe(ofType(loadSearchingMovies));
  });

  constructor(
    private actions$: Actions,
    private movieService: MovieService,
    private authStore: Store,
    private movieStore: Store
  ) {}
}
