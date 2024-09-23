// reducers.ts
import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import {
  deleteMovieFromFavoriteMoviesFailure,
  loadAllMoviesFailure,
  loadAllMoviesSuccess,
  loadFavoriteMoviesFailure,
  loadFavoriteMoviesSuccess,
  loadMovieByIdFailure,
  loadMovieByIdSuccess,
  loadNowPlayingMoviesFailure,
  loadNowPlayingMoviesSuccess,
  loadPopularMoviesFailure,
  loadPopularMoviesSuccess,
  loadSearchingMoviesFailure,
  loadSearchingMoviesSuccess,
  loadTopRatedMoviesFailure,
  loadTopRatedMoviesSuccess,
  loadUpcomingMoviesFailure,
  loadUpcomingMoviesSuccess,
  loadWatchLaterMoviesFailure,
  loadWatchLaterMoviesSuccess,
  setMovieToFavoriteMoviesFailure,
  setMovieToWatchLaterMoviesFailure,
} from './actions';

export const MovieReducer = createReducer(
  initialState,

  // Listening to Popular movies actions
  // Success
  on(loadPopularMoviesSuccess, (state, { popularMoviesList }) => {
    return {
      ...state,
      popularMoviesList: popularMoviesList,
    };
  }),

  // Failure
  on(loadPopularMoviesFailure, (state, { error }) => {
    return {
      ...state,
      popularMoviesList: null,
      error: error,
    };
  }),

  // Listening to Now Playing movies actions
  // Success
  on(loadNowPlayingMoviesSuccess, (state, { nowPlayingMoviesList }) => {
    return {
      ...state,
      nowPlayingMoviesList: nowPlayingMoviesList,
    };
  }),

  // Failure
  on(loadNowPlayingMoviesFailure, (state, { error }) => {
    return {
      ...state,
      nowPlayingMoviesList: null,
      error: error,
    };
  }),

  // Listening to Top Rated movies actions
  // Success
  on(loadTopRatedMoviesSuccess, (state, { topRatedMoviesList }) => {
    return {
      ...state,
      topRatedMoviesList: topRatedMoviesList,
    };
  }),

  // Failure
  on(loadTopRatedMoviesFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  // Listening to Upcoming movies actions
  // Success
  on(loadUpcomingMoviesSuccess, (state, { upcomingMoviesList }) => {
    return {
      ...state,
      upcomingMoviesList: upcomingMoviesList,
    };
  }),

  // Failure
  on(loadUpcomingMoviesFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  // Listening to All movies actions
  // Success
  on(loadAllMoviesSuccess, (state, { allMoviesList }) => {
    return {
      ...state,
      allMoviesList: allMoviesList,
    };
  }),

  // Failure
  on(loadAllMoviesFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  // Listening to Movie By Id actions
  // Success
  on(loadMovieByIdSuccess, (state, { selectedMovie }) => {
    return {
      ...state,
      selectedMovie: selectedMovie,
    };
  }),

  // Failure
  on(loadMovieByIdFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  // Listening to Favorite movies actions
  // Success
  on(loadFavoriteMoviesSuccess, (state, { favoriteMoviesList }) => {
    return {
      ...state,
      favoriteMoviesList: favoriteMoviesList,
    };
  }),

  // Failure
  on(loadFavoriteMoviesFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  // Set - Failure
  on(setMovieToFavoriteMoviesFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  // Delete - Failure
  on(deleteMovieFromFavoriteMoviesFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  // Listening to Watch Later movies actions
  // Success
  on(loadWatchLaterMoviesSuccess, (state, { watchLaterMoviesList }) => {
    return {
      ...state,
      watchLaterMoviesList: watchLaterMoviesList,
    };
  }),

  // Failure
  on(loadWatchLaterMoviesFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  // Set - Failure
  on(setMovieToWatchLaterMoviesFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  // Listening to Search movies actions
  // Success
  on(loadSearchingMoviesSuccess, (state, { searchingMovies }) => {
    return {
      ...state,
      searchingMovies: searchingMovies,
    };
  }),

  //Failure
  on(loadSearchingMoviesFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  })
);
