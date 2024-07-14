import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-watch-later-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './watch-later-page.component.html',
  styleUrl: './watch-later-page.component.scss',
})
export class WatchLaterPageComponent implements OnInit, OnDestroy {
  public watchLaterMovieList: Movie[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.subscription = this.movieService.watchLaterMoviesObservable$.subscribe(
      (movies: Movie[]) => {
        this.watchLaterMovieList = movies;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
