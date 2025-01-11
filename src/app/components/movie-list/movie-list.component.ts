import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { movies } from '../../../assets/data/movie.fake';
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  moviesList = movies;
  favoriteList: any[] = [];
  watchLaterList: any[] = [];

  handleAddFavorite(movie: any): any {
    const movieIndex = this.favoriteList.findIndex((obj) => obj === movie);
    if (movieIndex !== -1) {
      this.favoriteList.splice(movieIndex, 1);
      movie.addedToFav = false;
    } else {
      this.favoriteList.push(movie);
      movie.addedToFav = true;
    }
  }

  handleWatchList(movie: any) {
    const movieIndex = this.watchLaterList.findIndex((obj) => obj === movie);
    if (movieIndex !== -1) {
      this.watchLaterList.splice(movieIndex, 1);
      movie.addedToWatch = false;
    } else {
      this.watchLaterList.push(movie);
      movie.addedToWatch = true;
    }
  }
}
