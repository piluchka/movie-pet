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

// Interface for movie details
export interface MovieDetails extends Movie {
  belongs_to_collection: null | object;
  budget: number;
  genres: MovieGenre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
}

// Interfaces for movie genres
export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieGenreList {
  genres: MovieGenre[];
}

// Interfaces for productions
export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// Interfaces for languages
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
