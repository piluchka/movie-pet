import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MathRoundPipe } from '../../pipes/mathRound/math-round.pipe';
import { FormatingTimePipe } from '../../pipes/formatingTime/formating-time.pipe';
import { skip, takeUntil } from 'rxjs';
import { MovieDetails } from '../../models/movie-details.model';
import { Store } from '@ngrx/store';
import { loadMovieById } from '../../store/movie-store/actions';
import { selectMovieById } from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';
import { ReduceReleaseDatePipe } from '../../pipes/reduceReleaseDate/reduce-release-date.pipe';
import { PathsEnum } from '../../enums/path.enum';

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss',
  imports: [
    ReduceReleaseDatePipe,
    CommonModule,
    MathRoundPipe,
    FormatingTimePipe,
  ],
})
export class MovieDetailsPageComponent
  extends ClearObservable
  implements OnInit
{
  constructor(private route: ActivatedRoute, private store: Store) {
    super();
  }

  movieData: MovieDetails | null = null;
  imagePath: string = PathsEnum.STATIC_IMAGE_PATH;
  incomingMovieId: number = 0;

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Params) => {
        this.incomingMovieId = Number(data['id']);
        this.store.dispatch(loadMovieById({ id: this.incomingMovieId }));
      });

    this.store
      .select(selectMovieById)
      .pipe(skip(1), takeUntil(this.destroy$))
      .subscribe((movie: MovieDetails | null) => {
        if (movie) {
          this.movieData = movie;
        }
      });
  }
}
