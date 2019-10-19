import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpMethod } from 'src/helpers/Constants';
import { ShoutMessage } from '../models/ShoutMessage';
import { User } from '../models/User';
import { News } from '../models/News';
import { AuthorizationService } from './authorization.service';

const { GET, POST, PUT, DELETE, PATCH } = HttpMethod;

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  apiUrl = environment.baseApiUrl + '/v1';

  constructor(private http: HttpClient, private authorizationService: AuthorizationService) { }

  authenticate(username: string, password: string): Observable<User> {
    return this.perform(POST, `${this.apiUrl}/user/authenticate`, { username, password });
  }

  register(user: User): Observable<User> {
    return this.perform(POST, `${this.apiUrl}/user/register`, user);
  }

  getShoutMessages(): Observable<ShoutMessage[]> {
    return this.perform(GET, `${this.apiUrl}/shoutmessage`);
  }

  getAllNews(): Observable<News[]> {
    return this.perform(GET, `${this.apiUrl}/news`);
  }

  updateNews(id: number, news: News): Observable<News> {
    return this.perform(PUT, `${this.apiUrl}/news/${id}`, news);
  }

  private perform(method: HttpMethod, url: string, data?: any): Observable<any> {
    let headers;
    let response$: Observable<object>;

    if (this.authorizationService.getAccessToken() !== null) {
      headers = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authorizationService.getAccessToken()}`,
          'Content-Type': 'application/json'
        })
      };
    } else {
      headers = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    }

    switch (method) {
      case GET:
      case DELETE:
        response$ = this.http[method](url, headers);
        break;
      case PUT:
      case POST:
      case PATCH:
        if (null === data) {
          throw new Error('Data parameter cannot be null on PUT or POST.');
        }
        response$ = this.http[method](url, data, headers);
        break;
      default:
        throw new Error(`HTTP method ${method} not implemented.`);
    }

    return response$;
  }
}
