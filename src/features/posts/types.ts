export interface Post {
  id: string;
  title: string;
  content: string;
  user: string;
}

export interface PostState {
  posts: Post[]
}
