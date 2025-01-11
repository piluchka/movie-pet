import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { takeUntil } from 'rxjs';
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
export class WatchLaterPageComponent extends ClearObservable implements OnInit {
  constructor(private store: Store) {
    super();
  }

  public watchLaterMovieList: Movie[] = [];

  ngOnInit(): void {
    this.store.dispatch(loadWatchLaterMovies());

    this.store
      .select(selectWatchLaterMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((movies: Movie[] | null) => {
        if (movies) {
          this.watchLaterMovieList = movies;
        }
      });
  }
}
