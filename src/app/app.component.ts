import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService) { }

  // TODO: Refactor
  // TODO: Snackbar on login
  ngOnInit(): void {
    const accessToken = this.authorizationService.getAccessToken();

    if (accessToken !== '') {
      this.authorizationService.setUsernameFromToken(accessToken);
      this.authorizationService.setRoleFromToken(accessToken);
      this.authorizationService.login(accessToken);
    } else {
      this.authorizationService.logout();
    }
  }
}
