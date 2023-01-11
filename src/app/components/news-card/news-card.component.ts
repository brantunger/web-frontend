import {Component, OnInit} from '@angular/core';
import {News} from '../../models/News';
import {NewsService} from 'src/app/services/news.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  news = new Array<News>();

  constructor(private newsService: NewsService) {
  }

  ngOnInit(): void {
    this.newsService
      .getAllNews()
      .subscribe((newsStory: News) => this.news.push(newsStory));
  }

}
