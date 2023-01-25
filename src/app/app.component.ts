import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from './services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService) {
  }

  ngOnInit(): void {
    const accessToken = this.authorizationService.getAccessToken();

    if (accessToken !== '' && !this.authorizationService.isTokenExpired()) {
      this.authorizationService.login(accessToken);
    } else {
      this.authorizationService.logout();
    }
  }
}
