import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormatingTimePipe } from '../../pipes/formatingTime/formating-time.pipe';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MathRoundPipe } from '../../pipes/mathRound/math-round.pipe';
import { ReduceStringPipe } from '../../pipes/reduceString/reduce-string.pipe';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie.model';

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
export class MovieCardComponent {
  public STATIC_IMAGE_PATH = 'https://image.tmdb.org/t/p/w500/';

  @Input() movie: Movie | null = null;
  @Input() isShortDescriptionNeeded = true;
  @Input() isInFav: boolean | null = null;

  @Output() movieListUpdated = new EventEmitter<any[]>();

  constructor(private movieService: MovieService) {}

  // Funcs for favorites
  setToFavoriteMovieList() {
    if (this.movie) {
      this.isInFav = true;
      this.movieService
        .setMovieToFavoriteMovieList(this.movie.id)
        .subscribe((res) => console.log(res));
    }
  }
  deleteMovieFromFavoriteMovieList() {
    if (this.movie) {
      this.isInFav = false;
      this.movieService
        .deleteMovieFromFavoriteMovieList(this.movie.id)
        .subscribe(() =>
          this.movieService.getMovieFavoriteList().subscribe((movies) => {
            this.movieListUpdated.emit(movies.results);
          })
        );
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
}
