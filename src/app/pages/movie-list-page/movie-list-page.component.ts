import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAllMovies,
  selectNowPlayingMovies,
  selectPopularMovies,
  selectTopRatedMovies,
  selectUpcomingMovies,
} from '../../store/movie-store/selectors';
import { loadAllMovies } from '../../store/movie-store/actions';

@Component({
  selector: 'app-movie-list-page',
  standalone: true,
  templateUrl: './movie-list-page.component.html',
  styleUrl: './movie-list-page.component.scss',
  imports: [CommonModule, MovieCardComponent],
})
export class MovieListPageComponent implements OnInit, OnDestroy {
  public allMovieList: Movie[] | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectAllMovies)
      .subscribe((allMovieList) => {
        if (allMovieList) {
          this.allMovieList = allMovieList;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
