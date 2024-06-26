import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-favorite-movies-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './favorite-movies-page.component.html',
  styleUrl: './favorite-movies-page.component.scss',
})
export class FavoriteMoviesPageComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}
  favMovies: any[] = [];

  ngOnInit() {
    const movieData: any = JSON.parse(this.router.snapshot.queryParams['data']);
    if (movieData.length !== -1) {
      for (let i = 0; i < movieData.length; i++) {
        this.favMovies.push(movieData[i]);
      }
    }
  }

  handleAddFavorite(movie: any): any {
    const movieIndex = this.favMovies.findIndex((obj) => obj === movie);
    if (movieIndex !== -1) {
      this.favMovies.splice(movieIndex, 1);
    } else {
      this.favMovies.push(movie);
    }
  }
}
