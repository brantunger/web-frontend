import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../services/web-api.service';
import { News } from '../../models/News';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  news = new Array<News>();
  constructor(private webApiService: WebApiService) { }

  ngOnInit(): void {
    this.webApiService
      .getAllNews()
      .pipe(take(1))
      .subscribe((newsStories: News[]) => {
        newsStories.forEach((story: News) => {
          this.news.push(story);
        });
      });
  }

}
