import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { News } from 'src/app/models/News';
import { NewsService } from 'src/app/services/news.service';

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

  formGroup!: FormGroup;

  constructor(
    private newsService: NewsService,
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      titleInput: ['', Validators.required],
      contentInput: ['', Validators.required]
    });
  }

  postNews(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const news: News = new News();
    news.title = this.formGroup.controls['titleInput'].value;
    news.content = this.formGroup.controls['contentInput'].value;
    this.newsService.addNews(news);
    this.router.navigateByUrl('');
  }

  getPluginsList(): string {
    return this.plugins.join(' ');
  }

  getToolbarGroups(): string {
    return this.toolbarGroups.join(' | ');
  }
}
