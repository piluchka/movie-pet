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
  }
  closeDialog() {
    this.visible = false;
  }

  showDialog() {
    this.visible = true;
  }
}
