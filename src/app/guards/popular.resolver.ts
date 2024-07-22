import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadPopularMovies } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class PopularMovieResolver implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(): boolean {
    this.store.dispatch(loadPopularMovies());
    return true;
  }
}
