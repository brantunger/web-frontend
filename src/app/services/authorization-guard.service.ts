import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthorizationService} from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuardService implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router) {
  }

  canActivate(): boolean {
    if (!this.authorizationService.isUserLoggedIn() && this.authorizationService.getRole() !== 'ADMIN') {
      this.router.navigateByUrl('auth');
      return false;
    }

    return true;
  }
}
