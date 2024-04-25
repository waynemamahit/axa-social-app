import { IComment } from "../interfaces/Comment";

export class CommentForm implements IComment {
  id = 0;
  postId?: number;
  name = "";
  email = "";
  body = "";
}
