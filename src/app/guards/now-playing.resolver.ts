import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadNowPlayingMovies } from '../store/actions';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NowPlayingMoviesResolver implements Resolve<boolean> {
  constructor(private store: Store) {}

  resolve(): boolean {
    this.store.dispatch(loadNowPlayingMovies());
    return true;
  }
}
