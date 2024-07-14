import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { ActivatedRoute, Route } from '@angular/router';
import { MovieService } from '../../services/movie/movie.service';
import { MathRoundPipe } from '../../pipes/mathRound/math-round.pipe';
import { Subscription } from 'rxjs';
import { MovieDetails } from '../../models/movie-details.model';

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss',
  imports: [CommonModule, MovieCardComponent, MathRoundPipe],
})
export class MovieDetailsPageComponent implements OnInit, OnDestroy {
  public movieData: MovieDetails | null = null;
  public STATIC_IMAGE_PATH: string = 'https://image.tmdb.org/t/p/w500/';
  private subscribtion: Subscription = new Subscription();

  constructor(
    private router: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const incomingMovieId = Number(this.router.snapshot.params['id']);
    this.subscribtion = this.movieService
      .getMovieById(incomingMovieId)
      .subscribe((movie: any) => {
        this.movieData = movie;
      });
  }

  ngOnDestroy(): void {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }
}
