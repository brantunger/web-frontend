import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { News } from 'src/app/models/News';
import { WebApiService } from 'src/app/services/web-api.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {
  newsStory: News = new News();

  constructor(
    private route: ActivatedRoute,
    private webApiService: WebApiService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.webApiService.getNewsById(params.get('id')!)))
        .pipe(take(1))
        .subscribe({
          next: (response: News) => this.newsStory = response,
          error: (error: HttpErrorResponse) => console.log(error.error.error)
        });
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
}
