import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {take} from 'rxjs/operators';
import {News} from '../models/News';
import {AlertService} from './alert.service';
import {WebApiService} from './web-api.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  news = new Subject<News>();

  constructor(
    private webApiService: WebApiService,
    private alertService: AlertService) {
  }

  public getAllNews(): Observable<News> {
    this.webApiService
      .getAllNews()
      .pipe(take(1))
      .subscribe((allNews: News[]) =>
        allNews.forEach((news: News) => this.news.next(news))
      );
    return this.news;
  }

  public addNews(news: News): void {
    this.webApiService.postNews(news)
      .pipe(take(1))
      .subscribe({
        next: (response: News) => {
          this.news.next(response);
          this.alertService.success('app-create-news-dialog', 'Posted News Successfully');
        },
        error: (error: HttpErrorResponse) => this.alertService.error('app-create-news-dialog', error.error.error)
      });
  }
}
