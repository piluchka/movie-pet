import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MovieState } from './state';

export const selectState = createFeatureSelector<MovieState>('movie');

// Popular movies
export const selectPopularMovies = createSelector(
  selectState,
  (state) => state.popularMoviesList
);

// Now Playing movies
export const selectNowPlayingMovies = createSelector(
  selectState,
  (state) => state.nowPlayingMoviesList
);

// Top Rated Movies
export const selectTopRatedMovies = createSelector(
  selectState,
  (state) => state.topRatedMoviesList
);

// Upcoming movies
export const selectUpcomingMovies = createSelector(
  selectState,
  (state) => state.upcomingMoviesList
);

// All movies
export const selectAllMovies = createSelector(
  selectState,
  (state) => state.allMoviesList
);

// Movie by id
export const selectMovieById = createSelector(
  selectState,
  (state) => state.selectedMovie
);

// Favorite movies
export const selectFavoriteMovies = createSelector(
  selectState,
  (state) => state.favoriteMoviesList
);

// Watch Later movies
export const selectWatchLaterMovies = createSelector(
  selectState,
  (state) => state.watchLaterMoviesList
);
