import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadSearchingMovies } from '../../store/movie-store/actions';
import { selectSearchingMovies } from '../../store/movie-store/selectors';
import { Subscription, take } from 'rxjs';
import { ReduceReleaseDatePipe } from '../../pipes/reduceReleaseDate/reduce-release-date.pipe';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    AutoCompleteModule,
    RouterLink,
    RouterLinkActive,
    ReduceReleaseDatePipe,
  ],
  templateUrl: './search-header.component.html',
  styleUrl: './search-header.component.scss',
})
export class SearchHeaderComponent {
  movieName: string = '';
  selectedItem: string = '';
  movies: Movie[] = [];
  subscription: Subscription = new Subscription();

  constructor(private store: Store, private router: Router) {}

  onSubmit(form: any) {
    const searchValue = form.form.value['search'];
    this.selectedItem = '';
    this.store.dispatch(loadSearchingMovies({ searchValue: searchValue }));
    this.router.navigate(['search']);
  }

  input(event: any) {
    const searchValue = event.query;
    this.store.dispatch(loadSearchingMovies({ searchValue: searchValue }));
    this.store
      .select(selectSearchingMovies)
      .pipe(take(1))
      .subscribe((movies) => {
        this.movies = movies;
      });
  }
  onSelect(event: any) {
    this.selectedItem = '';
    this.router.navigate(['/movie', event.value.id]);
  }
}
