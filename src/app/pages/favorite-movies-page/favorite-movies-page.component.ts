import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { Store } from '@ngrx/store';
import { loadFavoriteMovies } from '../../store/movie-store/actions';
import { selectFavoriteMovies } from '../../store/movie-store/selectors';

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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadFavoriteMovies());

    this.subscription = this.store
      .select(selectFavoriteMovies)
      .subscribe((movies) => {
        if (movies) {
          this.favoriteMovieList = movies;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
