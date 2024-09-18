import { MovieDetails } from '../../models/movie-details.model';
import { Movie } from '../../models/movie.model';

export interface MovieState {
  allMoviesList: Movie[] | null;
  popularMoviesList: Movie[] | null;
  nowPlayingMoviesList: Movie[] | null;
  topRatedMoviesList: Movie[] | null;
  upcomingMoviesList: Movie[] | null;

  favoriteMoviesList: Movie[] | null;
  watchLaterMoviesList: Movie[] | null;

  selectedMovie: MovieDetails | null;

  searchingMovies: Movie[] | null;
}

export const initialState: MovieState = {
  allMoviesList: null,
  popularMoviesList: null,
  nowPlayingMoviesList: null,
  topRatedMoviesList: null,
  upcomingMoviesList: null,

  favoriteMoviesList: null,
  watchLaterMoviesList: null,

  selectedMovie: null,

  searchingMovies: null,
};
