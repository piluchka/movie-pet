import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Movie, MovieList } from '../../models/movie.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  favoriteMovieList: any[] = [];
  watchLaterMovieList: any[] = [];

  constructor(private http: HttpClient) {}

  private getParams() {
    return { params: new HttpParams().set('api_key', environment.apiKey) };
  }

  getNowPlayingMovies(): Observable<Movie[]> {
    return this.http
      .get<MovieList>(
        `${environment.apiBaseUrl}/movie/now_playing`,
        this.getParams()
      )
      .pipe(map((moviesData) => moviesData.results));
  }

  getPopularMovies(): Observable<Movie[]> {
    return this.http
      .get<MovieList>(
        `${environment.apiBaseUrl}/movie/popular`,
        this.getParams()
      )
      .pipe(map((moviesData) => moviesData.results));
  }

  getTopRatedMovies(): Observable<Movie[]> {
    return this.http
      .get<MovieList>(
        `${environment.apiBaseUrl}/movie/top_rated`,
        this.getParams()
      )
      .pipe(map((moviesData) => moviesData.results));
  }

  getUpcomingMovies(): Observable<Movie[]> {
    return this.http
      .get<MovieList>(
        `${environment.apiBaseUrl}/movie/upcoming`,
        this.getParams()
      )
      .pipe(map((moviesData) => moviesData.results));
  }

  getAllMovies(): Observable<Movie[]> {
    return forkJoin({
      nowPlaying: this.getNowPlayingMovies(),
      popular: this.getPopularMovies(),
      topRated: this.getTopRatedMovies(),
      upcoming: this.getUpcomingMovies(),
    }).pipe(
      map((movies) => {
        return [
          ...movies.nowPlaying,
          ...movies.popular,
          ...movies.topRated,
          ...movies.upcoming,
        ];
      })
    );
  }

  // // Funcs for Favorite
  // setToFavoriteMovieList(movie: object) {
  //   const movieIndex = this.favoriteMovieList.indexOf(movie);

  //   if (movieIndex === -1) {
  //     this.favoriteMovieList.push(movie);
  //   }
  // }
  // getFavoriteMovieList() {
  //   return this.favoriteMovieList;
  // }
  // deleteMovieFromFavoriteMovieList(movie: object) {
  //   const deletingMovieIndex = this.favoriteMovieList.indexOf(movie);
  //   this.favoriteMovieList.splice(deletingMovieIndex, 1);
  // }

  // // Funcs for Watch later
  // setToWatchLaterMovieList(movie: object) {
  //   const movieIndex = this.watchLaterMovieList.indexOf(movie);

  //   if (movieIndex === -1) {
  //     this.watchLaterMovieList.push(movie);
  //   }
  // }
  // getWatchLaterMovieList() {
  //   return this.watchLaterMovieList;
  // }
  // deleteMovieWatchLaterMovieList(movie: object) {
  //   const deletingMovieIndex = this.watchLaterMovieList.indexOf(movie);
  //   this.watchLaterMovieList.splice(deletingMovieIndex, 1);
  // }

  // Func for details
  // getMovieById(id: number) {
  //   return this.getAllMoviesList().find((el) => el.id === id);
  // }
}
