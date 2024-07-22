import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadAllMovies,
  loadAllMoviesFailure,
  loadAllMoviesSuccess,
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
              loadNowPlayingMoviesFailure({
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

  constructor(private actions$: Actions, private movieService: MovieService) {}
}
