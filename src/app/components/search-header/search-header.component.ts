import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MovieService } from '../../services/movie/movie.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { Router } from '@angular/router';

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
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  onSubmit(form: any) {
    console.log(form);
  }

  input(event: any) {
    const searchValue = event.query;

    this.movieService.getMoviesBySearchValue(searchValue).subscribe((value) => {
      console.log(value);
      this.movies = value;
    });
  }
  onSelect(event: any) {
    this.router.navigate(['/movie', event.value.id]);
  }
}
