import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { Movie } from '../../models/movie.model';
import { Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUpcomingMovies } from '../../store/movie-store/actions';
import { selectUpcomingMovies } from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';
import { LoadingCardComponent } from '../../components/loading-card/loading-card.component';
@Component({
  selector: 'app-movie-upcoming-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, LoadingCardComponent],
  templateUrl: './movie-upcoming-page.component.html',
  styleUrl: './movie-upcoming-page.component.scss',
})
export class MovieUpcomingPageComponent
  extends ClearObservable
  implements OnInit, OnDestroy
{
  constructor(private store: Store) {
    super();
  }

  public upcomingMovieList: Movie[] | null = null;
  public loadingCardsAmount = Array(5);

  ngOnInit(): void {
    this.store
      .select(selectUpcomingMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((upcomingMovieList) => {
        if (upcomingMovieList) {
          this.upcomingMovieList = upcomingMovieList;
        }
      });
  }
}
