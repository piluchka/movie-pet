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
import { loadFavoriteMovies } from '../../store/actions';
import { selectFavoriteMovies } from '../../store/selectors';

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

  public isInFav: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private movieService: MovieService, private store: Store) {}

  ngOnInit(): void {
    if (this.movie) {
      this.subscription = this.store
        .select(selectFavoriteMovies)
        .subscribe((movies) => {
          if (movies) {
            if (movies.some((movie) => movie.id === this.movie!.id)) {
              this.isInFav = true;
            }
          }
        });
    }
  }

  // Funcs for favorites
  setToFavoriteMovieList() {
    if (this.movie) {
      this.isInFav = true;
      this.movieService.setMovieToFavoriteMovieList(this.movie.id).subscribe();
    }
  }
  deleteMovieFromFavoriteMovieList() {
    if (this.movie) {
      this.isInFav = false;
      this.movieService
        .deleteMovieFromFavoriteMovieList(this.movie.id)
        .subscribe(() => this.store.dispatch(loadFavoriteMovies()));
    }
  }

  // Func for watch later
  setToWatchLaterMovieList() {
    if (this.movie) {
      this.movie.addedToWatchLaterList = true;
      this.movieService.setToWatchLaterMovieList(this.movie);
    }
  }
  deleteMovieWatchLaterMovieList() {
    if (this.movie) {
      this.movie.addedToWatchLaterList = false;
      this.movieService.deleteMovieWatchLaterMovieList(this.movie);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
