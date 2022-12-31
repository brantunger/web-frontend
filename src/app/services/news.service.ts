import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { News } from '../models/News';
import { WebApiService } from './web-api.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  news = new Subject<News>();

  constructor(private webApiService: WebApiService) { }

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
    this.news.next(news);
  }
}
