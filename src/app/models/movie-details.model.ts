import { MovieGenre } from './movie-genres.model';
import { Movie } from './movie.model';

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

// Additional Interfaces for productions
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

// Additional Interfaces for languages
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
