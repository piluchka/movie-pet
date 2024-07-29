import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { loadTopRatedMovies } from '../store/actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class TopRatedMoviesResolver implements Resolve<boolean> {
  constructor(private store: Store) {}

  resolve(): boolean {
    this.store.dispatch(loadTopRatedMovies());
    return true;
  }
}
