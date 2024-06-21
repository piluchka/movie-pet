import { Routes } from '@angular/router';
import { MovieListPageComponent } from './pages/movie-list-page/movie-list-page.component';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { MovieGuard } from './guards/movie.guard';
import { MovieResolver } from './guards/movie.resolver';

export const routes: Routes = [
  { path: '', component: MovieListPageComponent },
  {
    path: 'hello',
    component: MovieDetailsPageComponent,
    canActivate: [MovieGuard],
    resolve: { data: MovieResolver },
  },
];
