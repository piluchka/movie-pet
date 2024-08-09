import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Movie, MovieList } from '../../models/movie.model';
import { environment } from '../../../environments/environment';
import { MovieDetails } from '../../models/movie-details.model';
import { Store } from '@ngrx/store';
import { selectAccountId } from '../../store/auth-store/selectors';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private acc = this.authStore
    .select(selectAccountId)
    .subscribe((accountId) => (this.accountId = accountId));
  private accountId: string | null = null;
  private sessionId: string = '';

  constructor(private http: HttpClient, private authStore: Store) {}

  // Funcs for assinging to var the auth ids
  public setSessionId(id: string) {
    this.sessionId = id;
  }
  public setAccountId() {
    console.log(this.accountId);
  }
  // Func for http-params(api-key)
  private getParams(): object {
    return {
      params: new HttpParams()
        .set('api_key', environment.apiKey)
        .set('session_id', this.sessionId),
    };
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
  getMovieFavoriteList(): Observable<Movie[]> {
    return this.http
      .get<MovieList>(
        `${environment.apiBaseUrl}/account/${this.accountId}/favorite/movies`,
        this.getParams()
      )
      .pipe(map((movieList) => movieList.results));
  }

  setMovieToFavoriteMovieList(movieId: number): Observable<Movie> {
    return this.http.post<Movie>(
      `${environment.apiBaseUrl}/account/${this.accountId}/favorite`,
      this.getBodyForPost('favorite', movieId, true),
      this.getParams()
    );
  }

  deleteMovieFromFavoriteMovieList(movieId: number): Observable<Movie> {
    return this.http.post<Movie>(
      `${environment.apiBaseUrl}/account/${this.accountId}/favorite`,
      this.getBodyForPost('favorite', movieId, false),
      this.getParams()
    );
  }

  // Funcs for Watch later
  setToWatchLaterMovieList(movieId: number): Observable<Movie> {
    return this.http.post<Movie>(
      `${environment.apiBaseUrl}/account/${this.accountId}/watchlist`,
      this.getBodyForPost('watchlist', movieId, true),
      this.getParams()
    );
  }

  getWatchLaterMovieList(): Observable<Movie[]> {
    return this.http
      .get<MovieList>(
        `${environment.apiBaseUrl}/account/${this.accountId}/watchlist/movies`,
        this.getParams()
      )
      .pipe(map((movieList) => movieList.results));
  }

  deleteMovieWatchLaterMovieList(movieId: number): Observable<Movie> {
    return this.http.post<Movie>(
      `${environment.apiBaseUrl}/account/${this.accountId}/watchlist`,
      this.getBodyForPost('watchlist', movieId, false),
      this.getParams()
    );
  }

  // Func for get movie by id for details page
  getMovieById(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${environment.apiBaseUrl}/movie/${id}`,
      this.getParams()
    );
  }
}
