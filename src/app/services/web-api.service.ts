import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {HttpMethod} from 'src/helpers/Constants';
import {ShoutMessage} from '../models/ShoutMessage';
import {User} from '../models/User';
import {News} from '../models/News';
import {AuthorizationService} from './authorization.service';
import { CompanyInfo } from '../models/CompanyInfo';
import {NewsComment} from "../models/NewsComment";

const {GET, POST, PUT, DELETE, PATCH} = HttpMethod;

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  private apiUrl = environment.baseApiUrl + '/api/v1';

  constructor(private http: HttpClient, private authorizationService: AuthorizationService) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.perform(GET, `${this.apiUrl}/user`);
  }

  public updateUser(user: User): Observable<User> {
    return this.perform(PATCH, `${this.apiUrl}/user/${user.userId}`, user);
  }

  public authenticate(username: string, password: string): Observable<User> {
    return this.perform(POST, `${this.apiUrl}/user/authenticate`, {username, password});
  }

  public register(user: User): Observable<User> {
    return this.perform(POST, `${this.apiUrl}/user/register`, user);
  }

  public getShoutMessages(): Observable<ShoutMessage[]> {
    return this.perform(GET, `${this.apiUrl}/shoutmessage`);
  }

  public getAllNews(): Observable<News[]> {
    return this.perform(GET, `${this.apiUrl}/news`);
  }

  public getNews(id: number | string): Observable<News> {
    return this.perform(GET, `${this.apiUrl}/news/${id}`);
  }

  public postNews(news: News): Observable<News> {
    return this.perform(POST, `${this.apiUrl}/news`, news);
  }

  public updateNews(news: News): Observable<News> {
    return this.perform(PATCH, `${this.apiUrl}/news/${news.newsId}`, news);
  }

  public deleteNews(id: number | string): Observable<any> {
    return this.perform(DELETE, `${this.apiUrl}/news/${id}`);
  }

  public getNewsComments(newsId: number): Observable<NewsComment[]> {
    return this.perform(GET, `${this.apiUrl}/news/${newsId}/comments`);
  }

  public addComment(newsComment: NewsComment): Observable<NewsComment[]> {
    return this.perform(POST, `${this.apiUrl}/news/${newsComment.newsId}/comments`, newsComment);
  }

  public editComment(newsComment: NewsComment): Observable<NewsComment[]> {
    return this.perform(PATCH, `${this.apiUrl}/news/${newsComment.newsId}/comments/${newsComment.commentId}`, newsComment);
  }

  public deleteNewsComment(newsId: number, commentId: number): Observable<NewsComment[]> {
    return this.perform(DELETE, `${this.apiUrl}/news/${newsId}/comments/${commentId}`);
  }

  public updateNewsVoteCount(id: number, count: number): Observable<News> {
    return this.perform(PUT, `${this.apiUrl}/news?id=${id}&voteCount=${count}`);
  }

  public getCompanyInfo(): Observable<CompanyInfo> {
    return this.perform(GET, `${this.apiUrl}/companyinfo`);
  }

  private perform(method: HttpMethod, url: string, data?: any): Observable<any> {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let response$: Observable<object>;

    if (this.authorizationService.getAccessToken() !== '') {
      headers = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authorizationService.getAccessToken()}`,
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
