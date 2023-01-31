import {HttpErrorResponse} from '@angular/common/http';
import {Component, Input} from '@angular/core';
import {take} from 'rxjs/operators';
import {News} from 'src/app/models/News';
import {AuthorizationService} from 'src/app/services/authorization.service';
import {NewsService} from 'src/app/services/news.service';
import {WebApiService} from 'src/app/services/web-api.service';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";

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
    private newsService: NewsService,
    private dialog: MatDialog) {
  }

  deleteNews(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      enterAnimationDuration: 400,
      exitAnimationDuration: 400
    });

    dialogRef.afterClosed().subscribe((response: any) => {
      if (response.confirm) {
        this.newsService.deleteNews(this.newsStory.newsId);
      }
    });
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
