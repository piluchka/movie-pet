import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadSearchingMovies } from '../../store/movie-store/actions';
import { selectSearchingMovies } from '../../store/movie-store/selectors';
import { skip, Subscription, take } from 'rxjs';
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
  isThereAValueInSearch: boolean = true;

  constructor(private store: Store, private router: Router) {}

  onSubmit(form: any) {
    const searchValue = form.form.value['search'];

    if (searchValue.length < 1) {
      this.isThereAValueInSearch = false;
      setTimeout(() => (this.isThereAValueInSearch = true), 2100);
    } else {
      this.isThereAValueInSearch = true;
      this.selectedItem = '';
      this.store.dispatch(loadSearchingMovies({ searchValue: searchValue }));
      this.router.navigate(['search']);
    }
  }

  onInput(event: any) {
    const searchValue = event.query;
    this.store.dispatch(loadSearchingMovies({ searchValue: searchValue }));
    this.store
      .select(selectSearchingMovies)
      .pipe(skip(1), take(1))
      .subscribe((movies) => {
        this.movies = movies;
      });
  }
  onSelect(event: any) {
    this.selectedItem = '';
    this.router.navigate(['/movie', event.value.id]);
  }
}
