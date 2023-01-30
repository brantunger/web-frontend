import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentDialogData} from "../../../models/CommentDialogData";

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: CommentDialogData,
              private dialogRef: MatDialogRef<CommentDialogComponent>,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      textareaInput: [this.data.text, Validators.required]
    });
  }

  createOrEditComment(): void {
    const dialogResult: CommentDialogData = {
      action: this.data.action,
      newsId: this.data.newsId,
      commentId: this.data.commentId,
      parentId: this.data.parentId,
      text: this.formGroup.controls['textareaInput'].value
    };

    this.dialogRef.close(dialogResult);
  }
}
