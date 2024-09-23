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
  ],
  templateUrl: './search-header.component.html',
  styleUrl: './search-header.component.scss',
})
export class SearchHeaderComponent {
  movieName: string = '';
  selectedItem: string = '';
  movies: Movie[] | null = [];

  constructor(private store: Store, private router: Router) {}

  onSubmit(form: any) {
    console.log(form);
  }

  input(event: any) {
    const searchValue = event.query;
    this.store.dispatch(loadSearchingMovies({ searchValue: searchValue }));
    this.store.select(selectSearchingMovies).subscribe((movies) => {
      this.movies = movies;
    });
  }
  onSelect(event: any) {
    this.selectedItem = '';
    this.router.navigate(['/movie', event.value.id]);
  }
}
