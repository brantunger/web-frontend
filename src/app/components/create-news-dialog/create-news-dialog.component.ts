import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/News';

@Component({
  selector: 'app-create-news-dialog',
  templateUrl: './create-news-dialog.component.html',
  styleUrls: ['./create-news-dialog.component.scss']
})
export class CreateNewsDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<CreateNewsDialogComponent>,
    private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.addNews(new News);
  }
}
