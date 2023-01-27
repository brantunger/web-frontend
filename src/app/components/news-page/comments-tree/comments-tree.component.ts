import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NewsComment} from 'src/app/models/NewsComment';
import {AuthorizationService} from "../../../services/authorization.service";
import {NewsCommentsService} from "../../../services/news-comments.service";
import {CommentDialogComponent} from "../comment-dialog/comment-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CommentDialogData} from "../../../models/CommentDialogData";

@Component({
  selector: 'app-comments-tree',
  templateUrl: './comments-tree.component.html',
  styleUrls: ['./comments-tree.component.scss']
})
export class CommentsTreeComponent implements OnChanges {
  @Input() nodeData: NewsComment[] = [];
  treeControl = new NestedTreeControl<NewsComment>(node => node.comments);
  dataSource = new MatTreeNestedDataSource<NewsComment>();

  constructor(
    public authorizationService: AuthorizationService,
    private newsCommentsService: NewsCommentsService,
    private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.nodeData = changes['nodeData'].currentValue;
    this.dataSource.data = this.nodeData;
    this.treeControl.dataNodes = this.nodeData;
    if (!this.nodeData) return;
    this.treeControl.expandAll();
  }

  addReply(newsComment: NewsComment): void {
    console.log('Adding reply to:', newsComment.commentId);
  }

  deleteReply(newsComment: NewsComment): void {
    this.newsCommentsService.deleteNewsComment(newsComment.newsId, newsComment.commentId);
  }

  editReply(newsComment: NewsComment): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '80vw',
      data: {
        action: 'edit',
        newsId: newsComment.newsId,
        commentId: newsComment.commentId,
        text: newsComment.content
      },
      disableClose: true,
      enterAnimationDuration: 400,
      exitAnimationDuration: 400
    });

    dialogRef.afterClosed().subscribe((result: CommentDialogData) => {
      if (result.action === 'close') return;
      console.log(result);
    });
  }

  hasChild = (_: number, node: NewsComment) => !!node.comments && node.comments.length > 0;
}
