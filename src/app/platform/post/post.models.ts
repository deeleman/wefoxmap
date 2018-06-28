export interface Marker {
  lat: number;
  long: number;
}
export interface Post extends Marker {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  image_url: string;
}

export declare type Posts = Array<Post>;

export interface PostState {
  posts: Posts;
  isLoading: boolean;
  hasErrors: boolean;
}
