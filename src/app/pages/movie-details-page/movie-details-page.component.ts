import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { ActivatedRoute, Route } from '@angular/router';
import { MovieService } from '../../services/movie/movie.service';
import { MathRoundPipe } from '../../pipes/mathRound/math-round.pipe';

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss',
  imports: [CommonModule, MovieCardComponent, MathRoundPipe],
})
export class MovieDetailsPageComponent implements OnInit {
  public movieData: any;
  public STATIC_IMAGE_PATH = 'https://image.tmdb.org/t/p/w500/';

  constructor(
    private router: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const incomingMovieId = Number(this.router.snapshot.params['id']);
    this.movieData = this.movieService.getMovieById(incomingMovieId);
  }
}
