import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MovieService } from '../services/movie/movie.service';
import { Store } from '@ngrx/store';
import { loadPopularMovies } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class MovieResolver implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(): any {
    return true;
  }
}
