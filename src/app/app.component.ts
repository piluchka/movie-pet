import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MovieHeaderComponent } from './components/movie-header/movie-header.component';
import { Store } from '@ngrx/store';
import { AuthPopupComponent } from './components/auth-popup/auth-popup.component';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
import { loadAllMovies, loadMovieGenres } from './store/movie-store/actions';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    MovieHeaderComponent,
    RouterOutlet,
    RouterModule,
    AuthPopupComponent,
    SearchHeaderComponent,
  ],
})
export class AppComponent implements OnInit {
  public title = 'P-Theatre';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadMovieGenres());
    this.store.dispatch(loadAllMovies());
  }
}
