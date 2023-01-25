import { NestedTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NewsComment } from 'src/app/models/NewsComment';

const TREE_DATA: NewsComment[] = [
  {
    commentId: 1,
    newsId: 1,
    content: 'I am a comment!',
    createdBy: 'admin',
    dateCreated: new Date(),
    comments: [
      {
        commentId: 2,
        newsId: 1,
        parentId: 1,
        content: 'I am a comment!',
        createdBy: 'admin',
        dateCreated: new Date(),
        comments: [
          {
            commentId: 5,
            newsId: 1,
            parentId: 2,
            content: 'I am a comment!',
            createdBy: 'admin',
            dateCreated: new Date()
          }
        ]
      },
      {
        commentId: 3,
        newsId: 1,
        parentId: 1,
        content: 'I am a comment!',
        createdBy: 'admin',
        dateCreated: new Date()
      },
      {
        commentId: 4,
        newsId: 1,
        parentId: 1,
        content: 'I am a comment!',
        createdBy: 'admin',
        dateCreated: new Date()
      }
    ]
  },
  {
    commentId: 6,
    newsId: 1,
    content: 'I am a comment!',
    createdBy: 'admin',
    dateCreated: new Date(),
    comments: [
      {
        commentId: 7,
        newsId: 1,
        parentId: 6,
        content: 'I am a comment!',
        createdBy: 'admin',
        dateCreated: new Date()
      }
    ]
  }
];

@Component({
  selector: 'app-comments-tree',
  templateUrl: './comments-tree.component.html',
  styleUrls: ['./comments-tree.component.scss']
})
export class CommentsTreeComponent implements AfterViewInit {
  @Input() nodeData!: NewsComment[];
  treeControl = new NestedTreeControl<NewsComment>(node => node.comments);
  dataSource = new MatTreeNestedDataSource<NewsComment>();

  constructor(private cdr: ChangeDetectorRef) {
    this.nodeData = TREE_DATA;
    this.dataSource.data = this.nodeData;
    this.treeControl.dataNodes = this.nodeData;
  }

  ngAfterViewInit(): void {
    this.treeControl.expandAll();
    this.cdr.detectChanges();
  }

  addReply(node: NewsComment): void {
    console.log("Adding reply to:", node.commentId);
  }

  hasChild = (_: number, node: NewsComment) => !!node.comments && node.comments.length > 0;
}
