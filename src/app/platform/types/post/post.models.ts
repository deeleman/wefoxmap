export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  lat: number;
  log: number;
  image_url: string;
}

export type Posts = Array<Post>;

export interface PostState {
  posts: Posts;
  isLoading: boolean;
  hasErrors: boolean;
}
