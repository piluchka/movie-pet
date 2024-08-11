import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  getRequestToken,
  hideAuthPopup,
  validateRequestToken,
} from '../../store/auth-store/actions';
import {
  selectAuthError,
  selectIsAuthPopupVisible,
  selectIsRequestTokenLoaded,
} from '../../store/auth-store/selectors';
import { filter, first, takeUntil, tap } from 'rxjs';
import { ClearObservable } from '../../directives/clear-observable.directive';
import { ErrorMessages } from '../../enums/auth-popup.enum';

@Component({
  selector: 'app-auth-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './auth-popup.component.html',
  styleUrl: './auth-popup.component.scss',
})
export class AuthPopupComponent
  extends ClearObservable
  implements OnInit, OnDestroy
{
  visible: boolean = true;
  isPasswordValid: boolean = true;
  isUserNameValid: boolean = true;
  isUserNameAndPasswordValid: boolean = true;
  errorMessages = ErrorMessages;
  authForm: FormGroup = new FormGroup({});

  constructor(private authStore: Store) {
    super();
  }

  ngOnInit(): void {
    this.authStore
      .select(selectIsAuthPopupVisible)
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuthPopupVisible) => (this.visible = isAuthPopupVisible));
    this.createAuthForm();
  }

  createAuthForm(): void {
    this.authForm = new FormGroup({
      userName: new FormControl('piluchka', Validators.required),
      password: new FormControl('denadenadena1', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onSubmit() {
    this.isPasswordValid =
      this.authForm.controls['password'].status === 'INVALID' ? false : true;
    this.isUserNameValid =
      this.authForm.controls['userName'].status === 'INVALID' ? false : true;

    if (this.authForm.status === 'VALID') {
      this.logInValidation();
    }
  }
  logInValidation() {
    this.authStore.dispatch(getRequestToken());

    this.authStore
      .select(selectIsRequestTokenLoaded)
      .pipe(
        filter((isLoaded) => isLoaded),
        first()
      )
      .subscribe(() => {
        const userName = this.authForm.value.userName;
        const password = this.authForm.value.password;

        this.authStore.dispatch(validateRequestToken({ userName, password }));

        this.authStore
          .select(selectAuthError)
          .pipe(
            filter((error) => error),
            first()
          )
          .subscribe(() => {
            this.isUserNameAndPasswordValid = false;
          });
      });
  }

  closeDialog() {
    this.authStore.dispatch(hideAuthPopup());
  }
}
