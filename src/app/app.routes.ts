import { Routes } from '@angular/router';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { MovieListPageComponent } from './pages/movie-list-page/movie-list-page.component';
import { MovieNowPlayingPageComponent } from './pages/movie-now-playing-page/movie-now-playing-page.component';
import { MovieNowTopRatePageComponent } from './pages/movie-now-top-rate-page/movie-now-top-rate-page.component';
import { MoviePopularPageComponent } from './pages/movie-popular-page/movie-popular-page.component';
import { MovieUpcomingPageComponent } from './pages/movie-upcoming-page/movie-upcoming-page.component';
import { FavoriteMoviesPageComponent } from './pages/favorite-movies-page/favorite-movies-page.component';
import { WatchLaterPageComponent } from './pages/watch-later-page/watch-later-page.component';
import { PopularMoviesResolver } from './guards/popular.resolver';
import { MovieListResolver } from './guards/movie-list.resolver';
import { NowPlayingMoviesResolver } from './guards/now-playing.resolver';
import { TopRatedMoviesResolver } from './guards/top-rated.resolver';
import { UpcomingMoviesResolver } from './guards/upcoming.resolver';

export const routes: Routes = [
  {
    path: '',
    component: MovieListPageComponent,
    resolve: {
      movieData: MovieListResolver,
    },
  },
  {
    path: 'now-playing',
    component: MovieNowPlayingPageComponent,
    resolve: {
      movieData: NowPlayingMoviesResolver,
    },
  },
  {
    path: 'top-rated',
    component: MovieNowTopRatePageComponent,
    resolve: {
      movieData: TopRatedMoviesResolver,
    },
  },
  {
    path: 'popular',
    component: MoviePopularPageComponent,
    resolve: {
      movieData: PopularMoviesResolver,
    },
  },
  {
    path: 'upcoming',
    component: MovieUpcomingPageComponent,
    resolve: {
      movieData: UpcomingMoviesResolver,
    },
  },
  { path: 'movie/:id', component: MovieDetailsPageComponent },
  {
    path: 'favorite',
    component: FavoriteMoviesPageComponent,
  },
  { path: 'watch-later', component: WatchLaterPageComponent },
];
