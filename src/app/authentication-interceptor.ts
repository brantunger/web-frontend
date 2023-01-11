// @Injectable()
// export class AuthenticationInterceptor implements HttpInterceptor {
//   constructor(private authorizationService: AuthorizationService) { }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(request)
//       .pipe(
//         map((response: HttpEvent<any>) => {
//           if (response instanceof HttpResponse) {
//             return response;
//           }
//         }),
//         catchError((error: HttpErrorResponse) => {
//           if (error.status === 401 || error.status === 403) {
//             this.authorizationService.logout();
//           }
//           return throwError(error);
//         })
//       );
//   }
// }
