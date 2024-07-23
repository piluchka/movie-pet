import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie/movie.service';
import { Subscription } from 'rxjs';
import { Movie, MovieList } from '../../models/movie.model';
import { Store } from '@ngrx/store';
import { loadFavoriteMovies } from '../../store/actions';
import { selectFavoriteMovies } from '../../store/selectors';

@Component({
  selector: 'app-favorite-movies-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './favorite-movies-page.component.html',
  styleUrl: './favorite-movies-page.component.scss',
})
export class FavoriteMoviesPageComponent implements OnInit, OnDestroy {
  public favoriteMovieList: Movie[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private movieService: MovieService, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadFavoriteMovies());

    this.subscription = this.store
      .select(selectFavoriteMovies)
      .subscribe((movies) => {
        if (movies) {
          this.favoriteMovieList = movies;
        }
      });
    // this.subscription = this.movieService
    //   .getMovieFavoriteList()
    //   .subscribe((movies: Movie[]) => {
    //     this.favoriteMovieList = movies;
    //   });
  }

  onMovieListUpdated(updatedList: any[]) {
    this.favoriteMovieList = updatedList;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
