import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewsService } from 'src/app/services/news.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { News } from 'src/app/models/News';

@Component({
  selector: 'app-create-news-dialog',
  templateUrl: './create-news-dialog.component.html',
  styleUrls: ['./create-news-dialog.component.scss']
})
export class CreateNewsDialogComponent implements OnInit {
  private plugins: Array<string> = ["lists", "advlist", "link", "image", "table", "code", "codesample", "help", "wordcount",
    "anchor", "autolink", "autoresize", "autosave", "charmap", "emoticons", "fullscreen", "importcss",
    "insertdatetime", "media", "nonbreaking", "pagebreak", "preview", "save", "searchreplace", "template",
    "visualblocks", "visualchars"];

  private toolbarGroups: Array<string> = ["undo redo print cancel save", "formatselect fontfamily fontsize forecolor backcolor",
    "bold italic strikethrough underline subscript superscript", "link image", "alignleft aligncenter alignright alignjustify lineheight",
    "bullist numlist indent outdent"];
  
    formGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateNewsDialogComponent>,
    private newsService: NewsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      titleInput: ['', Validators.required],
      contentInput: ['', Validators.required]
    });
  }

  postNews(title: string, content: string): void {
    // this.newsService.addNews()
  }

  getPluginsList(): string {
    return this.plugins.join(" ");
  }

  getToolbarGroups(): string {
    return this.toolbarGroups.join(" | ");
  }
}
