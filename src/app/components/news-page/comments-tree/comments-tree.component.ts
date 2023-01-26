import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NewsComment} from 'src/app/models/NewsComment';
import {AuthorizationService} from "../../../services/authorization.service";

@Component({
  selector: 'app-comments-tree',
  templateUrl: './comments-tree.component.html',
  styleUrls: ['./comments-tree.component.scss']
})
export class CommentsTreeComponent implements OnChanges {
  @Input() nodeData: NewsComment[] = [];
  treeControl = new NestedTreeControl<NewsComment>(node => node.comments);
  dataSource = new MatTreeNestedDataSource<NewsComment>();

  constructor(public authorizationService: AuthorizationService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.nodeData = changes['nodeData'].currentValue;
    this.dataSource.data = this.nodeData;
    this.treeControl.dataNodes = this.nodeData;
    if (!this.nodeData) return;
    this.treeControl.expandAll();
  }

  addReply(node: NewsComment): void {
    console.log('Adding reply to:', node.commentId);
  }

  hasChild = (_: number, node: NewsComment) => !!node.comments && node.comments.length > 0;
}
