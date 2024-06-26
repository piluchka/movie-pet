import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { popularMovies } from '../../../assets/data/mock-data';
@Component({
  selector: 'app-movie-popular-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MovieHeaderComponent],
  templateUrl: './movie-popular-page.component.html',
  styleUrl: './movie-popular-page.component.scss',
})
export class MoviePopularPageComponent {
  popularMovieList = popularMovies;

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
