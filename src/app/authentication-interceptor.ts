import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { AuthorizationService } from './services/authorization.service';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog, private authorizationService: AuthorizationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        map((response: HttpEvent<any>) => {
          if (response instanceof HttpResponse) {
            return response;
          }
        }),
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
