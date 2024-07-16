import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MovieService } from '../movie/movie.service';
import { Movie, MovieList } from '../../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteMovies: Movie[] = [];
  private watchLaterMovies: number[] = [];
  private favoriteMoviesSubject$: BehaviorSubject<Movie[]> =
    new BehaviorSubject<Movie[]>([]);
  private watchLaterMoviesSubject$: BehaviorSubject<number[]> =
    new BehaviorSubject<number[]>([]);

  constructor(private movieService: MovieService) {
    this.initializeService();
  }

  private initializeService(): void {
    this.movieService.getMovieFavoriteList().subscribe((movies: MovieList) => {
      this.favoriteMovies = movies.results;
      const savedWatchLater = localStorage.getItem('watchLaterMovies');

      if (this.favoriteMovies) {
        // const savedFavorites = localStorage.getItem('favoriteMovies');
        this.updateFavoritesOrWatchLater('favorite');
      }
    });

    // if (savedWatchLater) {
    //   this.watchLaterMovies = JSON.parse(savedWatchLater);
    //   this.watchLaterMoviesSubject$.next(this.watchLaterMovies);
    // }
  }

  addToFavoriteOrWatchLaterList(movie: Movie, list: string): void {
    if (list === 'favorite' && !this.favoriteMovies.includes(movie)) {
      this.favoriteMovies.push(movie);
      this.updateFavoritesOrWatchLater('favorite');
    }
    // if (list === 'watch' && !this.watchLaterMovies.includes(movieId)) {
    //   this.watchLaterMovies.push(movieId);
    //   this.updateFavoritesOrWatchLater('watch');
    // }
  }

  removeFromFavoritesOrWatchLater(movie: Movie, list: string): void {
    if (list === 'favorite') {
      const index = this.favoriteMovies.indexOf(movie);

      if (index !== -1) {
        this.favoriteMovies.splice(index, 1);
        this.updateFavoritesOrWatchLater('favorite');
      }
    }
    // if (list === 'watch') {
    //   const index = this.watchLaterMovies.indexOf(movieId);
    //   if (index !== -1) {
    //     this.watchLaterMovies.push(movieId);
    //     this.updateFavoritesOrWatchLater('watch');
    //   }
    // }
  }

  isInFavorite(movie: Movie): boolean {
    return this.favoriteMovies.includes(movie);
  }

  isInWatchLater(movieId: number): boolean {
    return this.watchLaterMovies.includes(movieId);
  }

  private updateFavoritesOrWatchLater(list: string): void {
    if (list === 'favorite') {
      this.movieService
        .getMovieFavoriteList()
        .subscribe((movies: MovieList) => {
          this.favoriteMovies = movies.results;
          localStorage.setItem(
            'favoriteMovies',
            JSON.stringify(this.favoriteMovies)
          );
        });

      console.log(localStorage);
    }
    // if (list === 'watch') {
    //   localStorage.setItem(
    //     'watchLaterMovies',
    //     JSON.stringify(this.watchLaterMovies)
    //   );
    //   this.watchLaterMoviesSubject$.next(this.favoriteMovies);
    // }
  }
}
