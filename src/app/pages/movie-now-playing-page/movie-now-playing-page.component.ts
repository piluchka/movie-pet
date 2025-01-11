import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectNowPlayingMovies } from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';
import { LoadingCardComponent } from '../../components/loading-card/loading-card.component';

@Component({
  selector: 'app-movie-now-playing-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, LoadingCardComponent],
  templateUrl: './movie-now-playing-page.component.html',
  styleUrl: './movie-now-playing-page.component.scss',
})
export class MovieNowPlayingPageComponent
  extends ClearObservable
  implements OnInit
{
  constructor(private store: Store) {
    super();
  }

  public nowPlayingMovieList: Movie[] | null = null;
  public loadingCardsAmount = Array(5);

  ngOnInit(): void {
    this.store
      .select(selectNowPlayingMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((nowPlayingMovieList) => {
        if (nowPlayingMovieList && nowPlayingMovieList?.length > 0) {
          this.nowPlayingMovieList = nowPlayingMovieList;
        }
      });
  }
}
