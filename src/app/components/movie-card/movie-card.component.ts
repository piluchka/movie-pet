import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormatingTimePipe } from '../../pipes/formatingTime/formating-time.pipe';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MathRoundPipe } from '../../pipes/mathRound/math-round.pipe';
import { ReduceStringPipe } from '../../pipes/reduceString/reduce-string.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { of, switchMap, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  deleteMovieFromFavoriteMovies,
  deleteMovieFromWatchLaterMovies,
  setMovieToFavoriteMovies,
  setMovieToWatchLaterMovies,
} from '../../store/movie-store/actions';
import {
  isInFavoriteList,
  isInWatchLaterList,
} from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';
import { selectAccountId } from '../../store/auth-store/selectors';
import { showAuthPopup } from '../../store/auth-store/actions';

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
export class MovieCardComponent
  extends ClearObservable
  implements OnInit, OnDestroy
{
  public STATIC_IMAGE_PATH: string = 'https://image.tmdb.org/t/p/w500/';
  public routePath: string | undefined = undefined;

  public isInFavoriteList: boolean = false;
  public isInWatchList: boolean = false;

  @Input() movie: Movie | null = null;
  @Input() isShortDescriptionNeeded: boolean = true;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private authStore: Store
  ) {
    super();
  }

  ngOnInit(): void {
    this.routePath = this.route.snapshot.routeConfig?.path;

    if (this.movie) {
      this.store
        .select(isInFavoriteList(this.movie))
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (isInFavoriteList) => (this.isInFavoriteList = isInFavoriteList)
        );

      this.store
        .select(isInWatchLaterList(this.movie))
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (isInWatchLaterList) => (this.isInWatchList = isInWatchLaterList)
        );
    }
  }

  // Funcs for favorites
  setToFavoriteMovieList() {
    this.authStore
      .select(selectAccountId)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((accountId) => {
          if (accountId) {
            if (this.movie) {
              this.isInFavoriteList = true;
              this.store.dispatch(
                setMovieToFavoriteMovies({ id: this.movie.id })
              );
            }
            return of(true);
          } else {
            this.authStore.dispatch(showAuthPopup());
            return of(false);
          }
        })
      )
      .subscribe();
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
    this.authStore
      .select(selectAccountId)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((accountId) => {
          if (accountId) {
            if (this.movie) {
              this.isInWatchList = true;
              this.store.dispatch(
                setMovieToWatchLaterMovies({ id: this.movie.id })
              );
            }
            return of(true);
          } else {
            this.authStore.dispatch(showAuthPopup());
            return of(false);
          }
        })
      )
      .subscribe();
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
}
