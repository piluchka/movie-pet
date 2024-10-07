import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectNowPlayingMovies } from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';

@Component({
  selector: 'app-movie-now-playing-page',
  standalone: true,
  imports: [CommonModule, MovieHeaderComponent, MovieCardComponent],
  templateUrl: './movie-now-playing-page.component.html',
  styleUrl: './movie-now-playing-page.component.scss',
})
export class MovieNowPlayingPageComponent
  extends ClearObservable
  implements OnInit, OnDestroy
{
  public nowPlayingMovieList: Movie[] | null = null;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store
      .select(selectNowPlayingMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((nowPlayingMovieList) => {
        if (nowPlayingMovieList) {
          this.nowPlayingMovieList = nowPlayingMovieList;
        }
      });
  }
}
