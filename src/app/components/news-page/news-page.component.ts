import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs';
import {News} from 'src/app/models/News';
import {NewsComment} from 'src/app/models/NewsComment';
import {WebApiService} from 'src/app/services/web-api.service';
import {NewsCommentsService} from "../../services/news-comments.service";

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {
  newsStory?: News;
  comments!: NewsComment[];
  newsId?: string;

  constructor(
    private route: ActivatedRoute,
    private webApiService: WebApiService,
    private newsCommentsService: NewsCommentsService,
    private title: Title) {
  }

  ngOnInit(): void {
    let newsId: number;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        newsId = params.get('id')! as unknown as number;
        return this.webApiService.getNews(newsId)
      }))
      .subscribe({
        next: (response: News) => {
          this.newsStory = response;
          this.title.setTitle(`${this.newsStory?.title} | Dreadfall`);
          this.newsCommentsService.getNewsComments(newsId)
            .subscribe((commentResponse: NewsComment[]) => this.comments = commentResponse);
        },
        error: (error: HttpErrorResponse) => console.log(error.error.error)
      });
  }

  displayDescription(): string {
    if (!this.comments || this.comments.length === 0) {
      return 'There are no comments'
    } else {
      return `There are ${this.getCommentCount(this.comments)} comments`
    }
  }

  getCommentCount(commentsArr: NewsComment[]): number {
    if (!commentsArr) return 0;
    let commentCount: number = commentsArr.length;
    for (let i = 0; i < commentsArr.length; i++) {
      let subComments = commentsArr[i].comments;
      if (!subComments) {
        continue;
      }
      commentCount += this.getCommentCount(subComments);
    }
    return commentCount;
  }
}
