// Interfaces for movie genres
export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieGenreList {
  genres: MovieGenre[];
}
