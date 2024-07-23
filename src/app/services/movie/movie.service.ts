import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, forkJoin, map, Observable } from 'rxjs';
import { Movie, MovieList } from '../../models/movie.model';
import { environment } from '../../../environments/environment';
import { MovieDetails } from '../../models/movie-details.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private accountId: number | null = null;
  private sessionId: string = '';

  // Private Vars for Subjects
  private favoriteMoviesSubject$: BehaviorSubject<Movie[]> =
    new BehaviorSubject<Movie[]>([]);
  private watchLaterMoviesSubject$: BehaviorSubject<Movie[]> =
    new BehaviorSubject<Movie[]>([]);

  // Public Vars for Subjects
  public favoriteMoviesObservable$: Observable<Movie[]> =
    this.favoriteMoviesSubject$;
  public watchLaterMoviesObservable$: Observable<Movie[]> =
    this.watchLaterMoviesSubject$;

  // Private vars for arrays
  private watchLaterMovieList: Movie[] = [];

  constructor(private http: HttpClient) {}

  // Funcs for assinging to var the auth ids
  public setSessionId(id: string) {
    this.sessionId = id;
  }
  public setAccountId(id: number) {
    this.accountId = id;
  }
  // Func for http-params(api-key)
  private getParams(): object {
    return {
      params: new HttpParams()
        .set('api_key', environment.apiKey)
        .set('session_id', this.sessionId),
    };
  }

  // Func for http-headers(access token)
  private getHeaders(): object {
    return {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${environment.accessToken}`
      ),
    };
  }

  private getBodyForFavoritePost(movieId: number, isInList: boolean): object {
    return {
      media_type: 'movie',
      media_id: movieId,
      favorite: isInList,
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
  setMovieToFavoriteMovieList(movieId: number): Observable<Movie> {
    return this.http.post<Movie>(
      `${environment.apiBaseUrl}/account/${this.accountId}/favorite`,
      this.getBodyForFavoritePost(movieId, true),
      this.getParams()
    );
  }

  getMovieFavoriteList(): Observable<MovieList> {
    return this.http.get<MovieList>(
      `${environment.apiBaseUrl}/account/${this.accountId}/favorite/movies`,
      this.getHeaders()
    );
  }

  deleteMovieFromFavoriteMovieList(movieId: number): Observable<Movie> {
    return this.http.post<Movie>(
      `${environment.apiBaseUrl}/account/${this.accountId}/favorite`,
      this.getBodyForFavoritePost(movieId, false),
      this.getParams()
    );
  }

  // Funcs for Watch later
  setToWatchLaterMovieList(movie: Movie): void {
    if (!this.watchLaterMovieList.includes(movie)) {
      this.watchLaterMovieList.push(movie);
      this.watchLaterMoviesSubject$.next(this.watchLaterMovieList);
    }
  }

  deleteMovieWatchLaterMovieList(movie: Movie): void {
    const deletingMovieIndex = this.watchLaterMovieList.indexOf(movie);
    if (deletingMovieIndex !== -1) {
      this.watchLaterMovieList.splice(deletingMovieIndex, 1);
      this.watchLaterMoviesSubject$.next(this.watchLaterMovieList);
    }
  }

  // Func for get movie by id for details page
  getMovieById(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${environment.apiBaseUrl}/movie/${id}`,
      this.getParams()
    );
  }
}
