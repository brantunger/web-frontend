import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {WebApiService} from "./web-api.service";
import {take} from "rxjs/operators";
import {NewsComment} from "../models/NewsComment";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NewsCommentsService {
  private _comments = new BehaviorSubject<NewsComment[]>([]);
  private commentsData: NewsComment[] = [];

  constructor(private webApiService: WebApiService) {
  }

  public getComments(newsId: number): Observable<NewsComment[]> {
    this.webApiService.getNewsComments(newsId)
      .pipe(take(1))
      .subscribe((comments: NewsComment[]) => {
        this.commentsData = comments;
        this._comments.next(this.commentsData);
      });
    return this._comments;
  }

  public addComment(comments: NewsComment): void {
    this.webApiService.addComment(comments)
      .pipe(take(1))
      .subscribe({
        next: (response: NewsComment) => {
          this.commentsData = [...this.commentsData, response];
          this._comments.next(this.commentsData);
        },
        error: (error: HttpErrorResponse) => console.error(error.error.error)
      });
  }

  public deleteNewsComment(newsId: number, commentId: number): void {
    this.webApiService.deleteNewsComment(newsId, commentId)
      .pipe(take(1))
      .subscribe({
        next: (comments: NewsComment[]) => {
          this.commentsData = comments;
          this._comments.next(this.commentsData);
        },
        error: (error: HttpErrorResponse) => console.error(error.error.error)
      });
  }
}
