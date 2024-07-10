import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { popularMovies } from '../../../assets/data/mock-data';
import { MovieService } from '../../services/movie/movie.service';
import { Movie, MovieList } from '../../models/movie.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-movie-popular-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MovieHeaderComponent],
  templateUrl: './movie-popular-page.component.html',
  styleUrl: './movie-popular-page.component.scss',
})
export class MoviePopularPageComponent implements OnInit, OnDestroy {
  popularMovieList: any[] = [];
  subscription: Subscription = new Subscription();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.subscription = this.movieService
      .getPopularMovies()
      .subscribe((movies: Movie[]) => {
        this.popularMovieList = movies;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
