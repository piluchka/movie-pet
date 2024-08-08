import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MovieService } from '../../services/movie/movie.service';
import { Store } from '@ngrx/store';
import {
  getRequestToken,
  validateRequestToken,
} from '../../store/auth-store/actions';
import { selectIsRequestTokenLoaded } from '../../store/auth-store/selectors';
import { filter, first } from 'rxjs';

@Component({
  selector: 'app-auth-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './auth-popup.component.html',
  styleUrl: './auth-popup.component.scss',
})
export class AuthPopupComponent implements OnInit {
  visible: boolean = true;
  isPasswordValid: boolean = true;
  isUserNameValid: boolean = true;
  authForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    private authStore: Store
  ) {}

  ngOnInit(): void {
    this.createAuthForm();
  }

  createAuthForm(): void {
    this.authForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onSubmit() {
    console.log(this.authForm);

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
      });
  }

  closeDialog() {
    this.visible = false;
  }

  showDialog() {
    this.visible = true;
  }
}
