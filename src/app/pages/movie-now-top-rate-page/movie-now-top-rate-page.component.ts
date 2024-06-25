import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { topRatedMovies } from '../../../assets/data/mock-data';

@Component({
  selector: 'app-movie-now-top-rate-page',
  standalone: true,
  imports: [CommonModule, MovieHeaderComponent, MovieCardComponent],
  templateUrl: './movie-now-top-rate-page.component.html',
  styleUrl: './movie-now-top-rate-page.component.scss',
})
export class MovieNowTopRatePageComponent {
  topRatedMovieList = topRatedMovies;

  favoriteList: any[] = [];
  watchLaterList: any[] = [];

  handleAddFavorite(movie: any): any {
    const movieIndex = this.favoriteList.findIndex((obj) => obj === movie);
    if (movieIndex !== -1) {
      this.favoriteList.splice(movieIndex, 1);
    } else {
      this.favoriteList.push(movie);
    }
  }
  handleWatchList(movie: any) {
    const movieIndex = this.watchLaterList.findIndex((obj) => obj === movie);
    if (movieIndex !== -1) {
      this.watchLaterList.splice(movieIndex, 1);
    } else {
      this.watchLaterList.push(movie);
    }
  }
}
