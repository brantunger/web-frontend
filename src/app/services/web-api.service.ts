import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpMethod } from 'src/helpers/Constants';

const { GET, POST, PUT, DELETE, PATCH } = HttpMethod;

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  apiUrl = environment.baseApiUrl + '/v1';

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<any> {
    return this.perform(POST, `${this.apiUrl}/user/authenticate`, { username, password });
  }

  getUsers(): Observable<any> {
    return this.perform(GET, `${this.apiUrl}/user`);
  }

  setAccessToken(token: string) {
    sessionStorage.setItem('access_token', token);
  }

  private perform(method: HttpMethod, url: string, data?: any): Observable<any> {
    let headers;
    let response$: Observable<Object>;

    if (this.getAccessToken() !== null) {
      headers = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.getAccessToken()}`,
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

  private getAccessToken(): string {
    return sessionStorage.getItem('access_token') as string;
  }
}
