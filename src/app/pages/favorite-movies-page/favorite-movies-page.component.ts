import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { Store } from '@ngrx/store';
import { loadFavoriteMovies } from '../../store/movie-store/actions';
import { selectFavoriteMovies } from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';

@Component({
  selector: 'app-favorite-movies-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './favorite-movies-page.component.html',
  styleUrl: './favorite-movies-page.component.scss',
})
export class FavoriteMoviesPageComponent
  extends ClearObservable
  implements OnInit
{
  constructor(private store: Store) {
    super();
  }

  public favoriteMovieList: Movie[] = [];

  ngOnInit(): void {
    this.store.dispatch(loadFavoriteMovies());

    this.store
      .select(selectFavoriteMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((movies: Movie[] | null) => {
        if (movies) {
          this.favoriteMovieList = movies;
        }
      });
  }
}
