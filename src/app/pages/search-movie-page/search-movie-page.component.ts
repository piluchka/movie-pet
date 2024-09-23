import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Store } from '@ngrx/store';
import { selectSearchingMovies } from '../../store/movie-store/selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-movie-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './search-movie-page.component.html',
  styleUrl: './search-movie-page.component.scss',
})
export class SearchMoviePageComponent implements OnInit, OnDestroy {
  selectedMovies: Movie[] | null = null;
  subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectSearchingMovies)
      .subscribe((movies) => (this.selectedMovies = movies));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
