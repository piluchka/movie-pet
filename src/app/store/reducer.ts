// reducers.ts
import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import {
  loadAllMovies,
  loadAllMoviesFailure,
  loadAllMoviesSuccess,
  loadNowPlayingMoviesFailure,
  loadNowPlayingMoviesSuccess,
  loadPopularMoviesFailure,
  loadPopularMoviesSuccess,
  loadTopRatedMovies,
  loadTopRatedMoviesFailure,
  loadTopRatedMoviesSuccess,
  loadUpcomingMoviesFailure,
  loadUpcomingMoviesSuccess,
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
  })
);
