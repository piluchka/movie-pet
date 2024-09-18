import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  loadAllMovies,
  loadNowPlayingMovies,
  loadPopularMovies,
  loadTopRatedMovies,
  loadUpcomingMovies,
} from '../store/movie-store/actions';
import { forkJoin, map, Observable, take } from 'rxjs';
import {
  selectNowPlayingMovies,
  selectPopularMovies,
  selectTopRatedMovies,
  selectUpcomingMovies,
} from '../store/movie-store/selectors';

@Injectable({
  providedIn: 'root',
})
export class MovieListResolver implements Resolve<boolean> {
  constructor(private store: Store) {}

  resolve(): any {
    return true;
  }
}
