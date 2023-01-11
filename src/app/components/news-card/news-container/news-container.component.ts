import {Component, Input, OnInit} from '@angular/core';
import {News} from 'src/app/models/News';
import {WebApiService} from 'src/app/services/web-api.service';
import {take} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthorizationService} from 'src/app/services/authorization.service';

@Component({
  selector: 'app-news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.scss']
})
export class NewsContainerComponent implements OnInit {
  @Input() newsStory!: News;

  constructor(
    public authorizationService: AuthorizationService,
    private webApiService: WebApiService) {
  }

  ngOnInit(): void {
  }

  voteUp(): void {
    this.webApiService
      .updateNewsVoteCount(this.newsStory.newsId, this.newsStory.votes + 1)
      .pipe(take(1))
      .subscribe({
        next: (newsResponse: News) => this.newsStory = newsResponse,
        error: (error: HttpErrorResponse) => console.error(error.error.error)
      });
  }

  voteDown(): void {
    this.webApiService
      .updateNewsVoteCount(this.newsStory.newsId, this.newsStory.votes - 1)
      .pipe(take(1))
      .subscribe({
        next: (newsResponse: News) => this.newsStory = newsResponse,
        error: (error: HttpErrorResponse) => console.error(error.error.error)
      });
  }
}
