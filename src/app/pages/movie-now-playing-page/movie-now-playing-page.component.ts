import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectNowPlayingMovies } from '../../store/selectors';
import { loadNowPlayingMovies } from '../../store/actions';

@Component({
  selector: 'app-movie-now-playing-page',
  standalone: true,
  imports: [CommonModule, MovieHeaderComponent, MovieCardComponent],
  templateUrl: './movie-now-playing-page.component.html',
  styleUrl: './movie-now-playing-page.component.scss',
})
export class MovieNowPlayingPageComponent implements OnInit, OnDestroy {
  public nowPlayingMovieList: Movie[] | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectNowPlayingMovies)
      .subscribe((nowPlayingMovieList) => {
        if (nowPlayingMovieList) {
          this.nowPlayingMovieList = nowPlayingMovieList;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
