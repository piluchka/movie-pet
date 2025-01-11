import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Store } from '@ngrx/store';
import { selectSearchingMovies } from '../../store/movie-store/selectors';
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clear-observable.directive';

@Component({
  selector: 'app-search-movie-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './search-movie-page.component.html',
  styleUrl: './search-movie-page.component.scss',
})
export class SearchMoviePageComponent
  extends ClearObservable
  implements OnInit
{
  constructor(private store: Store) {
    super();
  }

  public selectedMovies: Movie[] = [];

  ngOnInit(): void {
    this.store
      .select(selectSearchingMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((movies) => (this.selectedMovies = movies));
  }
}
