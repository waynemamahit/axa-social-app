import { IPost } from "../interfaces/Post";

export class PostForm implements IPost {
  body = "";
  title = "";
  id = 0;
  userId?: number | undefined;
}
