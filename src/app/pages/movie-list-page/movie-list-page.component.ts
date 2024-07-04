import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { MovieService } from '../../services/movie/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list-page',
  standalone: true,
  templateUrl: './movie-list-page.component.html',
  styleUrl: './movie-list-page.component.scss',
  imports: [CommonModule, MovieCardComponent],
})
export class MovieListPageComponent implements OnInit {
  allMovieList: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.allMovieList = this.movieService.getAllMoviesList();
  }
}
