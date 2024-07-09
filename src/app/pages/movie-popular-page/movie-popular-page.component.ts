import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { popularMovies } from '../../../assets/data/mock-data';
import { MovieService } from '../../services/movie/movie.service';
import { Movie, MovieList } from '../../models/movie.model';
@Component({
  selector: 'app-movie-popular-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MovieHeaderComponent],
  templateUrl: './movie-popular-page.component.html',
  styleUrl: './movie-popular-page.component.scss',
})
export class MoviePopularPageComponent implements OnInit {
  popularMovieList: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe({
      next: (movies: Movie[]) => {
        this.popularMovieList = movies;
      },
      error: (error) => console.error(error),
    });
  }
}
