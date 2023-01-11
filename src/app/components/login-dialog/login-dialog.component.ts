import {HttpErrorResponse} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {take} from 'rxjs/operators';
import {User} from 'src/app/models/User';
import {EarlyErrorStateMatcher} from '../../../helpers/EarlyErrorStateMatcher';
import {AlertService} from '../../services/alert.service';
import {AuthorizationService} from '../../services/authorization.service';
import {WebApiService} from '../../services/web-api.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  formGroup!: FormGroup;
  matcher!: EarlyErrorStateMatcher;
  showPassword = false;
  passwordInputType = 'password';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private webApiService: WebApiService,
    private authorizationService: AuthorizationService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      usernameInput: ['', Validators.required],
      passwordInput: ['', Validators.required]
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }

  login(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const username = this.formGroup.controls['usernameInput'].value;
    const password = this.formGroup.controls['passwordInput'].value;

    this.webApiService
      .authenticate(username, password)
      .pipe(take(1))
      .subscribe({
        next: (response: User) => {
          if (response.token) {
            this.authorizationService.login(response.token);
            this.dialogRef.close();
          }
        },
        error: (error: HttpErrorResponse) => this.alertService.error('app-login-dialog', error.error.error)
      });
  }
}
