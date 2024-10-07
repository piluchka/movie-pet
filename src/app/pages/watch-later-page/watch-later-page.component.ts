import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadWatchLaterMovies } from '../../store/movie-store/actions';
import { selectWatchLaterMovies } from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';

@Component({
  selector: 'app-watch-later-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './watch-later-page.component.html',
  styleUrl: './watch-later-page.component.scss',
})
export class WatchLaterPageComponent
  extends ClearObservable
  implements OnInit, OnDestroy
{
  public watchLaterMovieList: Movie[] = [];

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(loadWatchLaterMovies());

    this.store
      .select(selectWatchLaterMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((movies) => {
        if (movies) {
          this.watchLaterMovieList = movies;
        }
      });
  }
}
