import { Component, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieSidebarComponent } from './components/movie-sidebar/movie-sidebar.component';
import { MovieHeaderComponent } from './components/movie-header/movie-header.component';
import { MovieListPageComponent } from './pages/movie-list-page/movie-list-page.component';
import { AuthService } from './services/auth/auth.service';
import { MovieService } from './services/movie/movie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    MovieListComponent,
    MovieCardComponent,
    MovieSidebarComponent,
    MovieHeaderComponent,
    RouterOutlet,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    MovieListPageComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'angular-edu';

  constructor(
    private authService: AuthService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.authService.authenticateAndGetAccountId().subscribe(
      (accountId) => {
        this.movieService.setAccountId(accountId);
        console.log('Account ID:', accountId);
      },
      (error) => {
        console.error('Authentication failed:', error);
      }
    );
  }
}
