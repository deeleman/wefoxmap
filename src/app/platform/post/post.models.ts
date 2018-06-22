export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  lat: number;
  long: number;
  image_url: string;
}

export declare type Posts = Array<Post>;

export interface PostState {
  posts: Posts;
  isLoading: boolean;
  hasErrors: boolean;
}
