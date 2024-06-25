import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { nowPlayingMovies } from '../../../assets/data/mock-data';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-movie-now-playing-page',
  standalone: true,
  imports: [CommonModule, MovieHeaderComponent, MovieCardComponent],
  templateUrl: './movie-now-playing-page.component.html',
  styleUrl: './movie-now-playing-page.component.scss',
})
export class MovieNowPlayingPageComponent {
  nowPlayingMovieList = nowPlayingMovies;

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
