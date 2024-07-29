import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { Movie } from '../../models/movie.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPopularMovies } from '../../store/selectors';
@Component({
  selector: 'app-movie-popular-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MovieHeaderComponent],
  templateUrl: './movie-popular-page.component.html',
  styleUrl: './movie-popular-page.component.scss',
})
export class MoviePopularPageComponent implements OnInit, OnDestroy {
  public popularMovieList: Movie[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectPopularMovies)
      .subscribe((popularMoviesList) => {
        if (popularMoviesList) {
          this.popularMovieList = popularMoviesList;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
