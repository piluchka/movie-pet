import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTopRatedMovies } from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';
import { LoadingCardComponent } from '../../components/loading-card/loading-card.component';

@Component({
  selector: 'app-movie-now-top-rate-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, LoadingCardComponent],
  templateUrl: './movie-now-top-rate-page.component.html',
  styleUrl: './movie-now-top-rate-page.component.scss',
})
export class MovieNowTopRatePageComponent
  extends ClearObservable
  implements OnInit, OnDestroy
{
  constructor(private store: Store) {
    super();
  }

  public topRatedMovieList: Movie[] = [];
  public loadingCardsAmount = Array(5);

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
