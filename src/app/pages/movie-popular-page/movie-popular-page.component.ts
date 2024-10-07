import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { Movie } from '../../models/movie.model';
import { Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPopularMovies } from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';
@Component({
  selector: 'app-movie-popular-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MovieHeaderComponent],
  templateUrl: './movie-popular-page.component.html',
  styleUrl: './movie-popular-page.component.scss',
})
export class MoviePopularPageComponent
  extends ClearObservable
  implements OnInit, OnDestroy
{
  public popularMovieList: Movie[] = [];

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store
      .select(selectPopularMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((popularMoviesList) => {
        if (popularMoviesList) {
          this.popularMovieList = popularMoviesList;
        }
      });
  }
}
