import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { News } from 'src/app/models/News';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { NewsService } from 'src/app/services/news.service';
import { WebApiService } from 'src/app/services/web-api.service';

@Component({
  selector: 'app-news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.scss']
})
export class NewsContainerComponent {
  @Input() newsStory!: News;

  constructor(
    public authorizationService: AuthorizationService,
    private webApiService: WebApiService,
    private newsService: NewsService) {
  }

  deleteNews(): void {
    this.newsService.deleteNews(this.newsStory.newsId);
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
