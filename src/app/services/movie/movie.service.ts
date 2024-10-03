import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Movie, MovieList } from '../../models/movie.model';
import { environment } from '../../../environments/environment';
import { MovieDetails } from '../../models/movie-details.model';
import { Store } from '@ngrx/store';
import { MovieGenre, MovieGenreList } from '../../models/movie-genres.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient, private authStore: Store) {}

  // Func for http-params
  // ! В будущем разобраться с этой функцией
  // ! Сделать ее компактнее и лучше
  private getParams(sessionId?: string, query?: string): object {
    let paramsObject: object = {};

    if (sessionId) {
      paramsObject = {
        params: new HttpParams()
          .set('api_key', environment.apiKey)
          .set('session_id', sessionId),
      };
    } else if (query) {
      paramsObject = {
        params: new HttpParams()
          .set('api_key', environment.apiKey)
          .set('query', query),
      };
    } else {
      paramsObject = {
        params: new HttpParams().set('api_key', environment.apiKey),
      };
    }
    return paramsObject;
  }

  // Func for Fav and Watch Bodies
  private getBodyForPost(
    type: 'favorite' | 'watchlist',
    movieId: number,
    isInList: boolean
  ): object {
    return {
      media_type: 'movie',
      media_id: movieId,
      [type]: isInList,
    };
  }

  // Funcs for movies-getters
  public getNowPlayingMovies(): Observable<Movie[]> {
    return this.http
      .get<MovieList>(
        `${environment.apiBaseUrl}/movie/now_playing`,
        this.getParams()
      )
      .pipe(map((moviesData) => moviesData.results));
  }

  public getPopularMovies(): Observable<Movie[]> {
    return this.http
      .get<MovieList>(
        `${environment.apiBaseUrl}/movie/popular`,
        this.getParams()
      )
      .pipe(map((moviesData) => moviesData.results));
  }

  public getTopRatedMovies(): Observable<Movie[]> {
    return this.http
      .get<MovieList>(
        `${environment.apiBaseUrl}/movie/top_rated`,
        this.getParams()
      )
      .pipe(map((moviesData) => moviesData.results));
  }

  public getUpcomingMovies(): Observable<Movie[]> {
    return this.http
      .get<MovieList>(
        `${environment.apiBaseUrl}/movie/upcoming`,
        this.getParams()
      )
      .pipe(map((moviesData) => moviesData.results));
  }

  public getAllMovies(): Observable<Movie[]> {
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
  getMovieFavoriteList(
    accountId: string,
    sessionId: string
  ): Observable<Movie[]> {
    return this.http
      .get<MovieList>(
        `${environment.apiBaseUrl}/account/${accountId}/favorite/movies`,
        this.getParams(sessionId)
      )
      .pipe(map((movieList) => movieList.results));
  }

  setMovieToFavoriteMovieList(
    accountId: string,
    sessionId: string,
    movieId: number
  ): Observable<Movie> {
    return this.http.post<Movie>(
      `${environment.apiBaseUrl}/account/${accountId}/favorite`,
      this.getBodyForPost('favorite', movieId, true),
      this.getParams(sessionId)
    );
  }

  deleteMovieFromFavoriteMovieList(
    accountId: string,
    sessionId: string,
    movieId: number
  ): Observable<Movie> {
    return this.http.post<Movie>(
      `${environment.apiBaseUrl}/account/${accountId}/favorite`,
      this.getBodyForPost('favorite', movieId, false),
      this.getParams(sessionId)
    );
  }

  // Funcs for Watch later
  setToWatchLaterMovieList(
    accountId: string,
    sessionId: string,
    movieId: number
  ): Observable<Movie> {
    return this.http.post<Movie>(
      `${environment.apiBaseUrl}/account/${accountId}/watchlist`,
      this.getBodyForPost('watchlist', movieId, true),
      this.getParams(sessionId)
    );
  }

  getWatchLaterMovieList(
    accountId: string,
    sessionId: string
  ): Observable<Movie[]> {
    return this.http
      .get<MovieList>(
        `${environment.apiBaseUrl}/account/${accountId}/watchlist/movies`,
        this.getParams(sessionId)
      )
      .pipe(map((movieList) => movieList.results));
  }

  deleteMovieWatchLaterMovieList(
    accountId: string,
    sessionId: string,
    movieId: number
  ): Observable<Movie> {
    return this.http.post<Movie>(
      `${environment.apiBaseUrl}/account/${accountId}/watchlist`,
      this.getBodyForPost('watchlist', movieId, false),
      this.getParams(sessionId)
    );
  }

  // Func to get movie by id for details page
  getMovieById(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${environment.apiBaseUrl}/movie/${id}`,
      this.getParams()
    );
  }

  // Func for searching movies
  getMoviesBySearchValue(value: string): Observable<Movie[]> {
    return this.http
      .get<MovieList>(
        `${environment.apiBaseUrl}/search/movie`,
        this.getParams(undefined, value)
      )
      .pipe(map((movies) => movies.results));
  }

  // Func to get movie genres
  getMovieGenres(): Observable<MovieGenre[]> {
    return this.http
      .get<MovieGenreList>(
        `${environment.apiBaseUrl}/genre/movie`,
        this.getParams()
      )
      .pipe(map((data) => data.genres));
  }
}
