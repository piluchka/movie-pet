// Interfaces for general movies
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieList {
  pages: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Interfaces for movie genres
export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieGenreList {
  genres: MovieGenre[];
}
