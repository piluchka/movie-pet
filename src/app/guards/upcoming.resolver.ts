import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadPopularMovies, loadUpcomingMovies } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class UpcomingMoviesResolver implements Resolve<boolean> {
  constructor(private store: Store) {}

  resolve(): boolean {
    this.store.dispatch(loadUpcomingMovies());
    return true;
  }
}
