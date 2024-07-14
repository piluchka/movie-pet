import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list-page',
  standalone: true,
  templateUrl: './movie-list-page.component.html',
  styleUrl: './movie-list-page.component.scss',
  imports: [CommonModule, MovieCardComponent],
})
export class MovieListPageComponent implements OnInit, OnDestroy {
  public allMovieList: Movie[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.subscription = this.movieService
      .getAllMovies()
      .subscribe((movies: Movie[]) => {
        this.allMovieList = movies;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
