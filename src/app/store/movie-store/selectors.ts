import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MovieState } from './state';
import { Movie } from '../../models/movie.model';

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

export const isInFavoriteList = (movie: Movie) =>
  createSelector(selectState, (state) => {
    let result = false;
    if (state.favoriteMoviesList) {
      result = state.favoriteMoviesList.some(
        (favoriteMovie) => favoriteMovie.id === movie.id
      );
    }
    return result;
  });

// Watch Later movies
export const selectWatchLaterMovies = createSelector(
  selectState,
  (state) => state.watchLaterMoviesList
);

export const isInWatchLaterList = (movie: Movie) =>
  createSelector(selectState, (state) => {
    let result = false;
    if (state.watchLaterMoviesList) {
      result = state.watchLaterMoviesList.some(
        (watchLaterMovie) => watchLaterMovie.id === movie.id
      );
    }
    return result;
  });
