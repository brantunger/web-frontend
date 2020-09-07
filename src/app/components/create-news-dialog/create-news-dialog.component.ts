import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewsService } from 'src/app/services/news.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-create-news-dialog',
  templateUrl: './create-news-dialog.component.html',
  styleUrls: ['./create-news-dialog.component.scss']
})
export class CreateNewsDialogComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  formGroup: FormGroup;
  markdown = `## Markdown`;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<CreateNewsDialogComponent>,
    private newsService: NewsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      titleInput: ['', Validators.required],
      postInput: ['', Validators.required]
    });
  }
}
