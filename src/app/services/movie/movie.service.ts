import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject,
  forkJoin,
  map,
  Observable,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { Movie, MovieList } from '../../models/movie.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // Vars for arrays
  favoriteMovieList: Movie[] = [];
  watchLaterMovieList: Movie[] = [];

  // Vars for Subjects
  favoriteMoviesSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<
    Movie[]
  >([]);
  watchLaterMoviesSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<
    Movie[]
  >([]);

  constructor(private http: HttpClient) {}

  private getParams() {
    return { params: new HttpParams().set('api_key', environment.apiKey) };
  }

  // Funcs for movies-getters
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

  // Funcs for Favorite
  setMovieToFavoriteMovieList(movie: Movie): void {
    if (!this.favoriteMovieList.includes(movie)) {
      this.favoriteMovieList.push(movie);
      this.favoriteMoviesSubject.next(this.favoriteMovieList);
    }
  }

  deleteMovieFromFavoriteMovieList(movie: Movie): void {
    const deletingMovieIndex = this.favoriteMovieList.indexOf(movie);
    if (deletingMovieIndex !== -1) {
      this.favoriteMovieList.splice(deletingMovieIndex, 1);

      this.favoriteMoviesSubject.next(this.favoriteMovieList);
    }
  }

  // Funcs for Watch later
  setToWatchLaterMovieList(movie: Movie): void {
    if (!this.watchLaterMovieList.includes(movie)) {
      this.watchLaterMovieList.push(movie);
      this.watchLaterMoviesSubject.next(this.watchLaterMovieList);
    }
  }

  deleteMovieWatchLaterMovieList(movie: Movie): void {
    const deletingMovieIndex = this.watchLaterMovieList.indexOf(movie);
    if (deletingMovieIndex !== -1) {
      this.watchLaterMovieList.splice(deletingMovieIndex, 1);
      this.watchLaterMoviesSubject.next(this.watchLaterMovieList);
    }
  }

  // Func for details
  // getMovieById(id: number) {
  //   return this.getAllMoviesList().find((el) => el.id === id);
  // }
}
