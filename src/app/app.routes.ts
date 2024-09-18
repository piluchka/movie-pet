import { Routes } from '@angular/router';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { MovieListPageComponent } from './pages/movie-list-page/movie-list-page.component';
import { MovieNowPlayingPageComponent } from './pages/movie-now-playing-page/movie-now-playing-page.component';
import { MovieNowTopRatePageComponent } from './pages/movie-now-top-rate-page/movie-now-top-rate-page.component';
import { MoviePopularPageComponent } from './pages/movie-popular-page/movie-popular-page.component';
import { MovieUpcomingPageComponent } from './pages/movie-upcoming-page/movie-upcoming-page.component';
import { FavoriteMoviesPageComponent } from './pages/favorite-movies-page/favorite-movies-page.component';
import { WatchLaterPageComponent } from './pages/watch-later-page/watch-later-page.component';
import { MovieGuard } from './guards/movie.guard';
import { SearchMoviePageComponent } from './pages/search-movie-page/search-movie-page.component';
import { MovieListResolver } from './guards/movie-list.resolver';

export const routes: Routes = [
  {
    path: '',
    component: MovieListPageComponent,
    resolve: { movieData: MovieListResolver },
  },
  {
    path: 'now-playing',
    component: MovieNowPlayingPageComponent,
  },
  {
    path: 'top-rated',
    component: MovieNowTopRatePageComponent,
  },
  {
    path: 'popular',
    component: MoviePopularPageComponent,
  },
  {
    path: 'upcoming',
    component: MovieUpcomingPageComponent,
  },
  { path: 'movie/:id', component: MovieDetailsPageComponent },
  {
    path: 'favorite',
    component: FavoriteMoviesPageComponent,
    canActivate: [MovieGuard],
  },
  {
    path: 'watch-later',
    component: WatchLaterPageComponent,
    canActivate: [MovieGuard],
  },
  { path: 'search', component: SearchMoviePageComponent },
];
