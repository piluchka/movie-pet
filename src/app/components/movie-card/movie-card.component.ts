import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormatingTimePipe } from '../../pipes/formatingTime/formating-time.pipe';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MathRoundPipe } from '../../pipes/mathRound/math-round.pipe';
import { ReduceStringPipe } from '../../pipes/reduceString/reduce-string.pipe';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadFavoriteMovies, loadWatchLaterMovies } from '../../store/actions';
import {
  selectFavoriteMovies,
  selectWatchLaterMovies,
} from '../../store/selectors';

export class MyApplicationModule {}

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    FormatingTimePipe,
    CommonModule,
    CardModule,
    ButtonModule,
    MathRoundPipe,
    ReduceStringPipe,
    RouterLink,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit, OnDestroy {
  public STATIC_IMAGE_PATH = 'https://image.tmdb.org/t/p/w500/';

  @Input() movie: Movie | null = null;
  @Input() isShortDescriptionNeeded = true;

  public isInFavoriteList: boolean = false;
  public isInWatchList: boolean = false;
  private allSubscriptions: Subscription = new Subscription();

  private favoriteListSubscription: Subscription = new Subscription();
  private setFavoriteListSubscription: Subscription = new Subscription();
  private deleteFavoriteListSubscription: Subscription = new Subscription();
  private watchListSubscription: Subscription = new Subscription();
  private setwatchListSubscription: Subscription = new Subscription();
  private deletewatchListSubscription: Subscription = new Subscription();

  constructor(private movieService: MovieService, private store: Store) {}

  ngOnInit(): void {
    // if (this.movie) {
    this.favoriteListSubscription = this.store
      .select(selectFavoriteMovies)
      .subscribe((movies) => {
        this.allSubscriptions.add(this.favoriteListSubscription);
        if (movies) {
          if (movies.some((movie) => movie.id === this.movie!.id)) {
            this.isInFavoriteList = true;
          }
        }
      });

    this.watchListSubscription = this.store
      .select(selectWatchLaterMovies)
      .subscribe((movies) => {
        this.allSubscriptions.add(this.watchListSubscription);
        if (movies) {
          if (movies.some((movie) => movie.id === this.movie!.id)) {
            this.isInWatchList = true;
          }
        }
      });
    // }
  }

  // Funcs for favorites
  setToFavoriteMovieList() {
    if (this.movie) {
      this.isInFavoriteList = true;
      this.setFavoriteListSubscription = this.movieService
        .setMovieToFavoriteMovieList(this.movie.id)
        .subscribe(() =>
          this.allSubscriptions.add(this.setFavoriteListSubscription)
        );
    }
  }
  deleteMovieFromFavoriteMovieList() {
    if (this.movie) {
      this.isInFavoriteList = false;
      this.deleteFavoriteListSubscription = this.movieService
        .deleteMovieFromFavoriteMovieList(this.movie.id)
        .subscribe(() => {
          this.store.dispatch(loadFavoriteMovies());
          this.allSubscriptions.add(this.deleteFavoriteListSubscription);
        });
    }
  }

  // Func for watch later
  setToWatchLaterMovieList() {
    if (this.movie) {
      this.isInWatchList = true;
      this.setwatchListSubscription = this.movieService
        .setToWatchLaterMovieList(this.movie.id)
        .subscribe(() =>
          this.allSubscriptions.add(this.setwatchListSubscription)
        );
    }
  }
  deleteMovieWatchLaterMovieList() {
    if (this.movie) {
      this.isInWatchList = false;
      this.deletewatchListSubscription = this.movieService
        .deleteMovieWatchLaterMovieList(this.movie.id)
        .subscribe(() => {
          this.store.dispatch(loadWatchLaterMovies());
          this.allSubscriptions.add(this.deletewatchListSubscription);
        });
    }
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribe();
  }
}
