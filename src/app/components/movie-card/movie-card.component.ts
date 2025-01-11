import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  selectMovieGenres,
} from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';
import { selectAccountId } from '../../store/auth-store/selectors';
import { showAuthPopup } from '../../store/auth-store/actions';
import { MovieGenre } from '../../models/movie-genres.model';
import { PathsEnum } from '../../enums/path.enum';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
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
export class MovieCardComponent extends ClearObservable implements OnInit {
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private authStore: Store
  ) {
    super();
  }

  public imagePath: string = PathsEnum.STATIC_IMAGE_PATH;
  public routePath: string | undefined = undefined;

  public isInFavoriteList: boolean = false;
  public isInWatchList: boolean = false;

  public movieGenres: string[] = [];

  @Input() movie: Movie | null = null;
  @Input() isShortDescriptionNeeded: boolean = true;

  ngOnInit(): void {
    this.routePath = this.route.snapshot.routeConfig?.path;

    if (this.movie) {
      this.store
        .select(isInFavoriteList(this.movie))
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (isInFavoriteList: boolean) =>
            (this.isInFavoriteList = isInFavoriteList)
        );

      this.store
        .select(isInWatchLaterList(this.movie))
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (isInWatchLaterList: boolean) =>
            (this.isInWatchList = isInWatchLaterList)
        );

      this.store
        .select(selectMovieGenres)
        .pipe(takeUntil(this.destroy$))
        .subscribe((value: MovieGenre[] | null) => {
          this.setFilteredMovieGenres(value, this.movie?.genre_ids);
        });
    }
  }

  setFilteredMovieGenres(
    allGenres: MovieGenre[] | null,
    currentGenres: number[] | undefined
  ): void {
    if (allGenres && currentGenres) {
      this.movieGenres = allGenres
        .filter((genre: MovieGenre) => currentGenres.includes(genre.id))
        .map((genre: MovieGenre) => genre.name);
    }
  }

  // Funcs for favorites
  setToFavoriteMovieList(): void {
    this.authStore
      .select(selectAccountId)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((accountId: string | null) => {
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

  deleteMovieFromFavoriteMovieList(): void {
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
  setToWatchLaterMovieList(): void {
    this.authStore
      .select(selectAccountId)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((accountId: string | null) => {
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

  deleteMovieWatchLaterMovieList(): void {
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
