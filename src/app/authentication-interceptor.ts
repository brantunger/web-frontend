import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { AuthorizationService } from './services/authorization.service';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog, private authorizationService: AuthorizationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authorizationService.logout();
            this.dialog.open(LoginDialogComponent, {
              width: '400px'
            });
          }
          return throwError(error);
        })
      );
  }
}
