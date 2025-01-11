import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllMovies } from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';
import { LoadingCardComponent } from '../../components/loading-card/loading-card.component';

@Component({
  selector: 'app-movie-list-page',
  standalone: true,
  templateUrl: './movie-list-page.component.html',
  styleUrl: './movie-list-page.component.scss',
  imports: [CommonModule, MovieCardComponent, LoadingCardComponent],
})
export class MovieListPageComponent
  extends ClearObservable
  implements OnInit, OnDestroy
{
  constructor(private store: Store) {
    super();
  }

  public allMovieList: Movie[] | null = null;
  public loadingCardsAmount = Array(5);

  ngOnInit(): void {
    this.store
      .select(selectAllMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((allMovieList) => {
        if (allMovieList) {
          this.allMovieList = allMovieList;
        }
      });
  }
}
