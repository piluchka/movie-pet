import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadPopularMovies } from './store/actions';

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
export class AppComponent implements OnInit, OnDestroy {
  public title = 'P-Theatre';
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService
      .authenticateAndGetAccountId()
      .subscribe(
        (authData) => {
          this.movieService.setAccountId(authData.accountId);
          this.movieService.setSessionId(authData.sessionId);
        },
        (error) => {
          console.error('Authentication failed:', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
