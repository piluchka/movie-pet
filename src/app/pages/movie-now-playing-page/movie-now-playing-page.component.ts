import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { nowPlayingMovies } from '../../../assets/data/mock-data';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie/movie.service';
import { Movie, MovieList } from '../../models/movie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-now-playing-page',
  standalone: true,
  imports: [CommonModule, MovieHeaderComponent, MovieCardComponent],
  templateUrl: './movie-now-playing-page.component.html',
  styleUrl: './movie-now-playing-page.component.scss',
})
export class MovieNowPlayingPageComponent implements OnInit, OnDestroy {
  nowPlayingMovieList: Movie[] = [];
  subscription: Subscription = new Subscription();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.subscription = this.movieService
      .getNowPlayingMovies()
      .subscribe((movies: Movie[]) => {
        this.nowPlayingMovieList = movies;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
