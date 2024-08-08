import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { MovieDetails } from '../../models/movie-details.model';

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

// Movie by Id - Action block
export const loadMovieById = createAction(
  '[Movie] Load Movie By Id',
  props<{ id: number }>()
);

export const loadMovieByIdSuccess = createAction(
  '[Movie] Load Movie By Id Success',
  props<{ selectedMovie: MovieDetails | null }>()
);
export const loadMovieByIdFailure = createAction(
  '[Movie] Load Movie By Id Failure',
  props<{ error: any }>()
);

// Favorite movies - Action block
// Load
export const loadFavoriteMovies = createAction('[Movie] Load Favorite Movies');

export const loadFavoriteMoviesSuccess = createAction(
  '[Movie] Load Favorite Movies Success',
  props<{ favoriteMoviesList: Movie[] | null }>()
);
export const loadFavoriteMoviesFailure = createAction(
  '[Movie] Load Favorite Movies Failure',
  props<{ error: any }>()
);

// Set
export const setMovieToFavoriteMovies = createAction(
  '[Movie] Set Movie to Favorite Movies',
  props<{ id: number }>()
);

export const setMovieToFavoriteMoviesSuccess = createAction(
  '[Movie] Set Movie to Favorite Movies Success'
);
export const setMovieToFavoriteMoviesFailure = createAction(
  '[Movie] Set Movie to Favorite Movies Failure',
  props<{ error: any }>()
);

// Delete
export const deleteMovieFromFavoriteMovies = createAction(
  '[Movie] Delete Movie from Favorite Movies',
  props<{ id: number; path: string | undefined }>()
);

export const deleteMovieFromFavoriteMoviesSuccess = createAction(
  '[Movie] Delete Movie from Favorite Movies Success'
);
export const deleteMovieFromFavoriteMoviesFailure = createAction(
  '[Movie] Delete Movie from Favorite Movies Failure',
  props<{ error: any }>()
);

// Watch later movies - Action block
export const loadWatchLaterMovies = createAction(
  '[Movie] Load Watch Later Movies'
);

export const loadWatchLaterMoviesSuccess = createAction(
  '[Movie] Load Watch Later Movies Success',
  props<{ watchLaterMoviesList: Movie[] | null }>()
);
export const loadWatchLaterMoviesFailure = createAction(
  '[Movie] Load Watch Later Movies Failure',
  props<{ error: any }>()
);

// Set
export const setMovieToWatchLaterMovies = createAction(
  '[Movie] Set Movie to Watch Later Movies',
  props<{ id: number }>()
);

export const setMovieToWatchLaterMoviesSuccess = createAction(
  '[Movie] Set Movie to Watch Later Success'
);
export const setMovieToWatchLaterMoviesFailure = createAction(
  '[Movie] Set Movie to Watch Later Failure',
  props<{ error: any }>()
);

// Delete
export const deleteMovieFromWatchLaterMovies = createAction(
  '[Movie] Delete Movie from Watch Later Movies',
  props<{ id: number; path: string | undefined }>()
);

export const deleteMovieFromWatchLaterMoviesSuccess = createAction(
  '[Movie] Delete Movie from Watch Later Movies Success'
);
export const deleteMovieFromWatchLaterMoviesFailure = createAction(
  '[Movie] Delete Movie from Watch Later Movies Failure',
  props<{ error: any }>()
);