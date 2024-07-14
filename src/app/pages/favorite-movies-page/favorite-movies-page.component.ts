import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie/movie.service';
import { Subscription } from 'rxjs';
import { Movie, MovieList } from '../../models/movie.model';

@Component({
  selector: 'app-favorite-movies-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './favorite-movies-page.component.html',
  styleUrl: './favorite-movies-page.component.scss',
})
export class FavoriteMoviesPageComponent implements OnInit, OnDestroy {
  public favoriteMovieList: Movie[] = [];
  sometthing: any;
  private subscription: Subscription = new Subscription();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.subscription = this.movieService
      .getMovieFavoriteList()
      .subscribe((movies: any) => {
        this.sometthing = movies;
        console.log(this.sometthing);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
