import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.authorizationService.setUsernameFromToken(sessionStorage.getItem('access_token'));
    this.authorizationService.setRoleFromToken(sessionStorage.getItem('access_token'));
  }

}
