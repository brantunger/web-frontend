import {HttpErrorResponse} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {take} from 'rxjs/operators';
import {EarlyErrorStateMatcher} from 'src/helpers/EarlyErrorStateMatcher';
import {User} from '../../models/User';
import {AlertService} from '../../services/alert.service';
import {WebApiService} from '../../services/web-api.service';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss']
})
export class SignupDialogComponent implements OnInit {
  formGroup!: FormGroup;
  matcher!: EarlyErrorStateMatcher;
  showPassword = false;
  passwordInputType = 'password';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private webApiService: WebApiService,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      usernameInput: ['', Validators.required],
      emailInput: ['', Validators.required],
      passwordInput: ['', Validators.required],
      passwordVerifyInput: ['', Validators.required]
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

  passwordVerified(): boolean {
    const password = this.formGroup.controls['passwordInput'].value;
    const passwordVerify = this.formGroup.controls['passwordVerifyInput'].value;
    return (password === passwordVerify && passwordVerify !== '');
  }

  register(): void {
    if (this.formGroup.invalid || !this.passwordVerified()) {
      return;
    }

    const user: User = new User();
    user.username = this.formGroup.controls['usernameInput'].value;
    user.password = this.formGroup.controls['passwordInput'].value;
    user.email = this.formGroup.controls['usernameInput'].value;
    user.role = 'USER';

    this.webApiService
      .register(user)
      .pipe(take(1))
      .subscribe({
        next: () => this.alertService.success('app-signup-dialog', 'Registration Successful'),
        error: (error: HttpErrorResponse) => this.alertService.error('app-signup-dialog', error.error.error)
      });

    this.clearInputs();
  }

  private clearInputs(): void {
    this.formGroup.controls['usernameInput'].setValue('');
    this.formGroup.controls['emailInput'].setValue('');
    this.formGroup.controls['passwordInput'].setValue('');
    this.formGroup.controls['passwordVerifyInput'].setValue('');
  }
}
