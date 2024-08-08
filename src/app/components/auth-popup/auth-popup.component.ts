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
import { map, tap } from 'rxjs';
import { MovieService } from '../../services/movie/movie.service';

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
    private movieService: MovieService
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
    const userName = this.authForm.value.userName;
    const password = this.authForm.value.password;

    this.authService
      .authenticateUser(userName, password)
      .subscribe((result) => {
        if (result) {
          console.log('User authenticated, session ID:', result);

          this.movieService.setSessionId(result.sessionId);
          this.movieService.setAccountId(result.accountId);
        } else {
          console.log('Authentication failed.');
        }
      });
  }

  closeDialog() {
    this.visible = false;
  }

  showDialog() {
    this.visible = true;
  }
}
