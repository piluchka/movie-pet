import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadPopularMovies } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class PopularMoviesResolver implements Resolve<boolean> {
  constructor(private store: Store) {}

  resolve(): boolean {
    this.store.dispatch(loadPopularMovies());
    return true;
  }
}
