import { createAction, props } from '@ngrx/store';
import { Movie } from '../models/movie.model';

// Popular movies - Actions block
export const loadPopularMovies = createAction('[Movie] Load Popular Movies');

export const loadPopularMoviesSuccess = createAction(
  '[Movie] Load Popular Movies Success',
  props<{ popularMoviesList: Movie[] | null }>()
);
export const loadPopularMoviesFailure = createAction(
  '[Movie] Load Popular Movies Failure',
  props<{ error: any }>()
);

// Mow Playing movies - Actions block
export const loadNowPlayingMovies = createAction(
  '[Movie] Load Now Playing Movies'
);

export const loadNowPlayingMoviesSuccess = createAction(
  '[Movie] Load Now Playing Movies Success',
  props<{ nowPlayingMoviesList: Movie[] | null }>()
);
export const loadNowPlayingMoviesFailure = createAction(
  '[Movie] Load Now Playing Movies Failure',
  props<{ error: any }>()
);

// Top Rated movies - Actions block
export const loadTopRatedMovies = createAction('[Movie] Load Top Rated Movies');

export const loadTopRatedMoviesSuccess = createAction(
  '[Movie] Load Top Rated Movies Success',
  props<{ topRatedMoviesList: Movie[] | null }>()
);
export const loadTopRatedMoviesFailure = createAction(
  '[Movie] Load Top Rated Movies Failure',
  props<{ error: any }>()
);

// Upcoming movies - Action block
export const loadUpcomingMovies = createAction('[Movie] Load Upcoming Movies');

export const loadUpcomingMoviesSuccess = createAction(
  '[Movie] Load Upcoming Movies Success',
  props<{ upcomingMoviesList: Movie[] | null }>()
);
export const loadUpcomingMoviesFailure = createAction(
  '[Movie] Load Upcoming Movies Failure',
  props<{ error: any }>()
);

// All movies - Action block
export const loadAllMovies = createAction('[Movie] Load All Movies');

export const loadAllMoviesSuccess = createAction(
  '[Movie] Load All Movies Success',
  props<{ allMoviesList: Movie[] | null }>()
);
export const loadAllMoviesFailure = createAction(
  '[Movie] Load All Movies Failure',
  props<{ error: any }>()
);