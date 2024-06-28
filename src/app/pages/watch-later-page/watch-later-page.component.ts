import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-watch-later-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './watch-later-page.component.html',
  styleUrl: './watch-later-page.component.scss',
})
export class WatchLaterPageComponent implements OnInit {
  watchLaterMovieList: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.watchLaterMovieList = this.movieService.getWatchLaterMovieList();
  }
}
