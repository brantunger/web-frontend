import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EarlyErrorStateMatcher } from '../../helpers/EarlyErrorStateMatcher';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  formGroup: FormGroup;
  matcher: EarlyErrorStateMatcher;
  showPassword = false;
  passwordInputType = 'password';

  constructor(@Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      usernameInput: ['', Validators.required],
      passwordInput: ['', Validators.required]
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }

  login() {
    if (this.formGroup.invalid) {
      return;
    }
  }
}
