import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  movies = [
    {
      title: 'Drive',
      rating: 9.0,
      genre: 'Drama',
      year: 2011,
      overview:
        "A mysterious Hollywood action film stuntman gets in trouble with gangsters when he tries to help his neighbor's husband rob a pawn shop while serving as his getaway driver.",
      director: 'Nicolas Winding Refn',
      minDuration: 100,
      posterImgPath: 'assets/img/movie_1.webp',
    },
    {
      title: 'The Neon Demon',
      rating: 6.1,
      genre: 'Horror, Thriller',
      year: 2016,
      overview:
        'An aspiring model, Jesse, is new to Los Angeles. However, her beauty and youth, which generate intense fascination and jealousy within the fashion industry, may prove themselves sinister.',
      director: 'Nicolas Winding Refn',
      minDuration: 117,
      posterImgPath: 'assets/img/movie_2.webp',
    },
    {
      title: 'The Dark Knight',
      rating: 9.0,
      genre: 'Action, Crime, Drama',
      year: 2008,
      overview:
        'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      director: 'Christopher Nolan',
      minDuration: 152,
      posterImgPath: 'assets/img/movie_3.webp',
    },
  ];

  handleAddFavorite(title: string) {
    const favoriteDiv = document.querySelector('.favorite-movies');
    const movieTitle = document.createElement('p');
    movieTitle.innerText = title;

    favoriteDiv?.append(movieTitle);
  }
  handleWatchList(title: string) {
    const watchListDiv = document.querySelector('.watch-movies');
    const movieTitle = document.createElement('p');
    movieTitle.innerText = title;

    watchListDiv?.append(movieTitle);
  }
}
