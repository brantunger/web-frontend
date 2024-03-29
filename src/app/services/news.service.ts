import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {News} from '../models/News';
import {AlertService} from './alert.service';
import {WebApiService} from './web-api.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private _news = new BehaviorSubject<News[]>([]);
  private newsData: News[] = [];

  constructor(
    private webApiService: WebApiService,
    private alertService: AlertService,
    private router: Router) {
  }

  public getAllNews(): Observable<News[]> {
    this.webApiService.getAllNews()
      .pipe(take(1))
      .subscribe((allNews: News[]) => {
        this.newsData = allNews;
        this._news.next(this.newsData);
      });
    return this._news;
  }

  public addNews(news: News): void {
    this.webApiService.postNews(news)
      .pipe(take(1))
      .subscribe({
        next: (response: News) => {
          this.newsData.push(response);
          this.newsData.sort((a: News, b: News) =>
            new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
          this._news.next(this.newsData);
        },
        error: (error: HttpErrorResponse) => this.alertService.error('app-create-news-page', error.error.error)
      });
  }

  public deleteNews(id: number | string): void {
    this.webApiService.deleteNews(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.newsData = this.newsData.filter(news => news.newsId !== id);
          this._news.next(this.newsData);
        },
        error: (error: HttpErrorResponse) => console.error(error.error.error)
      });
  }

  public updateNews(news: News): void {
    this.webApiService.updateNews(news)
      .pipe(take(1))
      .subscribe({
        next: (response: News) => {
          const newsIndex = this.newsData.findIndex((newsStory: News) => newsStory.newsId === news.newsId);
          this.newsData.splice(newsIndex, 1);
          this.newsData.push(response);
          this.newsData.sort((a: News, b: News) =>
            new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
          this._news.next(this.newsData);
        },
        error: (error: HttpErrorResponse) => this.alertService.error('app-create-news-page', error.error.error)
      });
  }
}
