import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { topRatedMovies } from '../../../assets/data/mock-data';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-now-top-rate-page',
  standalone: true,
  imports: [CommonModule, MovieHeaderComponent, MovieCardComponent],
  templateUrl: './movie-now-top-rate-page.component.html',
  styleUrl: './movie-now-top-rate-page.component.scss',
})
export class MovieNowTopRatePageComponent implements OnInit, OnDestroy {
  topRatedMovieList: Movie[] = [];
  subscription: Subscription = new Subscription();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.subscription = this.movieService
      .getTopRatedMovies()
      .subscribe((movies: Movie[]) => {
        this.topRatedMovieList = movies;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
