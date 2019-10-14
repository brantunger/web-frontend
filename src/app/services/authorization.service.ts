import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private username: string;
  private role: string;

  constructor(private jwtService: JwtHelperService) { }

  setAccessToken(token: string) {
    sessionStorage.setItem('access_token', token);
  }

  getAccessToken(): string {
    return sessionStorage.getItem('access_token') as string;
  }

  setUsernameFromToken(token: string) {
    this.username = this.getAccessToken() === null ? null : this.jwtService.decodeToken(token).sub;
  }

  getUsername(): string {
    return this.username;
  }

  setRoleFromToken(token: string) {
    this.role = this.getAccessToken() === null ? null : this.jwtService.decodeToken(token).role;
  }

  getRole(): string {
    return this.role;
  }

  isUserLoggedIn(): boolean {
    return this.getAccessToken() !== null;
  }

  login(token: string) {
    this.setAccessToken(token);
    this.setUsernameFromToken(token);
    this.setRoleFromToken(token);
  }

  logout() {
    this.username = null;
    this.role = null;
    sessionStorage.clear();
  }
}
