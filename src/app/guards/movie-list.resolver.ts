import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadAllMovies, loadMovieGenres } from '../store/movie-store/actions';

@Injectable({
  providedIn: 'root',
})
export class MovieListResolver implements Resolve<boolean> {
  constructor(private store: Store) {}

  resolve(): boolean {
    this.store.dispatch(loadMovieGenres());
    this.store.dispatch(loadAllMovies());
    return true;
  }
}
