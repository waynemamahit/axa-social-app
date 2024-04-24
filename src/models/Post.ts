import { ICommentBase, IPostBase } from "../interfaces/Post";

export class PostForm implements IPostBase {
  body = '';
  title = '';
}

export class CommentForm implements ICommentBase {
  body = '';
  email = '';
  name = '';
}