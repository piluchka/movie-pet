import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { takeUntil } from 'rxjs';
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
  implements OnInit
{
  constructor(private store: Store) {
    super();
  }

  public topRatedMovieList: Movie[] | null = null;
  public loadingCardsAmount = Array(5);

  ngOnInit(): void {
    this.store
      .select(selectTopRatedMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((topRatedMovieList: Movie[] | null) => {
        if (topRatedMovieList && topRatedMovieList?.length > 0) {
          this.topRatedMovieList = topRatedMovieList;
        }
      });
  }
}
