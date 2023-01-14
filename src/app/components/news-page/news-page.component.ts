import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap, take} from 'rxjs';
import {News} from 'src/app/models/News';
import {WebApiService} from 'src/app/services/web-api.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {
  newsStory?: News;

  constructor(
    private route: ActivatedRoute,
    private webApiService: WebApiService,
    private title: Title) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.webApiService.getNews(params.get('id')!)))
      .pipe(take(1))
      .subscribe({
        next: (response: News) => {
          this.newsStory = response;
          this.title.setTitle(`${this.newsStory?.title} | Dreadfall`);
        },
        error: (error: HttpErrorResponse) => console.log(error.error.error)
      });
  }
}
