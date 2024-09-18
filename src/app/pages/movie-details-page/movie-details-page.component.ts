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

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss',
  imports: [CommonModule, MovieCardComponent, MathRoundPipe, FormatingTimePipe],
})
export class MovieDetailsPageComponent implements OnInit, OnDestroy {
  public movieData: MovieDetails | null = null;
  public STATIC_IMAGE_PATH: string = 'https://image.tmdb.org/t/p/w500/';
  private subscribtion: Subscription = new Subscription();

  constructor(private router: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const incomingMovieId = Number(this.router.snapshot.params['id']);
    this.store.dispatch(loadMovieById({ id: incomingMovieId }));

    this.subscribtion = this.store
      .select(selectMovieById)
      .subscribe((movie) => {
        if (movie) {
          this.movieData = movie;
          console.log(this.movieData);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }
}
