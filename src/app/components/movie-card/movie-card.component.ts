import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormatingTimePipe } from '../../pipes/formatingTime/formating-time.pipe';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MathRoundPipe } from '../../pipes/mathRound/math-round.pipe';
import { ReduceStringPipe } from '../../pipes/reduceString/reduce-string.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie.model';
import { Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  deleteMovieFromFavoriteMovies,
  deleteMovieFromWatchLaterMovies,
  loadFavoriteMovies,
  loadWatchLaterMovies,
  setMovieToFavoriteMovies,
  setMovieToWatchLaterMovies,
} from '../../store/actions';
import {
  isInFavoriteList,
  isInWatchLaterList,
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
  public STATIC_IMAGE_PATH: string = 'https://image.tmdb.org/t/p/w500/';
  public routePath: string | undefined = undefined;

  @Input() movie: Movie | null = null;
  @Input() isShortDescriptionNeeded: boolean = true;

  public isInFavoriteList: boolean = false;
  public isInWatchList: boolean = false;
  private allSubscriptions: Subscription = new Subscription();

  private favoriteListSubscription: Subscription = new Subscription();
  private setFavoriteListSubscription: Subscription = new Subscription();
  private deleteFavoriteListSubscription: Subscription = new Subscription();
  private watchListSubscription: Subscription = new Subscription();
  private setwatchListSubscription: Subscription = new Subscription();
  private deletewatchListSubscription: Subscription = new Subscription();

  constructor(
    private movieService: MovieService,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routePath = this.route.snapshot.routeConfig?.path;

    if (this.movie) {
      this.favoriteListSubscription = this.store
        .select(isInFavoriteList(this.movie))
        .subscribe(
          (isInFavoriteList) => (this.isInFavoriteList = isInFavoriteList)
        );

      this.watchListSubscription = this.store
        .select(isInWatchLaterList(this.movie))
        .subscribe(
          (isInWatchLaterList) => (this.isInWatchList = isInWatchLaterList)
        );
    }
  }

  // Funcs for favorites
  setToFavoriteMovieList() {
    if (this.movie) {
      this.isInFavoriteList = true;
      this.store.dispatch(setMovieToFavoriteMovies({ id: this.movie.id }));
    }
  }
  deleteMovieFromFavoriteMovieList() {
    if (this.movie) {
      this.isInFavoriteList = false;
      this.store.dispatch(
        deleteMovieFromFavoriteMovies({
          id: this.movie.id,
          path: this.routePath,
        })
      );
    }
  }

  // Func for watch later
  setToWatchLaterMovieList() {
    if (this.movie) {
      this.isInWatchList = true;
      this.store.dispatch(setMovieToWatchLaterMovies({ id: this.movie.id }));
    }
  }
  deleteMovieWatchLaterMovieList() {
    if (this.movie) {
      this.isInWatchList = false;
      this.store.dispatch(
        deleteMovieFromWatchLaterMovies({
          id: this.movie.id,
          path: this.routePath,
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribe();
  }
}
