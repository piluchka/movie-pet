import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAllMovies } from '../../store/actions';
import { selectAllMovies } from '../../store/selectors';

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
