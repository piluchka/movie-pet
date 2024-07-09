import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { upcomingMovies } from '../../../assets/data/mock-data';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie.model';
@Component({
  selector: 'app-movie-upcoming-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MovieHeaderComponent],
  templateUrl: './movie-upcoming-page.component.html',
  styleUrl: './movie-upcoming-page.component.scss',
})
export class MovieUpcomingPageComponent implements OnInit {
  upcomingMovieList: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getUpcomingMovies().subscribe({
      next: (movies: Movie[]) => {
        this.upcomingMovieList = movies;
      },
      error: (error) => console.error(error),
    });
  }
}
