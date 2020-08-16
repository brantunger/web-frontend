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

  ngOnInit(): void {
  }

  convertDate(): string {
    return moment(this.newsStory.dateCreated)
      .local(true)
      .utc()
      .format('MM/DD/YY hh:mm:ss');
  }

  voteUp(): void {
    this.webApiService
      .updateNewsVoteCount(this.newsStory.newsId, this.newsStory.votes + 1)
      .pipe(take(1))
      .subscribe(
        (newsResponse: News) => this.newsStory = newsResponse,
        (error: any) => console.error(error.error.message)
      );
  }

  voteDown(): void {
    this.webApiService
      .updateNewsVoteCount(this.newsStory.newsId, this.newsStory.votes - 1)
      .pipe(take(1))
      .subscribe(
        (newsResponse: News) => this.newsStory = newsResponse,
        (error: any) => console.error(error.error.message)
      );
  }
}
