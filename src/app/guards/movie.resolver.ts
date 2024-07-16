import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { MovieService } from '../services/movie/movie.service';
import { MovieList } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieResolver implements Resolve<any> {
  constructor(private http: HttpClient, private movieService: MovieService) {}

  resolve(): any {
    return this.movieService
      .getMovieFavoriteList()
      .subscribe((movies) => movies);
  }
}
