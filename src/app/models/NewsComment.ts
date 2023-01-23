export class NewsComment {
    commentId!: number;
    newsId!: number;
    parentId?: number;
    content!: string;
    createdBy!: string;
    dateCreated!: Date;
    comments?: NewsComment[];
}