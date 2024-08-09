import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAccountId } from '../store/auth-store/selectors';

@Injectable({
  providedIn: 'root',
})
export class MovieGuard implements CanActivate {
  constructor(private authStore: Store) {}
  canActivate() {
    let result: boolean = false;
    this.authStore.select(selectAccountId).subscribe((accountId) => {
      if (accountId) {
        result = true;
      } else {
        result = false;
      }
    });
    return result;
  }
}
