import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { ActivatedRoute, Route } from '@angular/router';
import { MathRoundPipe } from '../../pipes/mathRound/math-round.pipe';
import { FormatingTimePipe } from '../../pipes/formatingTime/formating-time.pipe';
import { skip, Subscription, takeUntil } from 'rxjs';
import { MovieDetails } from '../../models/movie-details.model';
import { Store } from '@ngrx/store';
import { loadMovieById } from '../../store/movie-store/actions';
import { selectMovieById } from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss',
  imports: [CommonModule, MovieCardComponent, MathRoundPipe, FormatingTimePipe],
})
export class MovieDetailsPageComponent
  extends ClearObservable
  implements OnInit, OnDestroy
{
  movieData: MovieDetails | null = null;
  STATIC_IMAGE_PATH: string = 'https://image.tmdb.org/t/p/w500/';
  incomingMovieId: number = 0;

  constructor(private route: ActivatedRoute, private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.incomingMovieId = Number(data['id']);
      this.store.dispatch(loadMovieById({ id: this.incomingMovieId }));
    });

    this.store
      .select(selectMovieById)
      .pipe(skip(1), takeUntil(this.destroy$))
      .subscribe((movie) => {
        if (movie) {
          this.movieData = movie;
        }
      });
  }
}
