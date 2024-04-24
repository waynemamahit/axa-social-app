export interface IPostBase {
  title: string;
  body: string;
}

export interface IPost {
  id: number;
  userId?: number;
}

export interface ICommentBase {
  name: string;
  email: string;
  body: string;
}

export interface IComment extends ICommentBase {
  id: number;
  postId?: number;
}