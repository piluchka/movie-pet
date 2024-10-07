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
@Component({
  selector: 'app-movie-upcoming-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MovieHeaderComponent],
  templateUrl: './movie-upcoming-page.component.html',
  styleUrl: './movie-upcoming-page.component.scss',
})
export class MovieUpcomingPageComponent
  extends ClearObservable
  implements OnInit, OnDestroy
{
  public upcomingMovieList: Movie[] = [];

  constructor(private store: Store) {
    super();
  }

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
