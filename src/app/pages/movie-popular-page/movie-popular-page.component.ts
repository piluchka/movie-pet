import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPopularMovies } from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';
import { LoadingCardComponent } from '../../components/loading-card/loading-card.component';

@Component({
  selector: 'app-movie-popular-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, LoadingCardComponent],
  templateUrl: './movie-popular-page.component.html',
  styleUrl: './movie-popular-page.component.scss',
})
export class MoviePopularPageComponent
  extends ClearObservable
  implements OnInit
{
  constructor(private store: Store) {
    super();
  }

  public popularMovieList: Movie[] | null = null;
  public loadingCardsAmount = Array(5);

  ngOnInit(): void {
    this.store
      .select(selectPopularMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((popularMoviesList) => {
        if (popularMoviesList && popularMoviesList?.length) {
          this.popularMovieList = popularMoviesList;
        }
      });
  }
}
