import { Routes } from '@angular/router';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { FavoriteMoviesPageComponent } from './pages/favorite-movies-page/favorite-movies-page.component';
import { WatchLaterPageComponent } from './pages/watch-later-page/watch-later-page.component';
import { MovieGuard } from './guards/movie.guard';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MoviesPageComponent,
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
  {
    path: ':category',
    component: MoviesPageComponent,
  },
];
