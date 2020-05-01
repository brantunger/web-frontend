import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private username: string;
  private role: string;

  constructor(private jwtService: JwtHelperService) { }

  public setAccessToken(token: string): void {
    sessionStorage.setItem('access_token', token);
  }

  public getAccessToken(): string {
    return sessionStorage.getItem('access_token') as string;
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
    return this.getAccessToken() !== null;
  }

  public login(token: string): void {
    this.setAccessToken(token);
    this.setUsernameFromToken(token);
    this.setRoleFromToken(token);
  }

  public logout(): void {
    this.username = null;
    this.role = null;
    sessionStorage.clear();
  }
}
