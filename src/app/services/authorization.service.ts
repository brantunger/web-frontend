import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor() { }

  setAccessToken(token: string) {
    sessionStorage.setItem('access_token', token);
  }

  getAccessToken(): string {
    return sessionStorage.getItem('access_token') as string;
  }

  setUsername(user: string) {
    sessionStorage.setItem('user', user);
  }

  getUsername(): string {
    return sessionStorage.getItem('user') as string;
  }

  isUserLoggedIn(): boolean {
    return (this.getUsername() !== null && this.getAccessToken() !== null);
  }

  logout() {
    sessionStorage.clear();
  }
}
