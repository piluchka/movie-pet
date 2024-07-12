import { Component, Input } from '@angular/core';
import { FormatingTimePipe } from '../../pipes/formatingTime/formating-time.pipe';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MathRoundPipe } from '../../pipes/mathRound/math-round.pipe';
import { ReduceStringPipe } from '../../pipes/reduceString/reduce-string.pipe';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie/movie.service';

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
  public isInFavoriteList: boolean | null = false;

  @Input() movie: any;
  @Input() isShortDescriptionNeeded = true;

  constructor(private movieService: MovieService) {}

  // Funcs for favorites
  setToFavoriteMovieList() {
    this.movie.addedToFavoriteList = true;
    this.movieService.setMovieToFavoriteMovieList(this.movie);
  }
  deleteMovieFromFavoriteMovieList() {
    this.movie.addedToFavoriteList = false;
    this.movieService.deleteMovieFromFavoriteMovieList(this.movie);
  }

  // Func for watch later
  setToWatchLaterMovieList() {
    this.movie.addedToWatchLaterList = true;
    this.movieService.setToWatchLaterMovieList(this.movie);
  }
  deleteMovieWatchLaterMovieList() {
    this.movie.addedToWatchLaterList = false;
    this.movieService.deleteMovieWatchLaterMovieList(this.movie);
  }
}
