export interface IPostBase {
  title: string;
  body: string;
}

export interface IPost extends IPostBase {
  id: number;
  userId?: number;
}