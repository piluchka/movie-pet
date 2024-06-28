import { Injectable } from '@angular/core';
import {
  nowPlayingMovies,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
} from '../../../assets/data/mock-data';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  favoriteMovieList: object[] = [];
  watchLaterMovieList: object[] = [];
  allMovieList: any[] = [
    ...this.getNowPlayingMovies(),
    ...this.getPopularMovies(),
    ...this.getTopRatedMovies(),
    ...this.getUpcomingMovies(),
  ];

  constructor() {}

  getNowPlayingMovies() {
    return nowPlayingMovies;
  }

  getPopularMovies() {
    return popularMovies;
  }

  getTopRatedMovies() {
    return topRatedMovies;
  }

  getUpcomingMovies() {
    return upcomingMovies;
  }

  // Funcs for Favorite
  setToFavoriteMovieList(movie: object) {
    const movieIndex = this.favoriteMovieList.indexOf(movie);

    if (movieIndex === -1) {
      this.favoriteMovieList.push(movie);
    }
    console.log('FAV', this.favoriteMovieList);
  }
  getFavoriteMovieList() {
    return this.favoriteMovieList;
  }
  deleteMovieFromFavoriteMovieList(movie: object) {
    const deletingMovieIndex = this.favoriteMovieList.indexOf(movie);
    this.favoriteMovieList.splice(deletingMovieIndex, 1);
  }

  // Funcs for Watch later
  setToWatchLaterMovieList(movie: object) {
    const movieIndex = this.watchLaterMovieList.indexOf(movie);

    if (movieIndex === -1) {
      this.watchLaterMovieList.push(movie);
    }
    console.log('WATCH', this.watchLaterMovieList);
  }
  getWatchLaterMovieList() {
    return this.watchLaterMovieList;
  }
  deleteMovieWatchLaterMovieList(movie: object) {
    const deletingMovieIndex = this.watchLaterMovieList.indexOf(movie);
    this.watchLaterMovieList.splice(deletingMovieIndex, 1);
  }

  // Func for details
  getMovieById(id: number) {
    return this.allMovieList.find((el) => el.id === id);
  }
}
