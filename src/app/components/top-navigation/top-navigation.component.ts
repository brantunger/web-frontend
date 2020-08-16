import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { AuthorizationService } from '../../services/authorization.service';
import { CreateNewsDialogComponent } from '../create-news-dialog/create-news-dialog.component';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {
  constructor(public authorizationService: AuthorizationService, private dialog: MatDialog) { }

  ngOnInit(): void {
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

  openCreateDialog(): void {
    this.dialog.open(CreateNewsDialogComponent, {
      width: '400px'
    });
  }

  logout(): void {
    this.authorizationService.logout();
  }
}
