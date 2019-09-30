import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {
  constructor(public authorizationService: AuthorizationService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '400px'
    });
  }

  openSignupDialog() {
    this.dialog.open(SignupDialogComponent, {
      width: '400px'
    });
  }

  logout() {
    this.authorizationService.logout();
  }
}
