import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {News} from 'src/app/models/News';
import {NewsService} from 'src/app/services/news.service';
import {environment} from "../../../environments/environment";
import {switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {WebApiService} from "../../services/web-api.service";

@Component({
  selector: 'app-create-news-page',
  templateUrl: './create-news-page.component.html',
  styleUrls: ['./create-news-page.component.scss']
})
export class CreateNewsPageComponent implements OnInit {
  private plugins: Array<string> = ['lists', 'advlist', 'link', 'image', 'table', 'code', 'codesample', 'help', 'wordcount',
    'anchor', 'autolink', 'autoresize', 'autosave', 'charmap', 'emoticons', 'fullscreen', 'importcss',
    'insertdatetime', 'media', 'nonbreaking', 'pagebreak', 'preview', 'save', 'searchreplace', 'template',
    'visualblocks', 'visualchars'];

  private toolbarGroups: Array<string> = ['undo redo print cancel save', 'formatselect fontfamily fontsize forecolor backcolor',
    'bold italic strikethrough underline subscript superscript', 'link image', 'alignleft aligncenter alignright alignjustify lineheight',
    'bullist numlist indent outdent'];

  apiKey = environment.tinyApiKey;
  formGroup!: FormGroup;
  newsStory?: News;
  editing = false;

  constructor(
    private newsService: NewsService,
    private webApiService: WebApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      titleInput: ['', Validators.required],
      contentInput: ['', Validators.required]
    });

    if (this.router.url.endsWith('create')) return;

    let newsId: number;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        newsId = params.get('id')! as unknown as number;
        return this.webApiService.getNews(newsId)
      }))
      .subscribe({
        next: (response: News) => {
          this.newsStory = response;
          this.editing = true;
          this.formGroup.controls['titleInput']?.setValue(this.newsStory.title);
          this.formGroup.controls['contentInput']?.setValue(this.newsStory.content);
        },
        error: (error: HttpErrorResponse) => console.log(error.error.error)
      });
  }

  postNews(): void {
    if (this.formGroup.invalid) {
      return;
    }

    if (!this.editing) {
      const news: News = new News();
      news.title = this.formGroup.controls['titleInput'].value;
      news.content = this.formGroup.controls['contentInput'].value;
      this.newsService.addNews(news);
    } else {
      const news: News = new News();
      news.newsId = this.newsStory?.newsId as number;
      news.title = this.formGroup.controls['titleInput'].value;
      news.content = this.formGroup.controls['contentInput'].value;
      news.createdBy = this.newsStory?.createdBy as string;
      news.dateCreated = this.newsStory?.dateCreated as Date;
      this.newsService.updateNews(news);
    }

    this.router.navigateByUrl('');
  }

  getPluginsList(): string {
    return this.plugins.join(' ');
  }

  getToolbarGroups(): string {
    return this.toolbarGroups.join(' | ');
  }
}
