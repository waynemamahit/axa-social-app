export interface ICommentBase {
  name: string;
  email: string;
  body: string;
}

export interface IComment extends ICommentBase {
  id: number;
  postId?: number;
}
