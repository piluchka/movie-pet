import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAllMovies,
  selectMovieGenres,
} from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';

@Component({
  selector: 'app-movie-list-page',
  standalone: true,
  templateUrl: './movie-list-page.component.html',
  styleUrl: './movie-list-page.component.scss',
  imports: [CommonModule, MovieCardComponent],
})
export class MovieListPageComponent
  extends ClearObservable
  implements OnInit, OnDestroy
{
  public allMovieList: Movie[] | null = null;

  constructor(private store: Store) {
    super();
  }

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
