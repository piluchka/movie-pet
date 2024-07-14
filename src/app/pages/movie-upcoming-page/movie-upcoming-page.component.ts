import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-movie-upcoming-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MovieHeaderComponent],
  templateUrl: './movie-upcoming-page.component.html',
  styleUrl: './movie-upcoming-page.component.scss',
})
export class MovieUpcomingPageComponent implements OnInit, OnDestroy {
  public upcomingMovieList: Movie[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.subscription = this.movieService
      .getUpcomingMovies()
      .subscribe((movies: Movie[]) => {
        this.upcomingMovieList = movies;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
