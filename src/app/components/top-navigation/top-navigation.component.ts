import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent {
  @Output() public sideNavToggle = new EventEmitter();

  constructor(
    public authorizationService: AuthorizationService,
    private dialog: MatDialog,
    private router: Router) {
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '400px'
    });
  }

  openSignupDialog(): void {
    this.dialog.open(SignupDialogComponent, {
      width: '400px'
    });
  }

  navigateToCreate(): void {
    this.router.navigateByUrl('/news/create');
  }

  openSideNav(): void {
    this.sideNavToggle.emit();
  }

  logout(): void {
    this.authorizationService.logout();
  }
}
