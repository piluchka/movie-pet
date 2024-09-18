import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-search-movie-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './search-movie-page.component.html',
  styleUrl: './search-movie-page.component.scss'
})
export class SearchMoviePageComponent {
  searchingMovies: Movie[] = []
}
