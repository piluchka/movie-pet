import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { ActivatedRoute, Route } from '@angular/router';
import { MathRoundPipe } from '../../pipes/mathRound/math-round.pipe';
import { FormatingTimePipe } from '../../pipes/formatingTime/formating-time.pipe';
import { Subscription } from 'rxjs';
import { MovieDetails } from '../../models/movie-details.model';
import { Store } from '@ngrx/store';
import { loadMovieById } from '../../store/movie-store/actions';
import { selectMovieById } from '../../store/movie-store/selectors';

// ! чек подписки
@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss',
  imports: [CommonModule, MovieCardComponent, MathRoundPipe, FormatingTimePipe],
})
export class MovieDetailsPageComponent implements OnInit, OnDestroy {
  private movieSubscribtion: Subscription = new Subscription();
  private routeSubscribtion: Subscription = new Subscription();
  movieData: MovieDetails | null = null;
  STATIC_IMAGE_PATH: string = 'https://image.tmdb.org/t/p/w500/';
  incomingMovieId: number = 0;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.routeSubscribtion = this.route.params.subscribe((data) => {
      this.incomingMovieId = Number(data['id']);
      this.store.dispatch(loadMovieById({ id: this.incomingMovieId }));
    });

    this.movieSubscribtion = this.store
      .select(selectMovieById)
      .subscribe((movie) => {
        if (movie) {
          this.movieData = movie;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.movieSubscribtion) {
      this.movieSubscribtion.unsubscribe();
    }
    if (this.routeSubscribtion) {
      this.routeSubscribtion.unsubscribe();
    }
  }
}
