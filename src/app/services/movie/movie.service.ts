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

  // Private Vars for Subjects
  private favoriteMoviesSubject$: BehaviorSubject<Movie[]> =
    new BehaviorSubject<Movie[]>([]);
  private watchLaterMoviesSubject$: BehaviorSubject<Movie[]> =
    new BehaviorSubject<Movie[]>([]);

  // Public Vars for Observables
  public watchLaterMoviesObservable$: Observable<Movie[]> =
    this.watchLaterMoviesSubject$;
  public favoriteMoviesObservable$: Observable<Movie[]> =
    this.favoriteMoviesSubject$;

  // Private vars for arrays
  favoriteMovieList: Movie[] = [];
  watchLaterMovieList: Movie[] = [];
  allMoviesList: Movie[] = [];

  constructor(private http: HttpClient) {}

  // Func for http-params(api-key)
  private getParams() {
    return { params: new HttpParams().set('api_key', environment.apiKey) };
  }

  // Func for assinging to var the accound id
  public setAccountId(id: number) {
    this.accountId = id;
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
  setMovieToFavoriteMovieList(movie: Movie) {
    if (!this.favoriteMovieList.includes(movie)) {
      this.favoriteMovieList.push(movie);
      this.favoriteMoviesSubject$.next(this.favoriteMovieList);
    }
    // const body = {
    //   media_type: 'movie',
    //   media_id: id,
    //   favorite: true,
    // };
  }
  // return this.http.post(
  //   `${environment.apiBaseUrl}/account/${this.accountId}/favorite`,
  //   JSON.stringify(body),
  //   this.getParams()
  // );

  // ! ЗАКОНЧИЛА ТУТ
  // getMovieFavoriteList(): any {
  //   return this.http.get(
  //     `${environment.apiBaseUrl}/account/${this.accountId}/favorite/movies`,
  //     this.getParams()
  //   );
  // }

  deleteMovieFromFavoriteMovieList(movie: Movie): void {
    const deletingMovieIndex = this.favoriteMovieList.indexOf(movie);
    if (deletingMovieIndex !== -1) {
      this.favoriteMovieList.splice(deletingMovieIndex, 1);
      this.favoriteMoviesSubject$.next(this.favoriteMovieList);
    }
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
