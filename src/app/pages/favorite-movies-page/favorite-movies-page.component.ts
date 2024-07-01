import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-favorite-movies-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './favorite-movies-page.component.html',
  styleUrl: './favorite-movies-page.component.scss',
})
export class FavoriteMoviesPageComponent implements OnInit {
  favoriteMovieList: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.favoriteMovieList = this.movieService.getFavoriteMovieList();
  }
}
