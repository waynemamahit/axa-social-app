import { ICommentBase } from "../interfaces/Comment";

export class CommentForm implements ICommentBase {
  body = "";
  email = "";
  name = "";
}
