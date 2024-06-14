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
  favoriteList: string[] = [];
  watchLaterList: string[] = [];

  handleAddFavorite(title: string) {
    if (!this.favoriteList.includes(title)) {
      this.favoriteList.push(title);
    } else {
      const removableMovieIndex = this.favoriteList.indexOf(title);
      this.favoriteList.splice(removableMovieIndex, 1);
    }
  }
  handleWatchList(title: string) {
    if (!this.watchLaterList.includes(title)) {
      this.watchLaterList.push(title);
    } else {
      const removableMovieIndex = this.watchLaterList.indexOf(title);
      this.watchLaterList.splice(removableMovieIndex, 1);
    }
  }

}
