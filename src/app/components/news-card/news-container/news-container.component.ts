import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/app/models/News';
import { WebApiService } from 'src/app/services/web-api.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.scss']
})
export class NewsContainerComponent implements OnInit {
  @Input() newsStory!: News;

  constructor(private webApiService: WebApiService) { }

  ngOnInit(): void {
  }

  convertDate(): string {
    const dateTimeFormat: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: 'numeric'
    };

    const locale = 'en-us';
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const unformattedDateTime = new Date(this.newsStory.dateCreated);
    const formattedDateTime = Intl.DateTimeFormat(locale, dateTimeFormat).format(unformattedDateTime);
    return `${formattedDateTime} - ${timeZone}`;
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
