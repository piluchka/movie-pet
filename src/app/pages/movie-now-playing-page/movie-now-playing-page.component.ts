import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { nowPlayingMovies } from '../../../assets/data/mock-data';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie/movie.service';
import { Movie, MovieList } from '../../models/movie.model';

@Component({
  selector: 'app-movie-now-playing-page',
  standalone: true,
  imports: [CommonModule, MovieHeaderComponent, MovieCardComponent],
  templateUrl: './movie-now-playing-page.component.html',
  styleUrl: './movie-now-playing-page.component.scss',
})
export class MovieNowPlayingPageComponent implements OnInit {
  nowPlayingMovieList: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getNowPlayingMovies().subscribe({
      next: (movies: Movie[]) => {
        this.nowPlayingMovieList = movies;
      },
      error: (error) => console.error(error),
    });
  }
}
