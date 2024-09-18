import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule],
  templateUrl: './search-header.component.html',
  styleUrl: './search-header.component.scss',
})
export class SearchHeaderComponent {
  movieName: string = '';
  movies: any;

  constructor(private movieService: MovieService) {}

  onSubmit(form: any) {
    console.log(form);

    const searchValue = form.controls['search'].value;

    this.movieService
      .getMoviesBySearchValue(searchValue)
      .subscribe((value) => console.log(value));
  }
}
