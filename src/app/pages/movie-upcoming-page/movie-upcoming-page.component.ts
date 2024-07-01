import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { upcomingMovies } from '../../../assets/data/mock-data';
import { MovieService } from '../../services/movie/movie.service';
@Component({
  selector: 'app-movie-upcoming-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MovieHeaderComponent],
  templateUrl: './movie-upcoming-page.component.html',
  styleUrl: './movie-upcoming-page.component.scss',
})
export class MovieUpcomingPageComponent implements OnInit {
  upcomingMovieList: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.upcomingMovieList = this.movieService.getUpcomingMovies();
  }
}
