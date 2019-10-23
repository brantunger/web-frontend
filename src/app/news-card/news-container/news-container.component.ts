import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/app/models/News';
import * as moment from 'moment';
import { WebApiService } from 'src/app/services/web-api.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.scss']
})
export class NewsContainerComponent implements OnInit {
  @Input() newsStory: News;

  constructor(private webApiService: WebApiService) { }

  ngOnInit() {
  }

  convertDate(): string {
    return moment(this.newsStory.dateCreated)
      .local(true)
      .utc()
      .format('MM/DD/YY hh:mm:ss');
  }

  voteUp() {
    const newsRequest: News = this.newsStory;
    newsRequest.votes += 1;

    this.webApiService
      .updateNews(newsRequest.newsId, newsRequest)
      .pipe(take(1))
      .subscribe(
        (newsResponse: News) => this.newsStory = newsResponse,
        (error: any) => console.log(error.error.message)
      );
  }

  voteDown() {
    const newsRequest: News = this.newsStory;
    newsRequest.votes -= 1;

    this.webApiService
      .updateNews(newsRequest.newsId, newsRequest)
      .pipe(take(1))
      .subscribe(
        (newsResponse: News) => this.newsStory = newsResponse,
        (error: any) => console.log(error.error.message)
      );
  }
}
