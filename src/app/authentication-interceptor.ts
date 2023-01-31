import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {AuthorizationService} from "./services/authorization.service";
import {Observable, tap} from "rxjs";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authorizationService: AuthorizationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            console.log(`${request.method} request to ${request.url} returned ${event.status}`);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error has occurred in HTTP Request', error.error);
          if (error.status === 401 || error.status === 403) {
            // this.authorizationService.logout();
          }
        }
      }));
  }
}
