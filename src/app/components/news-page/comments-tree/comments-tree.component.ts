import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
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
  }
];

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  nodeData: NewsComment;
  level: number;
}

@Component({
  selector: 'app-comments-tree',
  templateUrl: './comments-tree.component.html',
  styleUrls: ['./comments-tree.component.scss']
})
export class CommentsTreeComponent {
  private _transformer = (node: NewsComment, level: number) => {
    return {
      expandable: !!node.comments && node.comments.length > 0,
      nodeData: node,
      level: level
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.comments
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
