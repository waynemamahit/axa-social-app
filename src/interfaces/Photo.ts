export interface IAlbum {
  id: number;
  title: string;
  userId: string  
}

export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}