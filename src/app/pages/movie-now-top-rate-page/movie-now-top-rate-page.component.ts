import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadTopRatedMovies } from '../../store/actions';
import { selectTopRatedMovies } from '../../store/selectors';

@Component({
  selector: 'app-movie-now-top-rate-page',
  standalone: true,
  imports: [CommonModule, MovieHeaderComponent, MovieCardComponent],
  templateUrl: './movie-now-top-rate-page.component.html',
  styleUrl: './movie-now-top-rate-page.component.scss',
})
export class MovieNowTopRatePageComponent implements OnInit, OnDestroy {
  public topRatedMovieList: Movie[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadTopRatedMovies());

    this.subscription = this.store
      .select(selectTopRatedMovies)
      .subscribe((topRatedMovieList) => {
        if (topRatedMovieList) {
          this.topRatedMovieList = topRatedMovieList;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
