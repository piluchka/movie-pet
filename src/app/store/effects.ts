import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
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

  constructor(private actions$: Actions, private movieService: MovieService) {}
}
