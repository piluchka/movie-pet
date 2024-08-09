import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAccountId } from '../store/auth-store/selectors';
import { of, switchMap, take } from 'rxjs';
import { getAccountId, showAuthPopup } from '../store/auth-store/actions';

@Injectable({
  providedIn: 'root',
})
export class MovieGuard implements CanActivate {
  constructor(private authStore: Store) {}
  canActivate() {
    return this.authStore.select(selectAccountId).pipe(
      take(1),
      switchMap((accountId) => {
        if (accountId) {
          return of(true);
        } else {
          this.authStore.dispatch(showAuthPopup());
          return of(false);
        }
      })
    );
  }
}
