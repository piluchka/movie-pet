import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTopRatedMovies } from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';

@Component({
  selector: 'app-movie-now-top-rate-page',
  standalone: true,
  imports: [CommonModule, MovieHeaderComponent, MovieCardComponent],
  templateUrl: './movie-now-top-rate-page.component.html',
  styleUrl: './movie-now-top-rate-page.component.scss',
})
export class MovieNowTopRatePageComponent
  extends ClearObservable
  implements OnInit, OnDestroy
{
  public topRatedMovieList: Movie[] = [];

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store
      .select(selectTopRatedMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((topRatedMovieList) => {
        if (topRatedMovieList) {
          this.topRatedMovieList = topRatedMovieList;
        }
      });
  }
}
