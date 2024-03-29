import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  username!: string;
  role!: string;

  constructor(private jwtService: JwtHelperService, private cookieService: CookieService) {
  }

  public setAccessToken(token: string): void {
    const expiresOnDay = this.jwtService.getTokenExpirationDate(token)?.getTime();
    const expiresOnDate = new Date(expiresOnDay as number);

    this.cookieService.set('access_token', token, expiresOnDate);
  }

  public getAccessToken(): string {
    return this.cookieService.get('access_token');
  }

  public setUsernameFromToken(token: string): void {
    this.username = this.getAccessToken() === null ? null : this.jwtService.decodeToken(token).sub;
  }

  public getUsername(): string {
    return this.username;
  }

  public setRoleFromToken(token: string): void {
    this.role = this.getAccessToken() === null ? null : this.jwtService.decodeToken(token).role;
  }

  public getRole(): string {
    return this.role;
  }

  public isUserLoggedIn(): boolean {
    return this.getAccessToken() !== '';
  }

  public isTokenExpired(): boolean {
    return this.jwtService.isTokenExpired(this.getAccessToken());
  }

  public login(token: string): void {
    this.setAccessToken(token);
    this.setUsernameFromToken(token);
    this.setRoleFromToken(token);
  }

  public logout(): void {
    this.username = '';
    this.role = '';
    this.cookieService.delete('access_token');
  }
}
