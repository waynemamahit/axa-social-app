import { IPost } from "../interfaces/Post";

export class PostForm implements IPost {
  id = 0;
  userId?: number;
  body = "";
  title = "";
}
