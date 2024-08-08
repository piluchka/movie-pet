import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
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
import { MovieService } from '../services/movie/movie.service';

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
      mergeMap(() => {
        return this.movieService.getAllMovies().pipe(
          map((movieList) =>
            loadAllMoviesSuccess({
              allMoviesList: movieList,
            })
          ),
          catchError((error) =>
            of(
              loadAllMoviesFailure({
                error: error,
              })
            )
          )
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
      mergeMap(() => {
        return this.movieService.getMovieFavoriteList().pipe(
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
      })
    )
  );

  // For setting Movie to Favorite Movies
  setMovieToFavoriteMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setMovieToFavoriteMovies),
      switchMap((props) => {
        return this.movieService.setMovieToFavoriteMovieList(props.id).pipe(
          map(() => setMovieToFavoriteMoviesSuccess()),
          catchError((error) =>
            of(setMovieToFavoriteMoviesFailure({ error: error }))
          )
        );
      })
    )
  );

  // For deleting Movie from Favorite Movies
  deleteMovieFromFavoriteMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteMovieFromFavoriteMovies),
      switchMap((props) => {
        return this.movieService
          .deleteMovieFromFavoriteMovieList(props.id)
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
      })
    )
  );

  // For loading Watch Later Movies
  loadWatchLaterMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWatchLaterMovies),
      mergeMap(() => {
        return this.movieService.getWatchLaterMovieList().pipe(
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
      })
    )
  );

  // For setting Movie from Watch Later Movies
  setMovieToWatchLaterMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setMovieToWatchLaterMovies),
      switchMap((props) => {
        return this.movieService.setToWatchLaterMovieList(props.id).pipe(
          map(() => setMovieToWatchLaterMoviesSuccess()),
          catchError((error) =>
            of(setMovieToWatchLaterMoviesFailure({ error: error }))
          )
        );
      })
    )
  );

  // For deleting Movie from Watch Later Movies
  deleteMovieFromWatchLaterMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteMovieFromWatchLaterMovies),
      switchMap((props) => {
        return this.movieService.deleteMovieWatchLaterMovieList(props.id).pipe(
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
      })
    );
  });

  constructor(private actions$: Actions, private movieService: MovieService) {}
}
