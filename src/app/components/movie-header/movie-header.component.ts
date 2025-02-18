import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MovieSidebarComponent } from '../movie-sidebar/movie-sidebar.component';
import { movieSelectedListType } from './movie-lists.type';
import { Store } from '@ngrx/store';
import { selectAccountId } from '../../store/auth-store/selectors';
import { take } from 'rxjs';
import { showAuthPopup } from '../../store/auth-store/actions';

@Component({
  selector: 'app-movie-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, MovieSidebarComponent],
  templateUrl: './movie-header.component.html',
  styleUrl: './movie-header.component.scss',
})
export class MovieHeaderComponent implements OnInit {
  constructor(private authStore: Store, private router: Router) {}

  private isLoggedIn: string | null = null;

  ngOnInit(): void {
    this.authStore
      .select(selectAccountId)
      .pipe(take(1))
      .subscribe((accountId: string | null) => {
        this.isLoggedIn = accountId;
      });
  }
  openSelectedList(type: movieSelectedListType): void {
    if (this.isLoggedIn) {
      this.router.navigate([`/${type}`]);
    } else {
      this.authStore.dispatch(showAuthPopup({ redirectUrl: `/${type}` }));
    }
  }
}
