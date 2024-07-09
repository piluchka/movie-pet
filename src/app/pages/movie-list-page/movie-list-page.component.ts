import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie, MovieList } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list-page',
  standalone: true,
  templateUrl: './movie-list-page.component.html',
  styleUrl: './movie-list-page.component.scss',
  imports: [CommonModule, MovieCardComponent],
})
export class MovieListPageComponent implements OnInit {
  allMovieList: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe({
      next: (movies: Movie[]) => {
        this.allMovieList = movies;
      },
      error: (error) => console.error(error),
    });
  }
}
