import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { LoginDialogComponent } from '../../login-dialog/login-dialog.component';
import { SignupDialogComponent } from '../../signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.scss']
})
export class NavigationListComponent {
  @Output() onNavLinkClick = new EventEmitter();
  
  constructor(
    public authorizationService: AuthorizationService,
    private dialog: MatDialog) {}

  navigationClose(): void {
    this.onNavLinkClick.emit();
  }

  openLoginDialog(): void {
    this.navigationClose();
    this.dialog.open(LoginDialogComponent, {
      width: '400px',
      disableClose: true
    });
  }

  openSignupDialog(): void {
    this.navigationClose();
    this.dialog.open(SignupDialogComponent, {
      width: '400px',
      disableClose: true
    });
  }

  logout(): void {
    this.navigationClose();
    this.authorizationService.logout();
  }
}
