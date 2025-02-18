import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MovieSidebarComponent } from '../movie-sidebar/movie-sidebar.component';
import { movieSelectedListType } from './movie-lists.type';
import { Store } from '@ngrx/store';
import { selectAccountId } from '../../store/auth-store/selectors';
import { filter, map, switchMap, take, takeUntil } from 'rxjs';
import { showAuthPopup } from '../../store/auth-store/actions';
import { ClearObservable } from '../../directives/clear-observable.directive';

@Component({
  selector: 'app-movie-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, MovieSidebarComponent],
  templateUrl: './movie-header.component.html',
  styleUrl: './movie-header.component.scss',
})
export class MovieHeaderComponent extends ClearObservable implements OnInit {
  constructor(private authStore: Store, private router: Router) {
    super();
  }

  private isLoggedIn: boolean = false;
  private currentPage: string = '';

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event: any) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.url),
        switchMap((currentPage) => {
          this.currentPage = currentPage;
          return this.authStore.select(selectAccountId);
        })
      )
      .subscribe((accountId: string | null) => {
        this.isLoggedIn = !!accountId;

        if (
          !this.isLoggedIn &&
          (this.currentPage === '/favorite' ||
            this.currentPage === '/watch-later')
        ) {
          this.authStore.dispatch(
            showAuthPopup({ redirectUrl: `${this.currentPage}` })
          );
        }
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
